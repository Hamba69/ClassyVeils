"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "./BrandLogo";

const links = [
  ["/shop", "Collection"],
  ["/lookbook", "The lookbook"],
  ["/styling", "Styling notes"],
  ["/about", "Our story"],
  ["/contact", "Contact"],
];

export default function SiteHeader({ promo }: { promo?: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      {promo}
      <div className="header-inner">
        <Link
          href="/"
          aria-label="ClassyVeils home"
          onClick={() => setOpen(false)}
          className="brand-lockup"
        >
          <BrandLogo variant="mark" priority />
          <span>
            CLASSY VEILS<small>Choose your colour story</small>
          </span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
