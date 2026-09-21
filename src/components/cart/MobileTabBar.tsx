"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { voice, ui } from "@/content/voice";
import { enquiryUrl } from "@/lib/collection";

export default function MobileTabBar({ number }: { number: string }) {
  const pathname = usePathname();
  const cart = useCart();
  const index = cart.isOpen ? 2 : pathname === "/" ? 0 : pathname.startsWith("/shop") ? 1 : pathname === "/styling" ? 3 : pathname === "/contact" ? 4 : -1;
  return <nav className="cv-tabs" aria-label={ui.mobileNavigation} style={{ "--tab": index } as CSSProperties}>
    <span className="cv-tab-indicator" aria-hidden="true" style={{ opacity: index < 0 ? 0 : 1 }} />
    <Link href="/" aria-current={pathname === "/" && !cart.isOpen ? "page" : undefined}>{voice.tabs.home}</Link>
    <Link href="/shop" aria-current={pathname === "/shop" && !cart.isOpen ? "page" : undefined}>{voice.tabs.shop}</Link>
    <button data-picks-target aria-label={ui.picksCount(cart.itemCount)} aria-expanded={cart.isOpen} disabled={!cart.ready} onClick={cart.openCart}>{voice.tabs.picks}<span className="cv-badge" key={cart.itemCount}>{cart.itemCount}</span></button>
    <Link href="/styling" aria-current={pathname === "/styling" && !cart.isOpen ? "page" : undefined}>{voice.tabs.style}</Link>
    <a href={enquiryUrl(number)} target="_blank" rel="noopener noreferrer">{voice.tabs.chat}</a>
  </nav>;
}
