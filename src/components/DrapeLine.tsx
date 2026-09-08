"use client";

import { useEffect, useRef } from "react";

export default function DrapeLine({
  underline = false,
}: {
  underline?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    element.classList.add("drape-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("drape-drawn");
        observer.disconnect();
      }
    });
    observer.observe(element);
    const finish = () => {
      if (preference.matches) {
        element.classList.add("drape-drawn");
        observer.disconnect();
      }
    };
    preference.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", finish);
    };
  }, []);
  return (
    <svg
      ref={ref}
      className={
        underline ? "drape-line drape-underline" : "drape-line drape-divider"
      }
      viewBox="0 0 240 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 12C45 5 71 7 95 20S133 42 157 29S193 13 237 22"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
