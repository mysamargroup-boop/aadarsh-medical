const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function processImage() {
    try {
        const file = path.join(__dirname, 'public', 'favicon.png');
        if (!fs.existsSync(file)) {
            console.log('File not found:', file);
            return;
        }
        const image = await Jimp.read(file);
        image.circle();
        await image.writeAsync(file);
        console.log('Success: Favicon is now rounded');
    } catch (error) {
        console.error('Error processing image:', error);
    }
}
processImage();
