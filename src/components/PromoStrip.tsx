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
  const chatUrl = enquiryUrl(text.whatsapp_number);
  return <div className="cv-promo"><span>{chatUrl ? voice.promo.text : voice.contact.whatsappUnavailable}</span>{chatUrl && <a href={chatUrl} target="_blank" rel="noopener noreferrer">{voice.promo.chat}</a>}
    {kids && <Link href={"/shop?category=" + encodeURIComponent(kids.slug)}>{voice.promo.kids}</Link>}
  </div>;
}
