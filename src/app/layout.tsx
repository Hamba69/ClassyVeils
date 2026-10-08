import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./experience.css";
import {Suspense} from "react";
import PicksMount from "@/components/cart/PicksMount";
import {voice} from "@/content/voice";
import SiteHeader from "@/components/SiteHeader";
import PromoStrip from "@/components/PromoStrip";
import SiteFooter from "@/components/SiteFooter";
import PublicExperience from "@/components/cart/PublicExperience";
import { Analytics } from "@vercel/analytics/next";
import { getSiteOrigin } from "@/lib/site-url";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const generalSans = localFont({
  variable: "--font-general-sans",
  src: [
    { path: "./fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/general-sans-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

const metadataBase = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase,
  title: { default: voice.brand.siteTitle, template: "%s | Classyveils.ug" },
  description: voice.brand.siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: "Classyveils.ug",
    title: voice.brand.siteTitle,
    description: voice.brand.siteDescription,
    images: ["/opengraph-image.png"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${generalSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-linen text-ink">
        <PublicExperience
          header={<SiteHeader promo={<PromoStrip />} />}
          footer={<SiteFooter />}
          picks={<Suspense fallback={null}><PicksMount /></Suspense>}
        >
          {children}
        </PublicExperience>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
