const imageIds = [
  2204, 2205, 2206, 2208, 2220, 3177, 3179, 3182, 3184, 3189,
  3190, 3195, 3197, 3203, 3205, 3229, 3231, 5794, 9253, 9262,
  9274, 9317, 9337, 9342, 9395, 9402, 9403, 9414, 9426, 9434,
  9524, 9533, 9546, 9564, 9578, 9589, 9640, 9645, 9659, 9678,
  9687, 9701, 9763, 9773, 9778, 9833, 9840, 9853, 9863, 9872, 9884,
] as const;

export const collection = imageIds.map((id) => ({
  id: String(id),
  src: `/collection/img-${id}.webp`,
  alt: id === 5794 ? 'Red veil draped on a display mannequin' : `ClassyVeils styling photograph, reference ${id}`,
}));

export function enquiryUrl(number: string, reference?: string) {
  const text = reference
    ? `Hello Anisha, I would like to enquire about the veil in photo ${reference} from the ClassyVeils collection. Please confirm the fabric, price and availability.`
    : 'Hello Anisha, I would like to enquire about your new veil collection.';
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}
