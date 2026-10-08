"use client";

import type { ReactNode } from "react";

export default function ConfirmSubmitButton({ children, message, className, ariaLabel }: {
  children: ReactNode;
  message: string;
  className: string;
  ariaLabel?: string;
}) {
  return <button
    type="submit"
    aria-label={ariaLabel}
    className={className}
    onClick={(event) => {
      if (!window.confirm(message)) event.preventDefault();
    }}
  >{children}</button>;
}
