import Link from "next/link";
import { voice, ui } from "@/content/voice";
import FooterAdminTrigger from "./FooterAdminTrigger";
import SecretDownloadTrigger from "./SecretDownloadTrigger";
import StorefrontLogo from "./StorefrontLogo";

export default function SiteFooter() {
  return <footer className="cv-footer"><div className="cv-footer-grid">
    <div><FooterAdminTrigger><StorefrontLogo /></FooterAdminTrigger><p>{voice.brand.footerLine}</p></div>
    <div><Link href="/shop">{voice.nav.shop}</Link><Link href="/lookbook">{voice.nav.lookbook}</Link><Link href="/styling">{voice.nav.style}</Link></div>
    <div><Link href="/about">{voice.nav.about}</Link><Link href="/contact">{voice.nav.contact}</Link><p>{voice.brand.footerThanks}</p></div>
  </div><div className="cv-footer-bottom"><span>{ui.brand}</span><SecretDownloadTrigger /></div></footer>;
}
