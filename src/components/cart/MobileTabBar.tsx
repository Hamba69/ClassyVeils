"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandNavIcon from "@/components/BrandNavIcon";
import { useCart } from "@/lib/cart/CartContext";

const tabs = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/shop", label: "Shop", icon: "shop" },
  { href: "/contact", label: "Contact", icon: "contact" },
] as const;

export default function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const link = (tab: (typeof tabs)[number]) => {
    const active =
      pathname === tab.href ||
      (tab.label === "Shop" && (pathname.startsWith("/veils/") || pathname === "/shop"));

    return (
      <Link
        key={tab.href}
        href={tab.href}
        className={`flex min-h-14 flex-col items-center justify-center rounded-2xl text-[0.65rem] transition ${
          active ? "bg-white text-plum ring-1 ring-plum/20" : "text-ink/60"
        }`}
      >
        <BrandNavIcon name={tab.icon} />
        <span className="mt-0.5">{tab.label}</span>
      </Link>
    );
  };

  return (
    <nav
      aria-label="Mobile storefront navigation"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-4 rounded-[1.4rem] border border-white/70 bg-linen/95 p-1.5 shadow-[0_14px_45px_rgba(43,38,34,0.22)] backdrop-blur-xl md:hidden"
    >
      {tabs.slice(0, 2).map(link)}
      <button
        type="button"
        onClick={openCart}
        className="relative flex min-h-14 flex-col items-center justify-center rounded-2xl text-[0.65rem] text-ink/60"
        aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      >
        <BrandNavIcon name="cart" />
        <span className="mt-0.5">Cart</span>
        {itemCount > 0 && (
          <span className="absolute right-[22%] top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-plum px-1 text-[0.6rem] font-semibold text-white">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>
      {tabs.slice(2).map(link)}
    </nav>
  );
}
