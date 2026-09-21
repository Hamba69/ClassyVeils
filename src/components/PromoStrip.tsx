import Link from "next/link";
import { connection } from "next/server";
import { getSiteText, getCategories } from "@/lib/data";
import { enquiryUrl } from "@/lib/collection";
import { voice } from "@/content/voice";
import { kidsCategory } from "./CategoryCircles";

export default async function PromoStrip() {
  await connection();
  const [text, categories] = await Promise.all([getSiteText(), getCategories()]);
  const kids = kidsCategory(categories);
  return <div className="cv-promo"><span>{voice.promo.text}</span><a href={enquiryUrl(text.whatsapp_number)}>{voice.promo.chat}</a>
    {kids && <Link href={"/shop?category=" + encodeURIComponent(kids.slug)}>{voice.promo.kids}</Link>}
  </div>;
}
