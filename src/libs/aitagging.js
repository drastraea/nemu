import { SYSTEM_PROMPT } from "@/app/prompts/systemPrompt";
import openai from "@/utils/openai";

export async function getTags(image) {
  const url = `https://pub-4a28b0907aff4bb4a7bc257eaa71091d.r2.dev/nemu`;
  const imageUrl = `${url}/${image}`;

  const completions = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",

    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
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
