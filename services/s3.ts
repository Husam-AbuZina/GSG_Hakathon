require('dotenv').config()
import fs from 'fs'
import { S3 } from 'aws-sdk';

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// Uploads a file to S3
export async function uploadFile(file: any) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams: any = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };

    try {
        const result = await s3.upload(uploadParams).promise();
        return result;
    } catch (error) {
        throw error;
    }
}

// Downloads a file from S3
export function getFileStream(fileKey: any) {
    const downloadParams: any = {
        Key: fileKey,
        Bucket: bucketName
    };

    return s3.getObject(downloadParams).createReadStream();
}
