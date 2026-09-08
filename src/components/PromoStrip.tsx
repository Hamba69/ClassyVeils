import Link from "next/link";
import { connection } from "next/server";
import { getCategories, getSiteText } from "@/lib/data";
import { enquiryUrl } from "@/lib/collection";
import { kidsCategory } from "./CategoryCircles";

export default async function PromoStrip() {
  await connection();
  const [text, categories] = await Promise.all([
    getSiteText(),
    getCategories(),
  ]);
  const kids = kidsCategory(categories);
  return (
    <div className="promo-strip" aria-label="Delivery and help">
      <span>Delivery details? Let’s arrange them on WhatsApp.</span>
      <a href={enquiryUrl(text.whatsapp_number)} className="promo-pill">
        Chat with Anisha ↗
      </a>
      <Link
        className="kids-badge"
        href={
          kids
            ? `/shop?category=${encodeURIComponent(kids.slug)}`
            : "/shop#kids-veils"
        }
      >
        Children’s collection ↗
      </Link>
    </div>
  );
}
