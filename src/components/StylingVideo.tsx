"use client";

import { useEffect, useRef } from "react";

export default function StylingVideo({ src }: { src?: string | null }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (preference.matches) video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !preference.matches)
          video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    preference.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
    };
  }, [src]);
  if (!src)
    return (
      <div className="video-gap">
        <svg
          viewBox="0 0 64 64"
          width="52"
          height="52"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="6"
            y="12"
            width="52"
            height="40"
            rx="12"
            stroke="currentColor"
          />
          <path d="m27 23 14 9-14 9Z" stroke="currentColor" />
        </svg>
        <p>Styling film coming soon</p>
        <span>Anisha’s draping demonstration will appear here.</span>
      </div>
    );
  return (
    <video
      ref={ref}
      className="styling-video"
      src={src}
      controls
      loop
      muted
      playsInline
      preload="metadata"
      aria-label="ClassyVeils draping and styling demonstration"
    />
  );
}
