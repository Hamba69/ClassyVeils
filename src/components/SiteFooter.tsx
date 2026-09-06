import Link from 'next/link';
import FooterAdminTrigger from './FooterAdminTrigger';

export default function SiteFooter() {
  return <footer className="site-footer"><div className="footer-grid"><div><FooterAdminTrigger /><p className="mt-5 text-sm">Classy and luxurious veils & scarves.</p></div><div><p className="eyebrow">Make yourself at home</p><Link href="/shop">The collection</Link><Link href="/lookbook">The lookbook</Link><Link href="/styling">Styling notes</Link></div><div><p className="eyebrow">A personal touch</p><Link href="/about">Meet Anisha</Link><Link href="/contact">Let’s talk veils ↗</Link><p className="mt-5 text-sm">Elegance, with you in mind.</p></div></div><div className="footer-bottom"><span>Classyveils.ug · Anisha B Yusurah</span><span>Celebrate Your Veil</span></div></footer>;
}
