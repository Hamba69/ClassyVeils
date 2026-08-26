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
  is_featured: boolean;
  video_url: string | null;
  visible: boolean;
  sort_order: number;
};

export function photoUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/veil-photos/${path}`;
}
