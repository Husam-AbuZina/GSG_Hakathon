import * as AWS from "aws-sdk";
import * as fs from "fs";

// Configure AWS SDK with your credentials and preferred region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1", // Replace with your preferred AWS region
});

const rekognition = new AWS.Rekognition();

// Function to identify objects in an image and log the JSON result
async function identifyObjectsInImage(imagePath: string) {
  try {
    // Read the image file into a Buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Perform object detection using Rekognition
    const rekognitionResponse = await rekognition
      .detectLabels({
        Image: {
          Bytes: imageBuffer,
        },
      })
      .promise();

    // Log the JSON result
    console.log(JSON.stringify(rekognitionResponse, null, 2));
    console.log("SECOND CHECKPOIUNT");

  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage example: Call the function with the path to your image file
identifyObjectsInImage("../images/shadi.jpg");
