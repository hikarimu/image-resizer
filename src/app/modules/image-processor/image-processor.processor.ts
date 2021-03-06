import { Job, DoneCallback } from 'bull';
import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

async function processResizeImageJob(job: Job, done: DoneCallback) {
  const resizedImage = await resizeImage(
    job.data.sourceImagePath,
    path.resolve(__dirname + '../../../../../resized-images/')
  );
  done(null, { resizedImagePath: resizedImage });
}

async function resizeImage(sourceImagePath: string, targetImageFolder: string) {
  const image = sharp(sourceImagePath);
  const metadata = await image.metadata();
  const targetImageFileName = uuidv4() + '.' + metadata.format;
  const imagePath = path.resolve(targetImageFolder + '/' + targetImageFileName);
  const resultImage = image
    .resize({
      width: 100,
      height: 100,
      fit: sharp.fit.fill,
      position: sharp.strategy.entropy,
    })
    .toFile(imagePath);
  return imagePath;
}
export default processResizeImageJob;
