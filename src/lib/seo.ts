import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/site-url";

export function publicPageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title: `${title} | Classyveils.ug`,
      description,
      url: new URL(pathname, getSiteOrigin()),
      type: "website",
    },
  };
}
