export const TAGGING_PROMPT = `
"Analyze the image and generate detailed tags for a lost or found item. Include the following details: \n" +

IMPORTANT:
The output should only valid JSON, without any triple backticks and additional text.

"- Item type (e.g., wallet, backpack, phone, keys, etc.)\n" +
"- Material (e.g., leather, metal, plastic, fabric, etc.)\n" +
"- Color(s) \n" +
"- Brand (if visible)\n" +
"- Condition (e.g., new, worn, damaged)\n" +
"- Distinguishing features (e.g., scratches, logos, patterns, attachments, etc.)\n" +

EXAMPLE OUTPUT:
{
    "item_type": string
    "material": string
    "color": string
    "brand": string
    "condition": string
    "distinguishing_features": string
}

VALIDATION:
Check if the response contain triple backsticks \`\`\`json, please remove it out.

`;

export const MATCHING_PROMPT = `
"Match the lost item with a potential found item. Provide the following details: \n" +
"item_id: the ID of the found item\n" +
"item_name: the name of the found item\n" +
"item_location: the location of the found item\n" +
"matching_score: Score the matching value based on the similarity" +

IMPORTANT:
The output should only valid JSON, without any triple backticks and additional text.

EXAMPLE OUTPUT:
{
    "item_id": string
    "item_name": string
    "item_location": string
    "matching_score": number
}

VALIDATION:
Check if the response contain triple backsticks \`\`\`json, please remove it out.
`;
