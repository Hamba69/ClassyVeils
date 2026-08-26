export type Category = {
  slug: string;
  label: string;
  tagline: string;
  intro: string;
  bullets: string[];
  header_photo: string | null;
  video_url: string | null;
  sort_order: number;
};

export type Veil = {
  id: string;
  category_slug: string;
  name: string;
  description: string;
  price: number | null;
  photos: string[];
  cover_index: number;
  model_photos: string[];
  editorial_cover_index: number;
  use_editorial_cover: boolean;
  is_featured: boolean;
  video_url: string | null;
  visible: boolean;
  sort_order: number;
};

export function photoUrl(path: string) {
  if (path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/veil-photos/${path}`;
}

export function editorialPhotoUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/veil-editorial/${path}`;
}
