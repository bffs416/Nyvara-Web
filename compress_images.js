const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directory = path.join(__dirname, 'public', 'cronograma');
const MAX_WIDTH = 1200; // Safe for web viewing
const QUALITY = 80;

async function processImages() {
    if (!fs.existsSync(directory)) {
        console.error('Directory not found:', directory);
        return;
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const ext = path.extname(file).toLowerCase();

        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            continue;
        }

        console.log(`Processing: ${file}`);

        try {
            const image = sharp(filePath);
            const metadata = await image.metadata();

            // Only resize if larger than MAX_WIDTH, but ALWAYS compress
            let pipeline = image;

            if (metadata.width > MAX_WIDTH) {
                console.log(`  Resizing from ${metadata.width}px to ${MAX_WIDTH}px`);
                pipeline = pipeline.resize(MAX_WIDTH);
            }

            // Compress based on format
            if (ext === '.jpg' || ext === '.jpeg') {
                pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
            } else if (ext === '.png') {
                pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 8, palette: true }); // palette helps reduce PNG size a lot
            } else if (ext === '.webp') {
                pipeline = pipeline.webp({ quality: QUALITY });
            }

            // Save to buffer first to check success, then overwrite
            const buffer = await pipeline.toBuffer();
            fs.writeFileSync(filePath, buffer);

            const stats = fs.statSync(filePath);
            console.log(`  Done. New size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

        } catch (err) {
            console.error(`  Error processing ${file}:`, err.message);
        }
    }
}

processImages();
