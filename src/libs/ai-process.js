import { TAGGING_PROMPT, MATCHING_PROMPT } from "@/app/prompts/systemPrompt";
import openai from "@/utils/openai";
import prisma from "./db";
import { calculateDistance } from "./location";

export async function getTags(image) {
  const url = `https://pub-4a28b0907aff4bb4a7bc257eaa71091d.r2.dev/nemu`;
  const imageUrl = `${url}/${image}`;

  const completions = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",

    messages: [
      {
        role: "system",
        content: TAGGING_PROMPT,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  const result = completions.choices[0].message.content;
  const cleanedResponse = result.replace(/```[\w]*\n|```$/g, "");
  const parsedResult = JSON.parse(cleanedResponse);

  return parsedResult;
}

export async function matchLostItem(submittedItem) {
  const matchItems = await prisma.item.findFirst({
    where: {
      id: submittedItem.id,
    },
    include: {
      itemTags: {
        include: {
          tag: true,
        }
      },
    }
  });

  const type = submittedItem.type === "LOST" ? "FOUND" : "LOST";

  const lat = matchItems.latitude;
  const lon = matchItems.longitude;

  if (!lat || !lon) {
    return { success: false, message: "Location coordinates missing for lost item." };
  }


  const potentialMatches = await prisma.item.findMany({
    where: {
      type,
      category: matchItems.category,
      timeframe: {
        gte: new Date(new Date(matchItems.timeframe).setDate(matchItems.timeframe.getDate() - 7)).toISOString(),
        lte: new Date(new Date(matchItems.timeframe).setDate(matchItems.timeframe.getDate() + 7)).toISOString(),
      },
      latitude: { gte: lat - 0.1, lte: lat + 0.1 },
      longitude: { gte: lon - 0.1, lte: lon + 0.1 }
    },
    include: {
      itemTags: {
        include: {
          tag: true
        }
      },
    },
  });

  const contents = JSON.stringify({
    matchItems,
    potentialMatches: potentialMatches.map(match => ({
      id: match.id,
      name: match.name,
      location: match.location,
      category: match.category,
      timeframe: new Date(match.timeframe).toISOString(),
      tags: match.itemTags.map(itemTag => itemTag.tag.name),
    }))
  });

  const aiRequest = JSON.stringify({
    lostItem: {
      id: matchItems.id,
      name: matchItems.name,
      category: matchItems.category,
      location: matchItems.location,
      timeframe: new Date(matchItems.timeframe).toISOString(),
      tags: matchItems.itemTags.map(tag => tag.tag.name),
    },
    potentialMatches: potentialMatches.map(match => ({
      id: match.id,
      name: match.name,
      category: match.category,
      location: match.location,
      distance_km: calculateDistance(lat, lon, match.latitude, match.longitude), // Accurate distance
      timeframe: new Date(match.timeframe).toISOString(),
      tags: match.itemTags.map(tag => tag.tag.name),
    }))
  });

  const aiResponse = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages: [
      {
        role: "system",
        content: MATCHING_PROMPT
      },
      {
        role: "user",
        content: aiRequest,
      }
    ]
  });

  const result = aiResponse.choices[0].message.content;

  return JSON.parse(result);
}