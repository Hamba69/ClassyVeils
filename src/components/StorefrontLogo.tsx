import Image from "next/image";
import logo from "../../public/brand/classyveils-refined.png";
import { ui } from "@/content/voice";

export default function StorefrontLogo({ small = false, preload = false }: { small?: boolean; preload?: boolean }) {
  return <Image src={logo} alt={ui.logo} preload={preload} className={small ? "cv-logo-small" : "cv-logo"} sizes={small ? "56px" : "160px"} />;
}
