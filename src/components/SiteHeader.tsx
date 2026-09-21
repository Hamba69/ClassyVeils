"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import StorefrontLogo from "./StorefrontLogo";
import { useCart } from "@/lib/cart/CartContext";
import { voice, ui } from "@/content/voice";

const links = [["/shop", voice.nav.shop], ["/lookbook", voice.nav.lookbook], ["/styling", voice.nav.style], ["/about", voice.nav.about], ["/contact", voice.nav.contact]];
export default function SiteHeader({ promo }: { promo?: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const cart = useCart();
  return <header className="cv-header">{promo}<div className="cv-header-inner">
    <Link href="/" className="cv-brand" aria-label={ui.home} onClick={() => setOpen(false)}><StorefrontLogo small preload /><span>{ui.brand}<small>{voice.brand.tagline}</small></span></Link>
    <button className="cv-menu-toggle" aria-expanded={open} aria-controls="cv-navigation" onClick={() => setOpen((value) => !value)}>{open ? voice.nav.menuClose : voice.nav.menuOpen}</button>
    <nav id="cv-navigation" className={"cv-nav " + (open ? "cv-nav-open" : "")} aria-label={ui.navigation} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
      {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <button className="cv-header-picks cv-button" data-picks-target aria-label={ui.picksCount(cart.itemCount)} aria-expanded={cart.isOpen} disabled={!cart.ready} onClick={cart.openCart}>
      <svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><path d="M24 39C18 34 6 27 6 17C6 6 20 5 24 14C28 5 42 6 42 17C42 27 30 35 24 39Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      {voice.nav.picks}<span className="cv-badge" key={cart.itemCount}>{cart.itemCount}</span>
    </button>
  </div></header>;
}
