import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import AWS from 'aws-sdk';
import { ImageEntity } from './db/entities/ImageEntity.js';
import { imageToBase64 } from './services/images-base64.js';
import indexRouter from "./routes/index.js"
import usersRouter from "./routes/user.js"
import { loggerMiddleware } from './middleware/logger.js';
import { upload } from "./multer.js"
import { uploadFile } from './services/s3.js';
import cors from "cors"


const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  // console.log(file)
  // const result = await uploadFile(file)
  // console.log(result)
  // const description = req.body.description
  res.send("image uploaded!")
})

// Image base64 conversion
const imagePath = './images/backGround.png';

imageToBase64(imagePath)
  .then((base64Data) => {
    // console.log('Base64 Image Data:');
    // console.log(base64Data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Configure AWS SDK with your credentials and preferred region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const bucketName = 'shadi-husam-bucket';
let rekognitionResponse: any;
// Function to identify objects in an image and store the S3 link
async function identifyObjectsInImage(imagePath: string) {
  try {
    // Read the image file into a Buffer
    const imageBuffer = fs.readFileSync(imagePath);

    const s3 = new AWS.S3();

    const objectKey = `images/${Date.now()}_${imagePath}`; // Replace with your desired object key

    // Upload the image to S3
    const uploadResponse = await s3.upload({
      ACL: "public-read",
      Bucket: bucketName,
      Key: objectKey,
      Body: imageBuffer,
    }).promise();

    const rekognition = new AWS.Rekognition({ apiVersion: 'latest' });

    // Perform object detection using Rekognition
    rekognitionResponse = await rekognition
      .detectLabels({
        Image: {
          S3Object: {
            Bucket: uploadResponse.Bucket,
            Name: objectKey
          }
        },
      })
      .promise()

    // Log the JSON result
    // console.log(JSON.stringify(rekognitionResponse, null, 2)); // general image url
    console.log("SECOND CHECKPOIUNT");

    const image = new ImageEntity();
    image.s3Link = uploadResponse.Location;

    await image.save()

    return {
      fileLocation: uploadResponse.Location,
      recResponse: rekognitionResponse
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// identifyObjectsInImage(imagePath)
//   .then((s3Link) => {
//     console.log('S3 Link:', s3Link);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


app.use(loggerMiddleware)
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/images', async (req, res) => {
  try {
    const images = await ImageEntity.find()
    res.status(200).send(images)
  } catch (error) {
    console.log("something went wrong");

  }
});

// // Define a route for the about page
// app.get('/about', (req, res) => {
//   res.render('about');
// });


app.get("/obj", async (req, res) => {
  console.log("heelloooo-------------");
  const response = await identifyObjectsInImage(imagePath);
  console.log("heelloooo-------------");
  console.log(response)
  res.send(response)
})

app.get("/rekognition", (req, res) => {
  res.send(JSON.stringify(rekognitionResponse, null, 2))
})

app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error'); // You should replace this with your error handling logic
});

app.listen(PORT, () => {
  logger(`App is listening on port ${PORT}`);
  console.log(`App is listening on port ${PORT}`);
});

export default app;
