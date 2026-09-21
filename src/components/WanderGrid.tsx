"use client";

import type { CSSProperties } from "react";
import type { CatalogueItem } from "@/lib/catalogue";
import CataloguePhoto from "./ui/CataloguePhoto";
import HeartButton from "./ui/HeartButton";
import { SHADES } from "@/lib/shades";
import { voice, ui } from "@/content/voice";

export default function WanderGrid({ items, onOpen }: { items: CatalogueItem[]; onOpen: (item: CatalogueItem) => void }) {
  return <div className="cv-grid">{items.map((item, index) => <article key={item.key} data-ref={item.ref} style={index < 24 ? { viewTransitionName: "cv-" + item.ref } as CSSProperties : undefined}>
    <div className="cv-card">
      <button type="button" className="cv-photo-button" onClick={() => onOpen(item)} aria-label={ui.closer(item.label)}>
        <CataloguePhoto item={item} eager={index < 6} />
      </button>
      <HeartButton item={item} compact />
    </div>
    <h3>{item.label}</h3>
    {item.shade && <p className="cv-shade-label"><span style={{ backgroundColor: SHADES[item.shade].hex }} />{SHADES[item.shade].label}</p>}
    <p>{item.price !== null ? ui.price(item.price) : voice.shop.priceOnRequest}</p>
    <small>{voice.shop.availability}</small>
  </article>)}</div>;
}
