"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ui } from "@/content/voice";

const TRIPLE_CLICK_WINDOW_MS = 1_500;

export default function FooterAdminTrigger({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const clickTimes = useRef<number[]>([]);

  if (pathname !== "/contact") {
    return <>{children}</>;
  }

  function handleClick() {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current, now].filter(
      (clickTime) => now - clickTime <= TRIPLE_CLICK_WINDOW_MS
    );

    if (clickTimes.current.length >= 3) {
      clickTimes.current = [];
      router.push("/admin");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="max-w-40 cursor-pointer select-none rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
      aria-label={ui.brand}
    >
      {children}
    </button>
  );
}
