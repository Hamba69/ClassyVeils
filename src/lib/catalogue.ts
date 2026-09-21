import { collection } from "./collection";
import { SHADE_OF, SHADES, VIEW, PAIR, type ShadeId } from "./shades";
import { voice, shopperText } from "@/content/voice";
import { photoUrl, type Veil } from "./types";
import type { CartLine } from "./cart/CartContext";

export type CatalogueItem = {
  key: string; ref: string; label: string; src: string; alt: string;
  price: number | null; categorySlug: string | null; shade: ShadeId | null;
  view?: "front" | "back"; pairRef?: string; veilId?: string;
};

export function buildCatalogue(veils: Veil[]): CatalogueItem[] {
  const visible = veils.filter((veil) => veil.visible);
  const matched = new Set<string>();
  const photos: CatalogueItem[] = collection.map((photo) => {
    const veil = visible.find((v) => v.photos.some((p) => photoUrl(p) === photo.src));
    if (veil) matched.add(veil.id);
    const shade = SHADE_OF[photo.id];
    return {
      key: "ref:" + photo.id, ref: photo.id, label: voice.shop.reference(photo.id),
      src: photo.src, alt: voice.alt.photo(SHADES[shade].label, photo.id, VIEW[photo.id]),
      price: veil?.price ?? null, categorySlug: veil?.category_slug ?? null, shade,
      view: VIEW[photo.id], pairRef: PAIR[photo.id], veilId: veil?.id,
    };
  });
  const additional: CatalogueItem[] = visible.filter((v) => !matched.has(v.id)).flatMap((veil) => {
    const photo = veil.photos[veil.cover_index] ?? veil.photos[0];
    if (!photo) return [];
    return [{
      key: "veil:" + veil.id, ref: veil.id, label: shopperText(veil.name),
      src: photoUrl(photo), alt: shopperText(veil.name), price: veil.price,
      categorySlug: veil.category_slug, shade: null, veilId: veil.id,
    }];
  });
  return [...additional, ...photos];
}

export function lineFor(item: CatalogueItem): Omit<CartLine, "qty"> {
  return {
    id: item.key, name: item.label, label: item.label, ref: item.ref,
    veilId: item.veilId, price: item.price, photo: item.src, shade: item.shade,
  };
}
