"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ShadeId } from "@/lib/shades";

export type CartLine = {
  id: string;
  name: string;
  label?: string;
  ref?: string;
  veilId?: string;
  shade?: ShadeId | null;
  price: number | null;
  qty: number;
  photo: string | null;
};

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  itemCount: number;
  isOpen: boolean;
  message: string;
  announce: (message: string) => void;
  has: (id: string) => boolean;
  toggle: (line: Omit<CartLine, "qty">) => void;
  addItem: (line: Omit<CartLine, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "classyveils-picks";
const STORAGE_VERSION = 2;
const safeQty = (qty: number) => Number.isFinite(qty) ? Math.min(20, Math.max(1, Math.floor(qty))) : 1;

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return typeof line.id === "string" && /^(ref:\d{4}|veil:[0-9a-f-]{36})$/i.test(line.id)
    && typeof line.name === "string"
    && (line.label === undefined || typeof line.label === "string")
    && (line.ref === undefined || typeof line.ref === "string")
    && (line.price === null || (typeof line.price === "number" && Number.isFinite(line.price) && line.price >= 0))
    && typeof line.qty === "number" && Number.isInteger(line.qty) && line.qty >= 1 && line.qty <= 20
    && (line.photo === null || (typeof line.photo === "string" && /^(\/collection\/|https:\/\/)/.test(line.photo)));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (parsed && typeof parsed === "object" && "version" in parsed && parsed.version === STORAGE_VERSION && "lines" in parsed && Array.isArray(parsed.lines)) {
          const seen = new Set<string>();
          setLines(parsed.lines.filter(isCartLine).filter((line) => {
            if (seen.has(line.id)) return false;
            seen.add(line.id);
            return true;
          }).slice(0, 50));
        }
      } catch { /* Storage can be unavailable; in-memory picks still work. */ }
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, lines })); }
    catch { /* Keep the current visit usable if storage is full or disabled. */ }
  }, [lines, ready]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  const value = useMemo<CartContextValue>(() => ({
    lines, ready, isOpen, message, announce: setMessage,
    itemCount: lines.reduce((n, line) => n + line.qty, 0),
    has: (id) => lines.some((line) => line.id === id),
    toggle: (line) => setLines((current) => current.some((l) => l.id === line.id)
      ? current.filter((l) => l.id !== line.id)
      : current.length < 50 ? [...current, { ...line, qty: 1 }] : current),
    addItem(line, qty = 1) {
      setLines((current) => current.some((l) => l.id === line.id)
        ? current.map((l) => l.id === line.id ? { ...l, qty: safeQty(l.qty + safeQty(qty)) } : l)
        : current.length < 50 ? [...current, { ...line, qty: safeQty(qty) }] : current);
    },
    removeItem: (id) => setLines((current) => current.filter((l) => l.id !== id)),
    updateQty: (id, qty) => setLines((current) => current.map((l) => l.id === id ? { ...l, qty: safeQty(qty) } : l)),
    clear: () => setLines([]),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }), [lines, ready, isOpen, message]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
