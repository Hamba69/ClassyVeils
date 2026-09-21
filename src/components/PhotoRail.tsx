"use client";

import { useState } from "react";
import { voice, ui } from "@/content/voice";
import type { CatalogueItem } from "@/lib/catalogue";
import CataloguePhoto from "./ui/CataloguePhoto";
import HeartButton from "./ui/HeartButton";
import QuickView from "./QuickView";

export default function PhotoRail({ items, number }: { items: CatalogueItem[]; number: string }) {
  const [quick, setQuick] = useState<CatalogueItem | null>(null);
  return <>
    <div className="cv-photo-rail">{voice.style.photoNotes.map((note) => {
      const item = items.find((i) => i.ref === note.ref);
      if (!item) return null;
      return <article key={note.ref}><div className="cv-card"><button className="cv-photo-button" aria-label={ui.closer(item.label)} onClick={() => setQuick(item)}><CataloguePhoto item={item} sizes="(max-width: 767px) 70vw, 270px" /></button><HeartButton item={item} compact /></div><p>{note.caption}</p></article>;
    })}</div>
    {quick && <QuickView item={quick} items={items} number={number} onClose={() => setQuick(null)} />}
  </>;
}
