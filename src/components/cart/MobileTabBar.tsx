"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";

const tabs = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/shop", label: "Shop", icon: "◇" },
  { href: "/contact", label: "Contact", icon: "✦" },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const link = (tab: (typeof tabs)[number]) => (
    <Link
      key={tab.href}
      href={tab.href}
      className={`flex min-h-12 flex-col items-center justify-center rounded-2xl text-[0.65rem] transition ${
        pathname === tab.href || (tab.label === "Shop" && (pathname.startsWith("/veils/") || pathname === "/shop"))
          ? "bg-ink text-linen"
          : "text-ink/60"
      }`}
    >
      <span className="text-base leading-none" aria-hidden="true">{tab.icon}</span>
      <span className="mt-1">{tab.label}</span>
    </Link>
  );

  return (
    <nav aria-label="Mobile storefront navigation" className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-4 rounded-[1.4rem] border border-white/70 bg-linen/95 p-1.5 shadow-[0_14px_45px_rgba(43,38,34,0.22)] backdrop-blur-xl md:hidden">
      {tabs.slice(0, 2).map(link)}
      <button type="button" onClick={openCart} className="relative flex min-h-12 flex-col items-center justify-center rounded-2xl text-[0.65rem] text-ink/60" aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}>
        <span className="text-base leading-none" aria-hidden="true">▱</span>
        <span className="mt-1">Cart</span>
        {itemCount > 0 && <span className="absolute right-[24%] top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-plum px-1 text-[0.6rem] font-semibold text-white">{itemCount > 99 ? "99+" : itemCount}</span>}
      </button>
      {tabs.slice(2).map(link)}
    </nav>
  );
}
