import s3Client from "../utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadImage({ key, folder, body }) {
    const buffer = Buffer.from(await body.arrayBuffer());

    try {
        const commnand = new PutObjectCommand({
            Bucket: "nemu",
            Key: `${folder}/${key}`,
            Body: buffer,
            ContentType: body.type
        });
        const fileUpload = await s3Client.send(commnand);
        console.log("File uploaded", fileUpload);
    } catch (error) {
        console.error("Error uploading file", error);
    }
}