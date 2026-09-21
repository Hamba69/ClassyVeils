"use client";

import { useCart } from "@/lib/cart/CartContext";
import { lineFor, type CatalogueItem } from "@/lib/catalogue";
import { burst, flyToPicks } from "@/lib/motion";
import { voice, ui } from "@/content/voice";
import { Heart } from "./Stickers";

export default function HeartButton({ item, compact = false }: { item: CatalogueItem; compact?: boolean }) {
  const cart = useCart();
  const kept = cart.has(item.key);
  return <button type="button" className={`cv-heart${compact ? " cv-heart-compact" : ""}`} aria-pressed={kept} aria-label={ui.keepLabel(kept, item.label)} disabled={!cart.ready} onClick={(event) => {
    if (!kept && cart.lines.length >= 50) { cart.announce(ui.fullPicks); return; }
    cart.toggle(lineFor(item));
    if (!kept) {
      burst(event.currentTarget);
      flyToPicks(event.currentTarget.closest("article")?.querySelector<HTMLElement>(".cv-photo") ?? event.currentTarget, item.src);
      navigator.vibrate?.(8);
      cart.announce(voice.deck.announceKept(item.ref));
    }
  }}><span className="cv-heart-art"><Heart /><Heart className="cv-heart-fill" /></span>{!compact && <span>{kept ? voice.quickView.kept : voice.quickView.keep}</span>}</button>;
}
