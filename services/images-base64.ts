import * as fs from 'fs';
import { promisify } from 'util';
import * as base64Encode from 'base64-arraybuffer';
const readFileAsync = promisify(fs.readFile);

async function imageToBase64(imagePath: string): Promise<string | null> {
    try {
        const imageData = await readFileAsync(imagePath);
        const base64Data = base64Encode.encode(imageData);
        return base64Data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export { imageToBase64 }