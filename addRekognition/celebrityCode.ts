// async function spotCelebrities(imageUrl: string): Promise<DetectedCelebrity[]> {
//     try {
//         // Make a request to the celebrity recognition API
//         const subscriptionKey = "YOUR_CELEBRITY_API_KEY";
//         const endpoint = "YOUR_ENDPOINT";
//         const url = ${ endpoint }/vision/v3.1 / analyze;

//         const response = await axios.post(url, {
//             url: imageUrl,
//         }, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Ocp-Apim-Subscription-Key": subscriptionKey,
//             },
//             params: {
//                 visualFeatures: "Categories,Description",
//                 details: "Celebrities",
//             },
//         });

//         const celebrities = response.data.categories[0]?.detail?.celebrities || [];
//         return celebrities;
//     } catch (error) {
//         throw error;
//     }
// }

// async function main() {
//     const imageUrl = "IMAGE_URL";
//     const celebrities = await spotCelebrities(imageUrl);

//     // Save the detected celebrities to a database using TypeORM
//     const connection = await createConnection({
//         type: "mysql", // Replace with your database type
//         host: "localhost", // Replace with your database host
//         port: 3306, // Replace with your database port
//         username: "YOUR_DB_USERNAME",
//         password: "YOUR_DB_PASSWORD",
//         database: "YOUR_DB_NAME",
//         synchronize: true,
//         entities: [DetectedCelebrity],
//     });

//     const celebrityRepository = connection.getRepository(DetectedCelebrity);

//     for (const celebrity of celebrities) {
//         const detectedCelebrity = new DetectedCelebrity();
//         detectedCelebrity.name = celebrity.name;
//         detectedCelebrity.confidence = celebrity.confidence;
//         await celebrityRepository.save(detectedCelebrity);
//     }

//     await connection.close();
// }

// main();