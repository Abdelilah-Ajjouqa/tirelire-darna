import Minio from 'minio';
import dotenv from "dotenv";
dotenv.config();


const requiredEnv = ['MINIO_ENDPOINT', 'MINIO_PORT', 'MINIO_ACCESS_KEY', 'MINIO_SECRET_KEY', 'MINIO_BUCKET'];
for (const name of requiredEnv) {
    if (!process.env[name]) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
}

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt(process.env.MINIO_PORT!, 10),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
});

const BUCKET = process.env.MINIO_BUCKET!;

class MinioService {
    async upload(fileBuffer: Buffer, fileName: string) {
        try {
            await minioClient.putObject(BUCKET, fileName, fileBuffer);
            return `${process.env.MINIO_PUBLIC_URL}/${BUCKET}/${fileName}`;
        } catch (err: any) {
            console.error("MinIO upload failed:", err.message);
            throw new Error("Failed to upload file to MinIO");
        }
    }
}

export default new MinioService();