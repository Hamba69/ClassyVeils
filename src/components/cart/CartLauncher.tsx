"use client";

import { useCart } from "@/lib/cart/CartContext";

export default function CartLauncher() {
  const { itemCount, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      className="relative hidden min-h-11 items-center rounded-full border border-line bg-white/60 px-4 text-sm text-ink/75 transition hover:border-plum hover:text-plum md:inline-flex"
      aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      Cart
      {itemCount > 0 && (
        <span className="ml-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-plum px-1 text-[0.65rem] font-semibold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
