export const SYSTEM_PROMPT = `
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
