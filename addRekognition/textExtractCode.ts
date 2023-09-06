
// async function extractTextFromImage(imageUrl: string): Promise<string> {
//     try {
//         // Make a request to the text extraction API
//         const subscriptionKey = "YOUR_TEXT_EXTRACTION_API_KEY";
//         const endpoint = "YOUR_ENDPOINT";
//         const url = ${ endpoint }/vision/v3.2 / ocr;

//         const response = await axios.post(url, {
//             url: imageUrl,
//         }, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Ocp-Apim-Subscription-Key": subscriptionKey,
//             },
//             params: {
//                 language: "en",
//             },
//         });

//         const extractedText = response.data.regions[0]?.lines.map((line: any) => line.text).join(" ") || "";
//         return extractedText;
//     } catch (error) {
//         throw error;
//     }
// }

// async function main() {
//     const imageUrl = "IMAGE_URL";
//     const extractedText = await extractTextFromImage(imageUrl);

//     // Save the extracted text to a database using TypeORM
//     const connection = await createConnection({
//         type: "mysql", // Replace with your database type
//         host: "localhost", // Replace with your database host
//         port: 3306, // Replace with your database port
//         username: "YOUR_DB_USERNAME",
//         password: "YOUR_DB_PASSWORD",
//         database: "YOUR_DB_NAME",
//         synchronize: true,
//         entities: [ExtractedText],
//     });

//     const extractedTextRepository = connection.getRepository(ExtractedText);

//     const textEntity = new ExtractedText();
//     textEntity.text = extractedText;
//     await extractedTextRepository.save(textEntity);

//     await connection.close();
// }

// main();