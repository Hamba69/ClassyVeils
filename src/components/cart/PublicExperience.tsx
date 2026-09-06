"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PublicExperience({ children, header, footer }: { children: React.ReactNode; header: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    try { window.localStorage.removeItem("classyveils-cart"); } catch { /* Storage may be disabled in the browser. */ }
  }, []);
  if (pathname.startsWith("/admin")) return children;

  return (
      <div className="flex min-h-screen flex-col">
        {header}
        <div className="flex-1">{children}</div>
        {footer}
      </div>
  );
}
