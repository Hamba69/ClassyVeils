"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/lib/cart/CartContext";
import CartSheet from "./CartSheet";
import MobileTabBar from "./MobileTabBar";

export default function PublicExperience({ children, header, footer }: { children: React.ReactNode; header: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col pb-24 md:pb-0">
        {header}
        <div className="flex-1">{children}</div>
        {footer}
      </div>
      <MobileTabBar />
      <CartSheet />
    </CartProvider>
  );
}
