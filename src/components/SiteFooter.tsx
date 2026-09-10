import Link from "next/link";
import FooterAdminTrigger from "./FooterAdminTrigger";
import SecretDownloadTrigger from "./SecretDownloadTrigger";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <FooterAdminTrigger />
          <p className="mt-5 text-sm">Veils and scarves, chosen by Anisha.</p>
        </div>
        <div>
          <p className="eyebrow">Make yourself at home</p>
          <Link href="/shop">The collection</Link>
          <Link href="/lookbook">The lookbook</Link>
          <Link href="/styling">Styling notes</Link>
        </div>
        <div>
          <p className="eyebrow">A personal touch</p>
          <Link href="/about">Meet Anisha</Link>
          <Link href="/contact">Talk through your choice ↗</Link>
          <p className="mt-5 text-sm">Thank you for visiting my edit.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Classyveils.ug · Anisha B Yusurah</span>
        <SecretDownloadTrigger />
      </div>
    </footer>
  );
}
