"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useId, useRef, useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { voice, ui } from "@/content/voice";
import { SHADES } from "@/lib/shades";
import { buildPicksWhatsAppUrl } from "@/lib/cart/buildWhatsAppMessage";
import { submitOrderRequest, type OrderRequestState } from "@/app/order-actions";
import Modal from "@/components/ui/Modal";
import { Hanger, Heart, Petal } from "@/components/ui/Stickers";

export default function PicksSheet({ whatsappNumber }: { whatsappNumber: string }) {
  const cart = useCart();
  return cart.isOpen ? <PicksContent whatsappNumber={whatsappNumber} /> : null;
}

function PicksContent({ whatsappNumber }: { whatsappNumber: string }) {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const [state, action, pending] = useActionState(submitOrderRequest, { status: "idle", message: "" } as OrderRequestState);
  const received = state.status === "success";
  const refs = cart.lines.map((line) => line.ref || line.id.replace(/^(ref|veil):/, "")).slice(0, 2);
  function close() {
    if (received) cart.clear();
    cart.closeCart();
  }
  function next(value: number) {
    setStep(value);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return <Modal open onClose={close} labelledBy={id} className="cv-picks-sheet">
    <h2 id={id} ref={heading} tabIndex={-1}>{received ? voice.picks.successTitle : step ? voice.picks.detailsTitle : voice.picks.title}</h2>
    {received ? <div className="cv-received" role="status">
      <Heart className="cv-received-heart" />
      <svg className="cv-check" viewBox="0 0 48 48" aria-hidden="true"><path d="M12 25l8 8 16-19" fill="none" stroke="currentColor" strokeWidth="1.5" pathLength="1" /></svg>
      <div className="cv-rising-petals">{Array.from({ length: 6 }, (_, i) => <Petal key={i} style={{ animationDelay: i * 70 + "ms", left: 15 + i * 12 + "%" }} />)}</div>
      <p>{voice.picks.successBody}</p><p>{voice.picks.referenceLabel}: <strong>{state.reference}</strong></p>
      <button className="cv-pill" onClick={close}>{voice.picks.done}</button>
    </div> : !cart.lines.length ? <div className="cv-empty">
      <Hanger /><h3>{voice.picks.emptyTitle}</h3><p>{voice.picks.emptyBody}</p>
      <Link className="cv-pill" href="/shop" onClick={close}>{voice.picks.browse}</Link>
    </div> : step === 0 ? <div className="cv-picks-step">
      <div className="cv-pick-list">{cart.lines.map((line) => <article className="cv-pick-row" key={line.id}>
        {line.photo && <div className="cv-pick-photo"><Image src={line.photo} alt={line.label || line.name} fill unoptimized sizes="72px" /></div>}
        <div className="cv-pick-description"><h3>{line.label || line.name}</h3>
          {line.shade && SHADES[line.shade] && <p className="cv-shade-label"><span style={{ backgroundColor: SHADES[line.shade].hex }} />{SHADES[line.shade].label}</p>}
          <p>{line.price !== null ? ui.price(line.price) : voice.shop.priceOnRequest}</p>
          <div className="cv-quantity"><button type="button" aria-label={ui.decrease(line.label || line.name)} disabled={line.qty <= 1} onClick={() => cart.updateQty(line.id, line.qty - 1)}><span aria-hidden="true">?</span></button>
            <input type="number" min={1} max={20} aria-label={voice.picks.quantityFor(line.ref || line.id)} value={line.qty} onChange={(event) => cart.updateQty(line.id, event.target.valueAsNumber)} />
            <button type="button" aria-label={ui.increase(line.label || line.name)} disabled={line.qty >= 20} onClick={() => cart.updateQty(line.id, line.qty + 1)}><span aria-hidden="true">+</span></button>
          </div>
        </div>
        <button className="cv-remove" aria-label={ui.remove(line.label || line.name)} onClick={() => cart.removeItem(line.id)}>{voice.picks.remove}</button>
      </article>)}</div>
      <div className="cv-controls">
        {refs.length >= 2 && <Link className="cv-text-link" href={"/shop?mode=compare&a=" + encodeURIComponent(refs[0]) + "&b=" + encodeURIComponent(refs[1])} onClick={close}>{voice.picks.compareTwo}</Link>}
        <button className="cv-text-link" onClick={cart.clear}>{voice.picks.clear}</button>
      </div>
      <button className="cv-pill cv-wide" onClick={() => next(1)}>{voice.picks.next}</button>
    </div> : <form ref={form} action={action} className="cv-picks-form cv-picks-step">
      <input type="hidden" name="items" value={JSON.stringify(cart.lines.map((line) => ({ id: line.id, qty: line.qty })))} />
      <input name="website" tabIndex={-1} autoComplete="off" className="cv-honeypot" aria-hidden="true" />
      <label>{voice.picks.name}<input name="customer_name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={(event) => setName(event.target.value)} /></label>
      <label>{voice.picks.contact}<input name="contact" autoComplete="email" required minLength={5} maxLength={160} value={contact} onChange={(event) => setContact(event.target.value)} /></label>
      <label>{voice.picks.notes} <span className="cv-small">{voice.picks.optional}</span><textarea name="notes" rows={3} maxLength={1000} aria-describedby={id + "notes"} value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
      <p id={id + "notes"} className="cv-small">{voice.picks.notesHelp}</p>
      <a className="cv-pill cv-wide" data-send-picks target="_blank" rel="noopener noreferrer" href={buildPicksWhatsAppUrl(whatsappNumber, cart.lines, { name, contact, notes })} onClick={(event) => { if (!form.current?.reportValidity()) event.preventDefault(); }}>{voice.picks.sendWhatsApp}</a>
      <button type="submit" className="cv-button" disabled={pending}>{pending ? voice.picks.saving : voice.picks.sendRequest}</button>
      <button type="button" className="cv-text-link" disabled={pending} onClick={() => next(0)}>{voice.picks.back}</button>
      {state.status === "error" && <p role="alert">{voice.picks.error}</p>}
    </form>}
    <p className="cv-picks-footnote">{voice.picks.footnote}</p>
  </Modal>;
}
