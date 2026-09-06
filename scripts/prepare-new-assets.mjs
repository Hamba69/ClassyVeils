import { readdir, mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const classification = await readFile('assets/processed/ASSET_CLASSIFICATION.md', 'utf8');
const rows = [...classification.matchAll(/^\| `([^`]+)` \| `[^`]+` \| \d+x\d+ \| (editorial|product-candidate) \|$/gm)];
await mkdir('public/collection', { recursive: true });
for (const [, filename] of rows) {
  await sharp(`assets/processed/${filename}`).rotate().resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public/collection/${filename.replace(/\.(jpg|webp)$/, '.webp')}`);
}
await sharp('public/brand/img-1129.jpg').resize(512, 512, { fit: 'contain', background: '#ffffff' }).png().toFile('src/app/icon.png');
await sharp('public/brand/img-1129.jpg').resize(180, 180, { fit: 'contain', background: '#ffffff' }).png().toFile('src/app/apple-icon.png');
await sharp('public/brand/img-1129.jpg').resize(1200, 630, { fit: 'contain', background: '#ffffff' }).png().toFile('src/app/opengraph-image.png');
console.log(`Prepared ${rows.length} collection images and three brand metadata images.`);
console.log(`Collection contains ${(await readdir('public/collection')).length} files.`);
