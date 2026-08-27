import Image from "next/image";
import navigationArtwork from "../../assets/CVA/icons.png";

const positions = {
  home: "-0.55rem",
  shop: "-3.3rem",
  cart: "-6.35rem",
  contact: "-9.9rem",
} as const;

export default function BrandNavIcon({ name }: { name: keyof typeof positions }) {
  return (
    <span aria-hidden="true" className="relative block h-8 w-12 overflow-hidden rounded-lg bg-[#fbf8f3]">
      <Image
        src={navigationArtwork}
        alt=""
        className="absolute top-[-3rem] h-auto w-[13.75rem] max-w-none"
        style={{ left: positions[name] }}
        sizes="220px"
      />
    </span>
  );
}
