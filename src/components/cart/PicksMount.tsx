import { connection } from "next/server";
import { getSiteText } from "@/lib/data";
import PicksSheet from "./PicksSheet";
import MobileTabBar from "./MobileTabBar";

export default async function PicksMount() {
  await connection();
  const text = await getSiteText();
  return <><PicksSheet whatsappNumber={text.whatsapp_number} /><MobileTabBar number={text.whatsapp_number} /></>;
}
