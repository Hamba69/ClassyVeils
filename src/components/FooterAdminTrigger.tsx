"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import BrandLogo from "./BrandLogo";

const TRIPLE_CLICK_WINDOW_MS = 1_500;

export default function FooterAdminTrigger() {
  const pathname = usePathname();
  const router = useRouter();
  const clickTimes = useRef<number[]>([]);

  if (pathname !== "/contact") {
    return <BrandLogo className="max-w-40" />;
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
      aria-label="Classy Veils"
    >
      <BrandLogo />
    </button>
  );
}
