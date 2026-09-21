"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogueItem } from "@/lib/catalogue";
import { SHADES } from "@/lib/shades";
import { ui } from "@/content/voice";

export default function CataloguePhoto({ item, eager = false, sizes = "(max-width: 767px) 46vw, (max-width: 1100px) 30vw, 280px" }: {
  item: CatalogueItem; eager?: boolean; sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return <div className="cv-photo" style={{ backgroundColor: item.shade ? SHADES[item.shade].hex : "var(--color-petal)" }}>
    <Image src={item.src} alt={item.alt} fill unoptimized={item.src.startsWith("/collection/")} sizes={sizes} loading={eager ? "eager" : "lazy"} draggable={false} onError={() => setFailed(true)} />
    {failed && <span className="cv-photo-error">{ui.photoUnavailable}</span>}
  </div>;
}
