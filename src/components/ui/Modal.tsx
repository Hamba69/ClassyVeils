"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { voice } from "@/content/voice";

export default function Modal({ open, onClose, labelledBy, children, className = "", dragToClose = false }: {
  open: boolean; onClose: () => void; labelledBy: string; children: ReactNode; className?: string; dragToClose?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const start = useRef<number | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const focus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (focus?.isConnected) focus.focus({ preventScroll: true });
    };
  }, [open]);
  return <dialog ref={ref} className={`cv-sheet ${className}`} aria-labelledby={labelledBy} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
  }}>
    {dragToClose && <div className="cv-grabber" aria-hidden="true" onPointerDown={(event) => { start.current = event.clientY; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (start.current !== null && event.clientY - start.current > 80) onClose(); start.current = null; }} onPointerCancel={() => { start.current = null; }}><span /></div>}
    <button type="button" className="cv-close" onClick={onClose}>{voice.quickView.close}</button>
    {children}
  </dialog>;
}
