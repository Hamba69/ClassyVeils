import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PublicExperience from "@/components/cart/PublicExperience";
import { Analytics } from "@vercel/analytics/next";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const metadataBase = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase,
  title: "Classyveils.ug - Classy and luxurious veils",
  description:
    "Classy and luxurious veils and scarves. Discover everyday elegance, graceful styling and the latest ClassyVeils collection with Anisha.",
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
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-linen text-ink">
        <PublicExperience header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </PublicExperience>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
