import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.TASK_SUPABASE_SECRET;
const password = process.env.TASK_ADMIN_PASSWORD;

if (!url || !secret || !password) {
  throw new Error("Missing provisioning environment variables");
}

const supabase = createClient(url, secret, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const adminEmail = "admin@classyveils.ug";
const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (listError) throw listError;

const existing = listed.users.find((user) => user.email === adminEmail);
let authOperation = "created";
if (existing) {
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) throw error;
  authOperation = "updated";
} else {
  const { error } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password,
    email_confirm: true,
  });
  if (error) throw error;
}

const uploads = [
  {
    bucket: "veil-photos",
    path: "chiffon/pilot-red-black-ombre.webp",
    source: "public/Chiffon Veils/29f79ee91b4862f75e76d8a14ca908f5-1280.webp",
  },
  {
    bucket: "veil-photos",
    path: "chiffon/pilot-ice-blue.webp",
    source: "public/Chiffon Veils/f86e455cd898a3e013035424901fd29b-1280.webp",
  },
  {
    bucket: "veil-editorial",
    path: "chiffon/red-black-ombre-close.webp",
    source: "assets/editorial-pilot/chiffon/red-black-ombre-close.webp",
  },
  {
    bucket: "veil-editorial",
    path: "chiffon/ice-blue-golden-hour-full.webp",
    source: "assets/editorial-pilot/chiffon/ice-blue-golden-hour-full.webp",
  },
];

for (const upload of uploads) {
  const body = await readFile(upload.source);
  const { error } = await supabase.storage.from(upload.bucket).upload(upload.path, body, {
    contentType: "image/webp",
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) throw new Error(`${upload.bucket}/${upload.path}: ${error.message}`);
}

const { data: veils, error: veilError } = await supabase
  .from("veils")
  .select("id, name, photos, model_photos, use_editorial_cover")
  .in("id", [
    "c1000000-0000-4000-8000-000000000001",
    "c1000000-0000-4000-8000-000000000002",
  ])
  .order("sort_order");
if (veilError) throw veilError;

console.log(JSON.stringify({
  authOperation,
  uploadedObjects: uploads.map(({ bucket, path }) => `${bucket}/${path}`),
  seededVeils: veils,
}, null, 2));
