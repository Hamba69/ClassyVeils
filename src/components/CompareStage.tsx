"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CatalogueItem } from "@/lib/catalogue";
import { lineFor } from "@/lib/catalogue";
import { useCart } from "@/lib/cart/CartContext";
import { prefersReducedMotion, burst, flyToPicks } from "@/lib/motion";
import { voice, ui } from "@/content/voice";
import { enquiryUrl } from "@/lib/collection";
import CataloguePhoto from "./ui/CataloguePhoto";
import { HandMirror } from "./ui/Stickers";

export default function CompareStage({ items, selected, onSelect, onOpen, number }: {
  items: CatalogueItem[]; selected: string[]; onSelect: (refs: string[]) => void;
  onOpen: (item: CatalogueItem) => void; number: string;
}) {
  const [position, setPosition] = useState(50);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const dragging = useRef(false);
  const cart = useCart();
  const [a, b] = selected.map((ref) => items.find((item) => item.ref === ref));
  useEffect(() => {
    if (!a || !b || !stage.current || prefersReducedMotion()) return;
    const element = stage.current.querySelector(".cv-compare-front");
    const animation = element?.animate([{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 50% 0 0)" }], { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" });
    return () => { animation?.cancel(); cancelAnimationFrame(frame.current); };
  }, [a, b]);
  function choose(ref: string) {
    onSelect(selected.includes(ref) ? selected.filter((r) => r !== ref) : selected.length < 2 ? [...selected, ref] : [selected[0], ref]);
    setPosition(50);
  }
  function pointer(x: number) {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPosition(Math.round(Math.max(0, Math.min(100, (x - rect.left) / rect.width * 100)))));
  }
  return <div className="cv-compare">
    {a && b ? <>
      <div className="cv-compare-stage" ref={stage} style={{ "--pos": position + "%" } as CSSProperties}>
        <button className="cv-compare-back" onClick={() => onOpen(b)} aria-label={ui.closer(b.label)}><CataloguePhoto item={b} eager sizes="(max-width: 767px) 90vw, 480px" /></button>
        <button className="cv-compare-front" onClick={() => onOpen(a)} aria-label={ui.closer(a.label)}><CataloguePhoto item={a} eager sizes="(max-width: 767px) 90vw, 480px" /></button>
        <div className="cv-compare-line">
          <div role="slider" tabIndex={0} className="cv-compare-handle" aria-label={voice.compare.sliderLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={position}
            onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); pointer(event.clientX); }}
            onPointerMove={(event) => { if (dragging.current) pointer(event.clientX); }}
            onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; cancelAnimationFrame(frame.current); }}
            onKeyDown={(event) => {
              const delta = event.key === "ArrowRight" || event.key === "ArrowUp" ? 5 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -5 : 0;
              if (delta || event.key === "Home" || event.key === "End") {
                event.preventDefault();
                setPosition((p) => event.key === "Home" ? 0 : event.key === "End" ? 100 : Math.max(0, Math.min(100, p + delta)));
              }
            }}><span aria-hidden="true">? ?</span></div>
        </div>
        <div className="cv-compare-labels"><span>{a.label}</span><span>{b.label}</span></div>
      </div>
      <p className="cv-center">{voice.compare.slideHint}</p>
      <div className="cv-controls cv-center">
        <a className="cv-pill" href={enquiryUrl(number, a.ref, a.label, b.ref, b.label)} target="_blank" rel="noopener noreferrer">{voice.compare.ask}</a>
        <button className="cv-button" disabled={!cart.ready} onClick={(event) => {
          const missing = [a, b].filter((item) => !cart.has(item.key));
          if (cart.lines.length + missing.length > 50) { cart.announce(ui.fullPicks); return; }
          missing.forEach((item) => cart.addItem(lineFor(item)));
          if (missing.length) { burst(event.currentTarget); flyToPicks(stage.current ?? event.currentTarget, a.src); cart.announce(voice.compare.keepBoth); }
        }}>{voice.compare.keepBoth}</button>
        <button className="cv-button" onClick={() => { onSelect([b.ref, a.ref]); setPosition(50); }}>{voice.compare.swap}</button>
        <button className="cv-text-link" onClick={() => onSelect([])}>{voice.compare.clear}</button>
      </div>
    </> : <div className="cv-compare-empty"><HandMirror /><h2>{voice.compare.title}</h2><p>{voice.compare.empty}</p><p>{voice.compare.pickHint}</p>{a && <span>{a.label}</span>}</div>}
    <div className="cv-picker" aria-label={voice.compare.pickHint}>
      {items.map((item) => <button key={item.key} className="cv-picker-item" aria-pressed={selected.includes(item.ref)} aria-label={ui.comparePick(item.label)} onClick={() => choose(item.ref)}>
        <CataloguePhoto item={item} sizes="88px" /><span>{item.label}</span>
      </button>)}
    </div>
  </div>;
}
