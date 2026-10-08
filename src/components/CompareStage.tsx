"use client";

import type { CatalogueItem } from "@/lib/catalogue";
import { lineFor } from "@/lib/catalogue";
import { useCart } from "@/lib/cart/CartContext";
import { burst, flyToPicks } from "@/lib/motion";
import { voice, ui } from "@/content/voice";
import { enquiryUrl } from "@/lib/collection";
import CataloguePhoto from "./ui/CataloguePhoto";
import { HandMirror } from "./ui/Stickers";

export default function CompareStage({ items, selected, onSelect, onOpen, number }: {
  items: CatalogueItem[]; selected: string[]; onSelect: (refs: string[]) => void;
  onOpen: (item: CatalogueItem) => void; number: string;
}) {
  const cart = useCart();
  const [a, b] = selected.map((ref) => items.find((item) => item.ref === ref));
  function choose(ref: string) {
    onSelect(selected.includes(ref) ? selected.filter((r) => r !== ref) : selected.length < 2 ? [...selected, ref] : [selected[0], ref]);
  }
  const askUrl = a && b ? enquiryUrl(number, a.ref, a.label, b.ref, b.label) : null;

  return <div className="cv-compare">
    {a && b ? <>
      <div className="cv-compare-stage">
        {[a, b].map((item, index) => <button key={item.key} className="cv-compare-card" onClick={() => onOpen(item)} aria-label={ui.closer(item.label)}>
          <div className="cv-compare-photo"><CataloguePhoto item={item} eager sizes="(max-width: 767px) 44vw, 420px" /></div>
          <span className="cv-compare-index" aria-hidden="true">0{index + 1}</span>
          <span className="cv-compare-name">{item.label}</span>
        </button>)}
      </div>
      <p className="cv-center">{voice.compare.pairHint}</p>
      <div className="cv-controls cv-center">
        {askUrl && <a className="cv-pill" href={askUrl} target="_blank" rel="noopener noreferrer">{voice.compare.ask}</a>}
        <button className="cv-button" disabled={!cart.ready} onClick={(event) => {
          const missing = [a, b].filter((item) => !cart.has(item.key));
          if (cart.lines.length + missing.length > 50) { cart.announce(ui.fullPicks); return; }
          missing.forEach((item) => cart.addItem(lineFor(item)));
          if (missing.length) { burst(event.currentTarget); flyToPicks(event.currentTarget, a.src); cart.announce(voice.compare.keepBoth); }
        }}>{voice.compare.keepBoth}</button>
        <button className="cv-button" onClick={() => onSelect([b.ref, a.ref])}>{voice.compare.swap}</button>
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
