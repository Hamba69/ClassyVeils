"use client";

import { usePathname } from "next/navigation";
import { voice } from "@/content/voice";
import { useRef } from "react";

const TRIPLE_CLICK_WINDOW_MS = 1_500;

const SECRET_IMAGES = [
  "Strong Together.png",
  "Skilling For Tomorrow.png",
  "Guided Growth.png",
  "Empower and equip.png",
  "Access Learn Rise.png",
];

export default function SecretDownloadTrigger() {
  const pathname = usePathname();
  const clickTimes = useRef<number[]>([]);

  if (pathname !== "/contact") {
    return <span>{voice.brand.footerThanks}</span>;
  }

  function handleClick() {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current, now].filter(
      (clickTime) => now - clickTime <= TRIPLE_CLICK_WINDOW_MS,
    );

    if (clickTimes.current.length < 3) {
      return;
    }

    clickTimes.current = [];

    for (const filename of SECRET_IMAGES) {
      const download = document.createElement("a");
      download.href = `/secrets/${encodeURIComponent(filename)}`;
      download.download = filename;
      download.click();
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer select-none border-0 bg-transparent p-0 font-inherit text-inherit"
      aria-label={voice.brand.footerThanks}
    >
      {voice.brand.footerThanks}
    </button>
  );
}
