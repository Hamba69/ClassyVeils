import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.TASK_SUPABASE_SECRET;

if (!url || !secret) {
  throw new Error("Missing catalogue provisioning environment variables");
}

const supabase = createClient(url, secret, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const sourceCategories = [
  { directory: "Jersey Veils", slug: "jersey" },
  { directory: "Chiffon Veils", slug: "chiffon" },
  { directory: "Silk Veils", slug: "silk" },
  { directory: "Cotton Ninja Veils", slug: "cotton-ninja" },
];

const uploads = [];
for (const category of sourceCategories) {
  const directory = path.join("public", category.directory);
  const files = (await readdir(directory))
    .filter((file) => /-1280\.webp$/.test(file))
    .sort();

  for (const file of files) {
    uploads.push({
      bucket: "veil-photos",
      objectPath: `catalog-v1/${category.slug}/${file.replace("-1280", "")}`,
      source: path.join(directory, file),
    });
  }
}

uploads.push(
  {
    bucket: "veil-editorial",
    objectPath: "catalog-v1/jersey/ivory-jersey-morning.webp",
    source: "assets/editorial-catalog/jersey/ivory-jersey-morning.webp",
  },
  {
    bucket: "veil-editorial",
    objectPath: "catalog-v1/chiffon/mustard-gold-hour.webp",
    source: "assets/editorial-catalog/chiffon/mustard-gold-hour.webp",
  },
  {
    bucket: "veil-editorial",
    objectPath: "catalog-v1/silk/dusty-rose-gallery.webp",
    source: "assets/editorial-catalog/silk/dusty-rose-gallery.webp",
  },
  {
    bucket: "veil-editorial",
    objectPath: "catalog-v1/cotton-ninja/taupe-everyday.webp",
    source: "assets/editorial-catalog/cotton-ninja/taupe-everyday.webp",
  },
);

let uploaded = 0;
let existing = 0;
for (const upload of uploads) {
  const body = await readFile(upload.source);
  const { error } = await supabase.storage.from(upload.bucket).upload(upload.objectPath, body, {
    contentType: "image/webp",
    cacheControl: "31536000",
    upsert: false,
  });

  if (!error) {
    uploaded += 1;
    continue;
  }
  if (error.message.toLowerCase().includes("already exists")) {
    existing += 1;
    continue;
  }
  throw new Error(`${upload.bucket}/${upload.objectPath}: ${error.message}`);
}

console.log(JSON.stringify({
  totalObjects: uploads.length,
  uploaded,
  alreadyPresent: existing,
  byBucket: {
    product: uploads.filter((item) => item.bucket === "veil-photos").length,
    editorial: uploads.filter((item) => item.bucket === "veil-editorial").length,
  },
}, null, 2));
