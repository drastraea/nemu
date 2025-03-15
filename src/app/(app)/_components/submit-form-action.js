"use server";

import { checkMatchImages, getTags, matchLostItem } from "@/libs/ai-process";
import { auth } from "@/libs/auth";
import prisma from "@/libs/db";
import { uploadImage } from "@/libs/file-store";
import { getCoordinates } from "@/libs/location";

export async function submitFormAction(_, formData) {
  const session = await auth();
  if (!session) return { success: false, message: "Please login to submit." };

  const itemData = extractFormData(formData);
  if (!validateFormData(itemData))
    return { success: false, message: "Please fill in all fields." };

  const coordinates = await getCoordinates(itemData.location);
  if (!coordinates)
    return {
      success: false,
      message: "Location not found. Please enter a valid place.",
    };

  const newItem = await createNewItem(itemData, coordinates, session.user.id);
  const imageUrl = await handleImageUpload(formData.get("file"), newItem.id);
  await processTags(imageUrl, newItem.id);
  await checkMatch(newItem, imageUrl);

  return {
    success: true,
    message: `${itemData.type} ITEM SUBMITTED SUCCESSFULLY.`,
  };
}

export async function submitItemAction(formData) {
  const session = await auth();

  const response = (success, message, data = undefined) => {
    return { success, message, data };
  };
  if (!session) return response(false, "Please login to submit.");

  const itemData = extractFormData(formData);
  if (!validateFormData(itemData)) {
    return response(false, "Please fill in all fields.");
  }

  const coordinates = await getCoordinates(itemData.location);
  if (!coordinates) {
    return response(false, "Location not found. Please enter a valid place.");
  }

  try {
    const newItem = await createNewItem(itemData, coordinates, session.user.id);
    const imageUrl = await handleImageUpload(formData.get("file"), newItem.id);
    if (!newItem) {
      return response(false, "Failed insert item");
    }

    const data = { item: newItem, imageUrl };

    return response(true, "", data);
  } catch (error) {
    console.error(`submitItemAction [ERROR]: ${error}`);
    return null;
  }
}

export async function imageProcessingAction(item, imageUrl) {
  const processResult = await processTags(imageUrl, item.id);

  if (!processResult) {
    return {
      success: false,
      message: "Failed processing tags",
    };
  }
  const matchResult = await checkMatch(item, imageUrl);

  const message = matchResult
    ? `${item.type} Item submitted successfully and found match item`
    : "Item submitted successfully";

  return {
    success: true,
    message,
  };
}

function extractFormData(formData) {
  return {
    name: formData.get("name"),
    category: formData.get("category"),
    timeframe: new Date(formData.get("timeframe")),
    location: formData.get("location"),
    type: formData.get("type"),
  };
}

function validateFormData({ name, category, timeframe, location }) {
  return name && category && timeframe && location;
}

async function createNewItem(itemData, coordinates, userId) {
  return await prisma.item.create({
    data: {
      ...itemData,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      user: { connect: { id: userId } },
    },
  });
}

async function handleImageUpload(file, itemId) {
  if (!file) return null;
  await prisma.image.create({ data: { url: file.name, itemId } });
  await uploadImage({ key: file.name, folder: itemId, body: file });
  return `${itemId}/${file.name}`;
}

async function processTags(imageUrl, itemId) {
  try {
    const tags = await getTags(imageUrl);
    await Promise.all(
      Object.entries(tags).map(async ([type, name]) => {
        if (name.toLowerCase() === "unknown") return;
        let tag = await prisma.tag.findUnique({ where: { name } });
        if (!tag) tag = await prisma.tag.create({ data: { name, type } });
        await prisma.itemTag.create({ data: { itemId, tagId: tag.id } });
      })
    );
    return true;
  } catch (error) {
    console.log(`processTags [ERROR]: ${error}`);
    return false;
  }
}

async function checkMatch(singleItem, imageUrl) {
  const matchingStatus = await matchLostItem(singleItem);
  if (!matchingStatus || matchingStatus.matching_score < 0.5) return false;

  const pairImage = await prisma.item.findFirst({
    where: { id: matchingStatus.item_id },
    include: { images: true },
  });
  if (!pairImage || !pairImage.images.length) return false;

  const pairImageUrl = `${pairImage.images[0].itemId}/${pairImage.images[0].url}`;
  const imageComparison = await checkMatchImages(imageUrl, pairImageUrl);

  const finalScore =
    (matchingStatus.matching_score + imageComparison.similarity_score) / 2;
  if (finalScore >= 0.8) {
    const match = await createMatch(
      singleItem.id,
      matchingStatus.item_id,
      finalScore
    );
    if (singleItem.type === "LOST") {
      await createNotification(singleItem.userId, match.id, singleItem.name);
    } else {
      const item = await prisma.item.findUnique({
        where: { id: matchingStatus.item_id, type: "LOST" },
      });
      await createNotification(item.userId, match.id, item.name);
    }
    return true;
  }

  return false;
}

async function createMatch(lostItemId, foundItemId, score) {
  return await prisma.match.create({
    data: { lostItemId, foundItemId, score, status: "PENDING" },
  });
}

async function createNotification(userId, matchId, lostItemName) {
  await prisma.notification.create({
    data: {
      userId,
      matchId,
      type: "LOST_ITEM",
      message: `We found a match to your item ${lostItemName}`,
    },
  });
}
