import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  return ["/", "/shop", "/lookbook", "/styling", "/about", "/contact"].map((pathname) => ({
    url: new URL(pathname, origin).toString(),
    changeFrequency: pathname === "/" || pathname === "/shop" ? "weekly" : "monthly",
    priority: pathname === "/" ? 1 : pathname === "/shop" ? 0.9 : 0.7,
  }));
}
