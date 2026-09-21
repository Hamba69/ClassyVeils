"use client";

import { usePathname } from "next/navigation";
import { CartProvider, useCart } from "@/lib/cart/CartContext";

function Toast() {
  const { message } = useCart();
  return <div className="cv-toast" role="status" aria-live="polite" data-visible={!!message}>{message}</div>;
}
export default function PublicExperience({ children, header, footer, picks }: {
  children: React.ReactNode; header: React.ReactNode; footer: React.ReactNode; picks: React.ReactNode;
}) {
  const path = usePathname();
  if (path.startsWith("/admin")) return children;
  return <CartProvider><div className="cv-public">{header}<div className="cv-content">{children}</div>{footer}{picks}<Toast /></div></CartProvider>;
}
