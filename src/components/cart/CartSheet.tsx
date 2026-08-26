"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitOrderRequest, type OrderRequestState } from "@/app/order-actions";
import { createClient } from "@/lib/supabase/client";
import { buildCartWhatsAppUrl } from "@/lib/cart/buildWhatsAppMessage";
import { useCart, type CartLine } from "@/lib/cart/CartContext";

const initialOrderState: OrderRequestState = { status: "idle", message: "" };

function OrderRequestForm({ lines, onDone }: { lines: CartLine[]; onDone: () => void }) {
  const [state, action, pending] = useActionState(submitOrderRequest, initialOrderState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-sage/25 bg-sage/10 p-4 text-center">
        <p className="font-display text-xl text-ink">Request received.</p>
        <p className="mt-2 text-xs leading-5 text-ink/62">{state.message}</p>
        {state.reference && <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-sage">REF {state.reference}</p>}
        <button type="button" onClick={onDone} className="mt-4 min-h-11 rounded-full bg-ink px-5 text-sm font-medium text-linen">
          Done
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="items" value={JSON.stringify(lines.map(({ id, qty }) => ({ id, qty })))} />
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="order-website">Website</label>
        <input id="order-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="order-name" className="text-xs font-medium text-ink/68">Your name</label>
          <input id="order-name" name="customer_name" required minLength={2} maxLength={100} autoComplete="name" className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-plum" />
        </div>
        <div>
          <label htmlFor="order-contact" className="text-xs font-medium text-ink/68">Phone, WhatsApp, or email</label>
          <input id="order-contact" name="contact" required minLength={5} maxLength={160} autoComplete="tel" className="mt-1 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-plum" />
        </div>
      </div>
      <div>
        <label htmlFor="order-notes" className="text-xs font-medium text-ink/68">Colour or order notes <span className="font-normal text-ink/42">(optional)</span></label>
        <textarea id="order-notes" name="notes" maxLength={1000} rows={2} className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-plum" />
      </div>
      {state.status === "error" && <p role="alert" className="text-xs text-plum">{state.message}</p>}
      <button type="submit" disabled={pending} className="min-h-12 w-full rounded-full bg-sage px-5 text-sm font-semibold text-linen transition hover:bg-ink disabled:cursor-wait disabled:opacity-60">
        {pending ? "Saving your request…" : "Request this order"}
      </button>
    </form>
  );
}

export default function CartSheet() {
  const { lines, isOpen, closeCart, removeItem, updateQty, clear } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    async function loadWhatsAppNumber() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_text")
          .select("value")
          .eq("key", "whatsapp_number")
          .maybeSingle();
        setWhatsappNumber(data?.value ?? "");
      } catch {
        setWhatsappNumber("");
      }
    }
    void loadWhatsAppNumber();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCart, isOpen]);

  const checkoutUrl = whatsappNumber && lines.length > 0
    ? buildCartWhatsAppUrl(whatsappNumber, lines)
    : null;

  return (
    <div className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen} inert={!isOpen}>
      <button type="button" aria-label="Close cart" onClick={closeCart} className={`absolute inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onTouchStart={(event) => { dragStart.current = event.touches[0]?.clientY ?? null; }}
        onTouchEnd={(event) => {
          const end = event.changedTouches[0]?.clientY;
          if (dragStart.current != null && end != null && end - dragStart.current > 80) closeCart();
          dragStart.current = null;
        }}
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-h-[78dvh] min-h-[52dvh] max-w-2xl flex-col rounded-t-[2rem] bg-linen shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="px-5 pb-3 pt-3 sm:px-7">
          <button type="button" onClick={closeCart} className="mx-auto block h-1.5 w-14 rounded-full bg-ink/20" aria-label="Close cart" />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-ink/45">Your edit</p>
              <h2 id="cart-title" className="mt-1 font-display text-3xl text-ink">Shopping bag</h2>
            </div>
            {lines.length > 0 && <button type="button" onClick={clear} className="min-h-11 px-2 text-sm text-ink/55 underline underline-offset-4">Clear</button>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4 sm:px-7">
          {lines.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center text-center">
              <p className="font-display text-2xl text-ink">Your bag is waiting.</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-ink/55">Add a veil you love, then submit the complete order for confirmation.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-line">
                    {line.photo ? <Image src={line.photo} alt="" fill className="object-cover" sizes="80px" /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg text-ink">{line.name}</p>
                    <p className="mt-1 text-xs text-ink/55">{line.price != null ? `UGX ${line.price.toLocaleString()}` : "Price on request"}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button type="button" onClick={() => updateQty(line.id, line.qty - 1)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-line text-lg" aria-label={`Decrease ${line.name} quantity`}>−</button>
                      <span className="min-w-6 text-center text-sm">{line.qty}</span>
                      <button type="button" onClick={() => updateQty(line.id, line.qty + 1)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-line text-lg" aria-label={`Increase ${line.name} quantity`}>+</button>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeItem(line.id)} className="min-h-11 self-start px-2 text-xs text-ink/50 underline underline-offset-4" aria-label={`Remove ${line.name}`}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line bg-linen px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
          {checkoutUrl ? (
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 w-full items-center justify-center rounded-full bg-sage px-5 text-sm font-semibold text-linen transition hover:bg-ink">Send order on WhatsApp</a>
          ) : lines.length > 0 ? (
            <OrderRequestForm lines={lines} onDone={() => { clear(); closeCart(); }} />
          ) : (
            <button type="button" disabled className="min-h-12 w-full rounded-full bg-ink/10 px-5 text-sm text-ink/40">Add a veil to continue</button>
          )}
          <p className="mt-2 text-center text-[0.65rem] leading-5 text-ink/45">No online payment. We’ll confirm availability and the final total with you directly.</p>
        </div>
      </section>
    </div>
  );
}
