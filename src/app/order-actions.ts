"use server";

import { randomUUID } from "node:crypto";
import { voice } from "@/content/voice";
import { createClient } from "@/lib/supabase/server";
import { parseRequestedLines, orderItems } from "@/lib/cart/order-request";

export type OrderRequestState = { status: "idle" | "success" | "error"; message: string; reference?: string };
const failed: OrderRequestState = { status: "error", message: voice.picks.error };
function field(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

export async function submitOrderRequest(_previousState: OrderRequestState, form: FormData): Promise<OrderRequestState> {
  const customerName = field(form, "customer_name", 100);
  const contact = field(form, "contact", 160);
  const notes = field(form, "notes", 1000);
  if (field(form, "website", 200)) return { status: "success", message: voice.picks.successBody, reference: randomUUID().slice(0, 8).toUpperCase() };
  if (customerName.length < 2 || contact.length < 5) return failed;
  const lines = parseRequestedLines(String(form.get("items") ?? "[]"));
  if (!lines) return failed;
  try {
    const supabase = await createClient();
    const ids = lines.filter((line) => line.id.startsWith("veil:")).map((line) => line.id.slice(5));
    const { data: veils, error: lookupError } = ids.length
      ? await supabase.from("veils").select("id, category_slug, name, price").in("id", ids).eq("visible", true)
      : { data: [], error: null };
    if (lookupError || !veils || veils.length !== ids.length) return failed;
    const items = orderItems(lines, veils);
    if (!items) return failed;
    const id = randomUUID();
    const { error } = await supabase.from("order_requests").insert({ id, customer_name: customerName, contact, notes, items });
    if (error) return failed;
    return { status: "success", message: voice.picks.successBody, reference: id.slice(0, 8).toUpperCase() };
  } catch {
    return failed;
  }
}
