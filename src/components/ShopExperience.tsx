"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import type { CatalogueItem } from "@/lib/catalogue";
import type { Category } from "@/lib/types";
import { SHADES, type ShadeId } from "@/lib/shades";
import { withViewTransition } from "@/lib/motion";
import { voice, ui, shopperText } from "@/content/voice";
import ShadeChips from "./ShadeChips";
import WanderGrid from "./WanderGrid";
import SwipeDeck from "./SwipeDeck";
import CompareStage from "./CompareStage";
import QuickView from "./QuickView";

type Mode = "swipe" | "wander" | "compare";
const modes: Mode[] = ["swipe", "wander", "compare"];
export default function ShopExperience({ items, number, categories = [], initialShade = "", initialMode, category = "", a, b, preview = false }: {
  items: CatalogueItem[]; number: string; categories?: Category[]; initialShade?: string;
  initialMode?: string; category?: string; a?: string; b?: string; preview?: boolean;
}) {
  const [mode, setMode] = useState<Mode>("wander");
  const [shade, setShade] = useState(initialShade in SHADES ? initialShade : "");
  const [fabric, setFabric] = useState(category);
  const [ready, setReady] = useState(preview);
  const [selected, setSelected] = useState<string[]>([a, b].filter((r): r is string => !!r).filter((r, i, refs) => refs.indexOf(r) === i));
  const [quick, setQuick] = useState<CatalogueItem | null>(null);
  const id = useId();
  useEffect(() => {
    if (preview) return;
    const timer = setTimeout(() => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("cv-mode"); } catch {}
      const desired = initialMode || saved || (matchMedia("(pointer: coarse)").matches ? "swipe" : "wander");
      setMode(modes.includes(desired as Mode) ? desired as Mode : "wander");
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialMode, preview]);

  const filtered = items.filter((item) => (!shade || item.shade === shade) && (!fabric || item.categorySlug === fabric));
  const fabrics = categories.filter((c) => items.some((item) => item.categorySlug === c.slug));
  const chosen = selected.filter((ref) => filtered.some((item) => item.ref === ref)).slice(0, 2);
  function sync(nextMode: Mode, nextShade: string, nextFabric: string, refs: string[]) {
    const url = new URL(location.href);
    url.searchParams.set("mode", nextMode);
    for (const [key, value] of [["shade", nextShade], ["category", nextFabric], ["a", refs[0]], ["b", refs[1]]]) {
      if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    }
    window.history.replaceState(null, "", url);
    try { localStorage.setItem("cv-mode", nextMode); } catch {}
  }
  function change(nextMode: Mode, nextShade = shade, nextFabric = fabric) {
    const refs = selected.filter((ref) => items.some((item) => item.ref === ref && (!nextShade || item.shade === nextShade) && (!nextFabric || item.categorySlug === nextFabric)));
    withViewTransition(() => { setMode(nextMode); setShade(nextShade); setFabric(nextFabric); setSelected(refs); });
    sync(nextMode, nextShade, nextFabric, refs);
  }
  return <section className={preview ? "cv-preview" : "cv-shell cv-shop"}>
    {!preview && <>
      <div className="cv-modes" role="tablist" aria-label={voice.shop.modesLabel} style={{ "--i": modes.indexOf(mode) } as CSSProperties}>
        <span className="cv-mode-indicator" aria-hidden="true" />
        {modes.map((value, index) => <button type="button" key={value} role="tab" id={id + value} aria-controls={id + "stage"} aria-selected={mode === value} tabIndex={mode === value ? 0 : -1}
          onClick={() => change(value)} onKeyDown={(event) => {
            const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1;
            if (next < 0) return;
            event.preventDefault(); change(modes[next]);
            document.getElementById(id + modes[next])?.focus();
          }}>{voice.shop.modes[value].label}</button>)}
      </div>
      <p className="cv-mode-hint" key={mode}>{voice.shop.modes[mode].hint}</p>
      <ShadeChips all value={shade} onChange={(value) => change(mode, value)} />
      {fabrics.length > 0 && <div className="cv-fabrics" aria-label={voice.shop.fabricLabel}>
        <button className="cv-chip" aria-pressed={!fabric} onClick={() => change(mode, shade, "")}>{ui.allFabrics}</button>
        {fabrics.map((c) => <button className="cv-chip" aria-pressed={fabric === c.slug} key={c.slug} onClick={() => change(mode, shade, c.slug)}>{shopperText(c.label)}</button>)}
      </div>}
      <p className="cv-result" role="status">{voice.shop.count(filtered.length, shade ? SHADES[shade as ShadeId].label : undefined)}</p>
    </>}
    <div className="cv-stage" id={id + "stage"} role={preview ? undefined : "tabpanel"} aria-labelledby={preview ? undefined : id + mode} data-ready={ready}>
      {!filtered.length ? <div className="cv-empty"><p>{fabric ? voice.shop.emptyFabric : voice.shop.emptyShade}</p>{fabric && <button className="cv-button" onClick={() => change(mode, shade, "")}>{ui.allFabrics}</button>}</div>
        : mode === "swipe" && !preview ? <SwipeDeck key={shade + ":" + fabric} items={filtered} number={number} onOpen={setQuick} />
        : mode === "compare" && !preview ? <CompareStage items={filtered} selected={chosen} number={number} onOpen={setQuick} onSelect={(refs) => { setSelected(refs); sync(mode, shade, fabric, refs); }} />
        : <WanderGrid items={filtered} onOpen={setQuick} />}
    </div>
    {quick && <QuickView key={quick.ref} item={quick} items={items} number={number} onClose={() => setQuick(null)} />}
  </section>;
}
