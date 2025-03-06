import openai from "@/utils/openai";

export async function getTags(image) {
    const url = `https://pub-4a28b0907aff4bb4a7bc257eaa71091d.r2.dev/nemu`
    const imageUrl = `${url}/${image}`;

    const completions = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
            {
                role: "system",
                content: "Analyze the image and generate detailed tags for a lost or found item. Include the following details: \n" +
                    "- Item type (e.g., wallet, backpack, phone, keys)\n" +
                    "- Material (e.g., leather, metal, plastic, fabric)\n" +
                    "- Color(s) \n" +
                    "- Brand (if visible)\n" +
                    "- Condition (e.g., new, worn, damaged)\n" +
                    "- Distinguishing features (e.g., scratches, logos, patterns, attachments)\n" +
                    "Return the tags as json"
            },
            {
                role: "user", content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: imageUrl
                        }
                    }
                ]
            }
        ],
    })

    console.log(completions.choices[0].message.content);
}