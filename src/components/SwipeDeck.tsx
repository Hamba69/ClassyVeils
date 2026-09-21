"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { lineFor, type CatalogueItem } from "@/lib/catalogue";
import { useCart } from "@/lib/cart/CartContext";
import { prefersReducedMotion, burst, flyToPicks } from "@/lib/motion";
import { SHADES } from "@/lib/shades";
import { enquiryUrl } from "@/lib/collection";
import { voice, ui } from "@/content/voice";
import CataloguePhoto from "./ui/CataloguePhoto";
import { Bow, Sparkle } from "./ui/Stickers";

type Move = { item: CatalogueItem; kept: boolean; added: boolean };
type Drag = { id: number; x: number; y: number; t: number; dx: number; dy: number; lock: boolean };
export default function SwipeDeck({ items, number, onOpen }: {
  items: CatalogueItem[]; number: string; onOpen: (item: CatalogueItem) => void;
}) {
  const cart = useCart();
  const [queue, setQueue] = useState(items);
  const [moves, setMoves] = useState<Move[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [busy, setBusy] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const drag = useRef<Drag | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const animation = useRef<Animation | null>(null);
  const locked = useRef(false);
  const item = queue[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      try { setShowHint(!localStorage.getItem("cv-deck-hint")); } catch { setShowHint(true); }
    }, 0);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame.current); animation.current?.cancel(); };
  }, []);
  useEffect(() => {
    queue.slice(1, 3).forEach((next) => { const image = new window.Image(); image.src = next.src; });
  }, [queue]);

  function resetDrag() {
    drag.current = null;
    cancelAnimationFrame(frame.current);
    const element = card.current;
    if (!element) return;
    element.style.setProperty("--keep", "0");
    element.style.setProperty("--pass", "0");
    if (!prefersReducedMotion() && element.style.transform) {
      animation.current = element.animate([{ transform: element.style.transform }, { transform: "none" }], { duration: 320, easing: "cubic-bezier(.34,1.56,.64,1)" });
    }
    element.style.transform = "";
  }
  function commit(kept: boolean) {
    if (!item || locked.current || !cart.ready) return;
    if (kept && !cart.has(item.key) && cart.lines.length >= 50) { cart.announce(ui.fullPicks); resetDrag(); return; }
    locked.current = true;
    setBusy(true);
    const added = kept && !cart.has(item.key);
    if (added) {
      cart.addItem(lineFor(item));
      if (card.current) { burst(card.current); flyToPicks(card.current, item.src); }
      navigator.vibrate?.(8);
    }
    setAnnouncement(kept ? voice.deck.announceKept(item.ref) : voice.deck.announcePassed(item.ref));
    setShowHint(false);
    try { localStorage.setItem("cv-deck-hint", "1"); } catch {}
    const finish = () => {
      setMoves((current) => [...current, { item, kept, added }]);
      setQueue((current) => current.slice(1));
      locked.current = false;
      setBusy(false);
    };
    if (!card.current || prefersReducedMotion()) { finish(); return; }
    animation.current?.cancel();
    animation.current = card.current.animate([
      { transform: card.current.style.transform || "none", opacity: 1 },
      { transform: "translate3d(" + (kept ? 1.2 : -1.2) * innerWidth + "px,0,0) rotate(" + (kept ? 24 : -24) + "deg)", opacity: 0 },
    ], { duration: 260, easing: "cubic-bezier(.2,.7,.2,1)" });
    animation.current.onfinish = finish;
  }
  function undo() {
    if (locked.current) return;
    const last = moves.at(-1);
    if (!last) return;
    if (last.added) cart.removeItem(last.item.key);
    setQueue((current) => [last.item, ...current]);
    setMoves((current) => current.slice(0, -1));
    setAnnouncement(voice.deck.undo + ", " + last.item.label);
  }
  function down(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || locked.current) return;
    animation.current?.cancel();
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: performance.now(), dx: 0, dy: 0, lock: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    d.dx = event.clientX - d.x;
    d.dy = event.clientY - d.y;
    if (!d.lock && Math.abs(d.dx) > 8) d.lock = Math.abs(d.dx) > Math.abs(d.dy) * 1.2;
    if (!d.lock) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!card.current) return;
      if (!prefersReducedMotion()) card.current.style.transform = "translate3d(" + d.dx + "px," + d.dy * .12 + "px,0) rotate(" + d.dx / 16 + "deg)";
      card.current.style.setProperty("--keep", String(Math.min(Math.max(d.dx / 120, 0), 1)));
      card.current.style.setProperty("--pass", String(Math.min(Math.max(-d.dx / 120, 0), 1)));
    });
  }
  function up() {
    const d = drag.current;
    drag.current = null;
    cancelAnimationFrame(frame.current);
    if (!d) return;
    if (Math.abs(d.dx) < 6 && Math.abs(d.dy) < 6) { resetDrag(); onOpen(item); return; }
    const velocity = d.dx / Math.max(1, performance.now() - d.t);
    if (d.lock && (Math.abs(d.dx) > 110 || Math.abs(velocity) > .55)) commit(d.dx > 0);
    else resetDrag();
  }
  const passed = moves.filter((m) => !m.kept).map((m) => m.item);
  return <div className="cv-deck-stage" style={{ "--cv-tint": item?.shade ? SHADES[item.shade].hex + "24" : "transparent" } as CSSProperties}>
    <div className="cv-deck" tabIndex={0} aria-label={voice.shop.modes.swipe.label} onKeyDown={(event) => {
      if (event.target !== event.currentTarget || !["ArrowRight", "ArrowLeft", "Backspace", "z", "Enter"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowRight") commit(true);
      if (event.key === "ArrowLeft") commit(false);
      if (event.key === "Backspace" || event.key === "z") undo();
      if (event.key === "Enter" && item) onOpen(item);
    }}>
      {item ? <>
        <div className="cv-stack">
          {queue.slice(0, 3).map((next, i) => <div key={next.key} data-deck-top={i === 0 ? "true" : undefined} ref={i === 0 ? card : undefined} className="cv-deck-card"
            style={{ zIndex: 3 - i, "--depth": i } as CSSProperties} aria-hidden={i > 0}
            onPointerDown={i === 0 ? down : undefined} onPointerMove={i === 0 ? move : undefined}
            onPointerUp={i === 0 ? up : undefined} onPointerCancel={i === 0 ? resetDrag : undefined}>
            <CataloguePhoto item={next} eager sizes="(max-width: 767px) 85vw, 360px" />
            {i === 0 && <><span className="cv-stamp cv-stamp-keep">{voice.deck.keep}</span><span className="cv-stamp cv-stamp-pass">{voice.deck.pass}</span></>}
          </div>)}
        </div>
        <div className="cv-deck-caption"><h3>{item.label}</h3><span>{voice.deck.progress(moves.length + 1, moves.length + queue.length)}</span></div>
        <p>{item.price !== null ? ui.price(item.price) : voice.shop.priceOnRequest}</p>
        <small>{voice.shop.availability}</small>
        {showHint && <div className="cv-deck-hints"><span>{voice.deck.hintPass}</span><span>{voice.deck.hintKeep}</span></div>}
      </> : <div className="cv-deck-end">
        <div className="cv-end-art"><Sparkle /><Bow /></div>
        <h2>{voice.deck.endTitle}</h2><p>{cart.lines.length ? voice.deck.endWithPicks(cart.lines.length) : voice.deck.endNoPicks}</p>
        {passed.length > 0 && <button className="cv-button" onClick={() => { setQueue(passed); setMoves([]); }}>{voice.deck.lookAgain}</button>}
        <button className="cv-pill" onClick={cart.openCart}>{voice.deck.openPicks}</button>
        <a className="cv-text-link" href={enquiryUrl(number)}>{voice.deck.ask}</a>
      </div>}
      <div className="cv-deck-controls">
        <button className="cv-button" disabled={!moves.length || busy} onClick={undo}>{voice.deck.undo}</button>
        {item && <><button className="cv-button" disabled={busy || !cart.ready} onClick={() => commit(false)}>{voice.deck.pass}</button><button className="cv-pill" disabled={busy || !cart.ready} onClick={() => commit(true)}>{voice.deck.keep}</button><button className="cv-text-link" disabled={busy} onClick={() => onOpen(item)}>{voice.deck.lookCloser}</button></>}
      </div>
    </div>
    <p className="cv-sr" role="status" aria-live="polite">{announcement}</p>
  </div>;
}
