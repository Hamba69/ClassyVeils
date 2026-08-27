import Image from "next/image";
import logo from "../../assets/CVA/Logo.png";

export default function BrandLogo({
  variant = "full",
  priority = false,
  className = "",
}: {
  variant?: "full" | "mark";
  priority?: boolean;
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <span
        aria-hidden="true"
        className={`relative block size-12 shrink-0 overflow-hidden rounded-full border border-line/80 bg-[#fbf8f3] shadow-[0_8px_24px_rgba(75,61,50,0.08)] ${className}`}
      >
        <Image
          src={logo}
          alt=""
          priority={priority}
          className="absolute left-1/2 top-1/2 h-auto w-24 max-w-none -translate-x-1/2 -translate-y-[46%]"
          sizes="96px"
        />
      </span>
    );
  }

  return (
    <Image
      src={logo}
      alt="Classy Veils — Elegance in every drape"
      priority={priority}
      className={`h-auto w-full ${className}`}
      sizes="(min-width: 640px) 18rem, 14rem"
    />
  );
}
