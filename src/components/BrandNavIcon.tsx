const positions = {
  home: "M3 10 12 3l9 7v10H3z M9 20v-7h6v7",
  shop: "M5 7h14l1 14H4z M9 7V5a3 3 0 0 1 6 0v2",
  cart: "M2 3h3l3 12h11l3-8H6 M10 20h.01 M18 20h.01",
  contact: "M3 4h18v14H8l-5 3z M7 9h10 M7 13h7",
} as const;

export default function BrandNavIcon({ name }: { name: keyof typeof positions }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={positions[name]} /></svg>
  );
}
