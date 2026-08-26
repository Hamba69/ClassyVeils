import { createClient } from "@/lib/supabase/server";
import { updateOrderStatus } from "@/app/admin/actions";

type OrderItem = {
  id: string;
  qty: number;
  category_slug?: string;
  name?: string;
  price?: number | null;
};

type OrderRequest = {
  id: string;
  customer_name: string;
  contact: string;
  notes: string;
  items: OrderItem[];
  status: "new" | "contacted" | "completed" | "cancelled";
  created_at: string;
};

const statusLabels: Record<OrderRequest["status"], string> = {
  new: "New",
  contacted: "Contacted",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("order_requests")
    .select("id, customer_name, contact, notes, items, status, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Could not load orders: ${error.message}`);
  const orders = (data as OrderRequest[] | null) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-plum">Order desk</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Customer requests</h1>
          <p className="mt-2 text-sm text-ink/58">Orders captured from the shopping bag when WhatsApp is not configured.</p>
        </div>
        <p className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink/60">{orders.length} total</p>
      </div>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-line bg-white/45 p-8 text-center">
          <p className="font-display text-2xl text-ink">No requests yet.</p>
          <p className="mt-2 text-sm text-ink/55">New customer orders will appear here automatically.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-line bg-white/55 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-ink">{order.customer_name}</p>
                  <p className="mt-1 break-all text-sm text-plum">{order.contact}</p>
                  <p className="mt-1 text-xs text-ink/45">
                    {new Intl.DateTimeFormat("en-UG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Kampala" }).format(new Date(order.created_at))}
                    {` · ${order.id.slice(0, 8).toUpperCase()}`}
                  </p>
                </div>
                <span className="rounded-full bg-linen px-3 py-2 text-xs font-medium text-ink/65">{statusLabels[order.status]}</span>
              </div>

              <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-linen/45 px-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="text-ink/75">{item.qty}× {item.name ?? "Veil"}</span>
                    <span className="shrink-0 text-ink/48">{item.price != null ? `UGX ${(item.price * item.qty).toLocaleString()}` : "Price pending"}</span>
                  </li>
                ))}
              </ul>
              {order.notes && <p className="mt-4 rounded-2xl bg-linen p-4 text-sm leading-6 text-ink/65">{order.notes}</p>}

              <div className="mt-5 flex flex-wrap gap-2">
                {(["new", "contacted", "completed", "cancelled"] as const).map((status) => (
                  <form key={status} action={updateOrderStatus.bind(null, order.id, status)}>
                    <button type="submit" disabled={order.status === status} className="min-h-11 rounded-full border border-line px-4 text-xs text-ink/65 transition hover:border-plum hover:text-plum disabled:bg-ink disabled:text-linen disabled:opacity-100">
                      {statusLabels[status]}
                    </button>
                  </form>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
