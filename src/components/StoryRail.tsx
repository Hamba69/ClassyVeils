"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { voice, ui } from "@/content/voice";
import type { CatalogueItem } from "@/lib/catalogue";
import { SHADE_OF } from "@/lib/shades";
import CataloguePhoto from "./ui/CataloguePhoto";
import HeartButton from "./ui/HeartButton";
import QuickView from "./QuickView";

export default function StoryRail({ items, number, limit = 4, compact = false }: { items: CatalogueItem[]; number: string; limit?: number; compact?: boolean }) {
  const [quick, setQuick] = useState<CatalogueItem | null>(null);
  const [progress, setProgress] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  return <>
    <div ref={rail} className={"cv-stories " + (compact ? "cv-stories-compact" : "")} aria-label={ui.railLabel} onScroll={() => {
      const el = rail.current;
      if (el) setProgress(el.scrollWidth === el.clientWidth ? 100 : Math.round(el.scrollLeft / (el.scrollWidth - el.clientWidth) * 100));
    }}>
      {voice.lookbook.stories.slice(0, limit).map((story) => {
        const item = items.find((i) => i.ref === story.ref);
        if (!item) return null;
        return <article key={story.id} id={story.id} className="cv-story">
          <div className="cv-card"><button className="cv-photo-button" aria-label={ui.closer(item.label)} onClick={() => setQuick(item)}><CataloguePhoto item={item} sizes={compact ? "(max-width: 767px) 75vw, 270px" : "(max-width: 767px) 85vw, 480px"} /></button><HeartButton item={item} compact /></div>
          <div><p className="cv-small">{story.mood}</p><h3>{story.title}</h3><p>{story.copy}</p><Link className="cv-text-link" href={"/shop?mode=swipe&shade=" + SHADE_OF[story.ref]}>{voice.lookbook.seeRef(story.ref)}</Link></div>
        </article>;
      })}
    </div>
    <progress className="cv-rail-progress" aria-label={ui.railProgress} max={100} value={progress} />
    {quick && <QuickView item={quick} items={items} number={number} onClose={() => setQuick(null)} />}
  </>;
}
