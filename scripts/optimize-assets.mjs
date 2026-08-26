import path from "node:path";
import { globby } from "globby";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath);

const IMAGE_SIZES = [320, 640, 1280, 1920];
const IMAGE_QUALITY = 80; // jpeg/webp quality

function extNoDot(file) {
  return path.extname(file).slice(1).toLowerCase();
}

async function processImage(file) {
  const ext = extNoDot(file);
  if (ext === 'svg') {
    console.log(`Skipping SVG: ${file}`);
    return;
  }

  const dir = path.dirname(file);
  const name = path.basename(file, path.extname(file));

  // Ensure optimized subfolder exists (keeps originals safe)
  // We'll write optimized files alongside originals with suffixes

  await Promise.all(
    IMAGE_SIZES.map(async (size) => {
      const outJpeg = path.join(dir, `${name}-${size}.jpg`);
      const outWebp = path.join(dir, `${name}-${size}.webp`);
      const outAvif = path.join(dir, `${name}-${size}.avif`);

      try {
        const pipeline = sharp(file).resize({ width: size, withoutEnlargement: true });

        // JPEG/PNG -> JPEG output
        await pipeline.clone().jpeg({ quality: IMAGE_QUALITY }).toFile(outJpeg);

        // WebP
        await pipeline.clone().webp({ quality: IMAGE_QUALITY }).toFile(outWebp);

        // AVIF
        await pipeline.clone().avif({ quality: IMAGE_QUALITY }).toFile(outAvif);

        console.log(`Wrote: ${outJpeg}, ${outWebp}, ${outAvif}`);
      } catch (err) {
        console.error(`Failed processing ${file} @ ${size}px:`, err.message || err);
      }
    })
  );
}

async function processVideo(file) {
  const dir = path.dirname(file);
  const name = path.basename(file, path.extname(file));

  const outWebm = path.join(dir, `${name}-720.webm`);
  const outMp4 = path.join(dir, `${name}-720.mp4`);
  const poster = path.join(dir, `${name}-poster.jpg`);

  // Transcode to WebM (VP9) and MP4 (H.264) with a reasonable bitrate/size
  const transcodeWebm = () => new Promise((resolve, reject) => {
    ffmpeg(file)
      .outputOptions(['-c:v libvpx-vp9', '-b:v 0', '-crf 30'])
      .size('?x720')
      .save(outWebm)
      .on('end', () => { console.log(`Wrote: ${outWebm}`); resolve(); })
      .on('error', (err) => { console.error(`Failed webm ${file}:`, err.message || err); reject(err); });
  });

  const transcodeMp4 = () => new Promise((resolve, reject) => {
    ffmpeg(file)
      .videoCodec('libx264')
      .outputOptions(['-preset veryfast', '-crf 23'])
      .size('?x720')
      .save(outMp4)
      .on('end', () => { console.log(`Wrote: ${outMp4}`); resolve(); })
      .on('error', (err) => { console.error(`Failed mp4 ${file}:`, err.message || err); reject(err); });
  });

  const makePoster = () => new Promise((resolve, reject) => {
    ffmpeg(file)
      .screenshots({
        timestamps: ['50%'],
        filename: path.basename(poster),
        folder: dir,
        size: '640x?'
      })
      .on('end', () => { console.log(`Wrote poster: ${poster}`); resolve(); })
      .on('error', (err) => { console.error(`Failed poster ${file}:`, err.message || err); reject(err); });
  });

  try {
    await Promise.all([transcodeWebm(), transcodeMp4(), makePoster()]);
  } catch (err) {
    console.error(`Video processing error for ${file}:`, err.message || err);
  }
}

async function run() {
  console.log('Scanning for images...');
  const imagePatterns = ['public/**/*.{jpg,jpeg,png}'];
  const imageFiles = (await globby(imagePatterns)).filter(
    (file) => !/-(?:320|640|1280|1920)\.(?:jpe?g|png)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} raster images.`);
  for (const img of imageFiles) {
    await processImage(path.resolve(img));
  }

  console.log('Scanning for videos...');
  const videoPatterns = ['public/**/*.{mp4,mov,webm,ogg,mkv}'];
  const videoFiles = (await globby(videoPatterns)).filter(
    (file) => !/(?:-720\.(?:mp4|webm)|-poster\.jpg)$/i.test(file)
  );

  console.log(`Found ${videoFiles.length} videos.`);
  for (const vid of videoFiles) {
    await processVideo(path.resolve(vid));
  }

  console.log('Asset optimization complete.');
}

run().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
