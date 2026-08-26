"use server";

import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";

export type OrderRequestState = {
  status: "idle" | "success" | "error";
  message: string;
  reference?: string;
};

type RequestedLine = { id: string; qty: number };

const initialError: OrderRequestState = {
  status: "error",
  message: "We could not save that request. Check the details and try again.",
};

function textField(formData: FormData, name: string, maxLength: number) {
  return String(formData.get(name) ?? "").trim().slice(0, maxLength);
}

export async function submitOrderRequest(
  _previousState: OrderRequestState,
  formData: FormData,
): Promise<OrderRequestState> {
  const customerName = textField(formData, "customer_name", 100);
  const contact = textField(formData, "contact", 160);
  const notes = textField(formData, "notes", 1000);
  const website = textField(formData, "website", 200);

  if (website) {
    return { status: "success", message: "Your request has been received." };
  }
  if (customerName.length < 2 || contact.length < 5) return initialError;

  let requestedLines: RequestedLine[];
  try {
    const parsed: unknown = JSON.parse(String(formData.get("items") ?? "[]"));
    if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 50) return initialError;
    requestedLines = parsed
      .filter((line): line is RequestedLine => {
        if (!line || typeof line !== "object") return false;
        const candidate = line as Partial<RequestedLine>;
        return typeof candidate.id === "string"
          && /^[0-9a-f-]{36}$/i.test(candidate.id)
          && typeof candidate.qty === "number"
          && Number.isInteger(candidate.qty)
          && candidate.qty >= 1
          && candidate.qty <= 20;
      });
    if (requestedLines.length !== parsed.length) return initialError;
  } catch {
    return initialError;
  }

  const ids = [...new Set(requestedLines.map((line) => line.id))];
  const supabase = await createClient();
  const { data: veils, error: veilError } = await supabase
    .from("veils")
    .select("id, category_slug, name, price")
    .in("id", ids)
    .eq("visible", true);

  if (veilError || !veils || veils.length !== ids.length) return initialError;
  const veilById = new Map(veils.map((veil) => [veil.id, veil]));
  const items = requestedLines.map((line) => {
    const veil = veilById.get(line.id);
    return {
      id: line.id,
      qty: line.qty,
      category_slug: veil?.category_slug,
      name: veil?.name,
      price: veil?.price,
    };
  });

  const id = randomUUID();
  const { error } = await supabase.from("order_requests").insert({
    id,
    customer_name: customerName,
    contact,
    notes,
    items,
  });
  if (error) {
    console.error("submitOrderRequest failed:", error.message);
    return initialError;
  }

  return {
    status: "success",
    message: "Your order request is saved. Classyveils will contact you to confirm availability and the total.",
    reference: id.slice(0, 8).toUpperCase(),
  };
}
