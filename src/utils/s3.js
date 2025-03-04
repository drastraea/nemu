import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "apc",
    endpoint: process.env.R2_S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_S3_ACCESS_KEY,
        secretAccessKey: process.env.R2_S3_SECRET_KEY
    }
});

export default s3Client;
