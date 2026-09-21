"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { voice } from "@/content/voice";
import type { ShadeId } from "@/lib/shades";
import { prefersReducedMotion } from "@/lib/motion";
import ShadeChips from "./ShadeChips";
import DrapeLine from "./DrapeLine";

export type HeroShadeData = { id: ShadeId; label: string; hex: string; note: string; count: number; heroSrc: string; ref: string };
export default function HeroShade({ shades }: { shades: HeroShadeData[] }) {
  const rose = shades.find((s) => s.id === "rose")!;
  const [active, setActive] = useState(rose);
  const [layers, setLayers] = useState([rose, rose]);
  const [front, setFront] = useState(0);
  const [loading, setLoading] = useState(false);
  const request = useRef(0);
  const warmed = useRef(false);
  const frontRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function choose(id: string) {
    const next = shades.find((s) => s.id === id);
    if (!next) return;
    const token = ++request.current;
    setActive(next);
    setLoading(true);
    try { sessionStorage.setItem("cv-shade", id); } catch {}
    const image = new window.Image();
    image.src = next.heroSrc;
    const reveal = () => {
      if (request.current !== token) return;
      const index = 1 - frontRef.current;
      setLayers((current) => current.map((layer, i) => i === index ? next : layer));
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (request.current !== token) return;
        frontRef.current = index;
        setFront(index);
        setLoading(false);
      }, prefersReducedMotion() ? 0 : 32);
    };
    if (image.complete) reveal(); else { image.onload = reveal; image.onerror = () => { if (request.current === token) setLoading(false); }; }
  }
  useEffect(() => {
    const restore = setTimeout(() => {
      try {
        const id = sessionStorage.getItem("cv-shade");
        const next = shades.find((s) => s.id === id);
        if (next) { setActive(next); setLayers([next, next]); }
      } catch {}
    }, 0);
    return () => { clearTimeout(restore); if (timer.current) clearTimeout(timer.current); request.current = -1; document.documentElement.style.removeProperty("--cv-tint"); };
  }, [shades]);
  useEffect(() => { document.documentElement.style.setProperty("--cv-tint", active.hex + "24"); }, [active.hex]);

  function warm() {
    if (warmed.current) return;
    warmed.current = true;
    shades.forEach((shade) => { const image = new window.Image(); image.src = shade.heroSrc; });
  }
  return <section className="cv-hero" style={{ "--cv-hero-tint": active.hex + "24" } as CSSProperties}>
    <div className="cv-hero-photo" aria-busy={loading}>
      {layers.map((layer, index) => <Image key={index} src={layer.heroSrc} alt={index === front ? voice.alt.photo(layer.label, layer.ref) : ""} aria-hidden={index !== front}
        className={index === front ? "cv-hero-layer cv-active" : "cv-hero-layer"} fill unoptimized preload={index === 0 && layer.id === "rose"} sizes="100vw" />)}
    </div>
    <div className="cv-hero-copy">
      <h1><span>{voice.home.heroLineOne}</span><span>{voice.home.heroLineTwo} <em>{voice.home.heroAccent}<DrapeLine underline /></em></span></h1>
      <p>{voice.home.heroBody}</p>
      <p className="cv-shade-prompt">{voice.home.shadePrompt}</p>
      <ShadeChips value={active.id} onChange={choose} onEngage={warm} />
      <div className="cv-shade-note" aria-live="polite"><p>{active.note}</p><small>{voice.shades.countLabel(active.count)}</small></div>
      <div className="cv-controls">
        <Link className="cv-pill" href="/shop">{voice.home.heroPrimary}</Link>
        <Link className="cv-text-link" data-hero-shop href={"/shop?mode=swipe&shade=" + active.id}>{voice.home.heroSecondary}</Link>
      </div>
    </div>
    <Link className="cv-hero-reference" href={"/shop?mode=swipe&shade=" + active.id}>{voice.home.heroChip(active.ref, active.label)}</Link>
  </section>;
}
