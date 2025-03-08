import { TAGGING_PROMPT, MATCHING_PROMPT } from "@/app/prompts/systemPrompt";
import openai from "@/utils/openai";
import prisma from "./db";

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

export async function matchLostItem(lostItem) {
  const lostItems = await prisma.item.findUnique({
    where: {
      id: lostItem.id,
    },
    include: {
      itemTags: {
        include: {
          tag: true,
        }
      },
    }
  });

  const potentialMatches = await prisma.item.findMany({
    where: {
      type: "FOUND",
      category: lostItems.category,
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
    lostItems,
    potentialMatches: potentialMatches.map(match => ({
      id: match.id,
      name: match.name,
      location: match.location,
      category: match.category,
      timeframe: new Date(match.timeframe).toISOString(),
      tags: match.itemTags.map(tag => tag.name),
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
        content: contents,
      }
    ]
  });

  const result = aiResponse.choices[0].message.content;;
  console.log(result);
}

