import { ImagePool } from '@squoosh/lib';
import { promises as fs } from 'fs';
const glob = require('glob');
import path from 'path';

const imagePool = new ImagePool();
const imageDir = './assets/images';

async function optimizeImages() {
  // Get all PNG, JPG, JPEG images
  const images = glob.sync(`${imageDir}/*.{png,jpg,jpeg}`);

  for (const imagePath of images) {
    const file = await fs.readFile(imagePath);
    const image = imagePool.ingestImage(file);

    await image.encode({
      webp: { quality: 80 },
    });

    const { binary } = (await image.encodedWith.webp);

    // Overwrite the original image
    await fs.writeFile(imagePath, binary);
    console.log(`✅ Optimized: ${path.basename(imagePath)}`);
  }

  await imagePool.close();
  console.log('✨ All images optimized!');
}

optimizeImages();
