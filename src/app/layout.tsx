import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import PromoStrip from "@/components/PromoStrip";
import SiteFooter from "@/components/SiteFooter";
import PublicExperience from "@/components/cart/PublicExperience";
import { Analytics } from "@vercel/analytics/next";

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

const metadataBase = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase,
  title: "Classyveils.ug - Find your shade",
  description:
    "Explore Anisha’s considered edit of veils and scarves, selected for colour, comfort, and effortless styling.",
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
        >
          {children}
        </PublicExperience>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
