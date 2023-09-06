import multer from "multer";
import multerS3x from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import { Request } from "express";
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

const s3 = new AWS.S3();

export const upload = multer({
    // storage: multerS3x({
    //     s3: s3,
    //     bucket: 'shadi-husam-bucket',
    //     key: function (req: Request, file, cb) {
    //         cb(null, Date.now().toString())
    //     }
    // })
});

// const upload = multer({ storage });

// export { upload };
