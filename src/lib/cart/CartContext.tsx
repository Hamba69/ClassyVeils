"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = {
  id: string;
  name: string;
  price: number | null;
  qty: number;
  photo: string | null;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  isOpen: boolean;
  addItem: (line: Omit<CartLine, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "classyveils-cart";
const STORAGE_VERSION = 1;

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.id === "string" &&
    typeof line.name === "string" &&
    (typeof line.price === "number" || line.price === null) &&
    typeof line.qty === "number" &&
    line.qty > 0 &&
    (typeof line.photo === "string" || line.photo === null)
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        const storedLines = Array.isArray(parsed)
          ? parsed
          : parsed && typeof parsed === "object" && (parsed as { version?: unknown }).version === STORAGE_VERSION
            ? (parsed as { lines?: unknown }).lines
            : [];
        if (Array.isArray(storedLines)) setLines(storedLines.filter(isCartLine));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, lines }));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((total, line) => total + line.qty, 0),
      isOpen,
      addItem(line, qty = 1) {
        const safeQty = Math.max(1, Math.floor(qty));
        setLines((current) => {
          const existing = current.find((item) => item.id === line.id);
          if (existing) {
            return current.map((item) =>
              item.id === line.id ? { ...item, qty: item.qty + safeQty } : item
            );
          }
          return [...current, { ...line, qty: safeQty }];
        });
      },
      removeItem(id) {
        setLines((current) => current.filter((line) => line.id !== id));
      },
      updateQty(id, qty) {
        const safeQty = Math.max(1, Math.floor(qty));
        setLines((current) =>
          current.map((line) => (line.id === id ? { ...line, qty: safeQty } : line))
        );
      },
      clear() {
        setLines([]);
      },
      openCart() {
        setIsOpen(true);
      },
      closeCart() {
        setIsOpen(false);
      },
    }),
    [isOpen, lines]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
