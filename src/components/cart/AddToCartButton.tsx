"use client";

import { useState } from "react";
import { useCart, type CartLine } from "@/lib/cart/CartContext";

export default function AddToCartButton({ item }: { item: Omit<CartLine, "qty"> }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(item);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink hover:text-linen sm:w-auto"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
