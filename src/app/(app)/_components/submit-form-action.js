"use server";

import { getTags, matchLostItem } from "@/libs/ai-process";
import { auth } from "@/libs/auth";
import prisma from "@/libs/db";
import { uploadImage } from "@/libs/file-store";
import { getCoordinates } from "@/libs/location";

export async function submitFormAction(_, formData) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Please login to submit.",
    };
  }

  const name = formData.get("name");
  const category = formData.get("category");
  const timeframe = new Date(formData.get("timeframe"));
  const location = formData.get("location");
  const file = formData.get("file");
  const type = formData.get("type");

  if (!name || !category || !timeframe || !location) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  const coordinates = await getCoordinates(location);

  if (!coordinates) {
    return {
      success: false,
      message: "Location not found. please enter a valid place.",
    };
  }

  const newFoundItem = await prisma.item.create({
    data: {
      name,
      type,
      category,
      timeframe,
      location,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      user: { connect: { id: session.user.id } },
    },
  });

  await prisma.image.create({
    data: {
      url: file.name,
      itemId: newFoundItem.id,
    },
  });

  await uploadImage({ key: file.name, folder: newFoundItem.id, body: file });

  const imageUrl = `${newFoundItem.id}/${file.name}`;

  const tags = await getTags(imageUrl);

  await Promise.all(
    Object.entries(tags).map(async ([type, name]) => {
      if (name.toLowerCase() !== "unknown") {
        let tag = await prisma.tag.findUnique({
          where: {
            name,
          },
        });

        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name,
              type,
            },
          });
        }

        await prisma.itemTag.create({
          data: {
            itemId: newFoundItem.id,
            tagId: tag.id,
          },
        });
      }
    })
  );

  await checkMatch(newFoundItem, imageUrl);

  return {
    success: true,
    message: `${type} ITEM SUBMITTED SUCCESSFULLY.`,
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

async function checkMatch(singleItem, imageUrl) {
  //this item is literally single, it needs a pair :(
  const matchingStatus = await matchLostItem(singleItem);
  if (!matchingStatus) return null;

  const matchingScore = matchingStatus.matching_score
  if (matchingScore < 0.5) return null;

  if (matchingScore >= 0.5 && matchingScore < 0.8) {
    const pairImage = await prisma.item.findFirst({
      where: {
        id: matchingScore.item_id,
      },
      include: {
        images: true
      }
    });

    console.log("Lost Item ID:", singleItem.id);
    console.log("Found Item ID:", matchingStatus.item_id);

    if (!pairImage || !pairImage.images.length) return null;

    const pairImageUrl = `${pairImage.images[0].itemId}/${pairImage.images[0].url}`

    const newScore = await checkMatchImages(imageUrl, pairImageUrl);
    if (newScore >= 0.8) {
      await createMatch(singleItem.id, matchingStatus.item_id, newScore)
      return { success: true, message: "Found a match for your item!" };
    }
  }

  if (matchingScore >= 0.8) {
    await createMatch(singleItem.id, matchingStatus.item_id, matchingScore)
    return { success: true, message: "Found a match for your item!" };
  }
}

async function createMatch(lostItemId, foundItemId, score) {
  return await prisma.match.create({
    data: {
      lostItemId,
      foundItemId,
      score,
      status: "PENDING"
    }
  })
}