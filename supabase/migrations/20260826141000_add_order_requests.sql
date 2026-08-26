create table if not exists public.order_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  contact text not null,
  notes text not null default '',
  items jsonb not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint order_requests_customer_name_length check (char_length(customer_name) between 2 and 100),
  constraint order_requests_contact_length check (char_length(contact) between 5 and 160),
  constraint order_requests_notes_length check (char_length(notes) <= 1000),
  constraint order_requests_items_array check (
    jsonb_typeof(items) = 'array'
    and jsonb_array_length(items) between 1 and 50
  ),
  constraint order_requests_status_valid check (status in ('new', 'contacted', 'completed', 'cancelled'))
);

alter table public.order_requests enable row level security;

grant insert on table public.order_requests to anon, authenticated;
grant select, update on table public.order_requests to authenticated;

drop policy if exists "customers create order requests" on public.order_requests;
create policy "customers create order requests"
on public.order_requests
for insert
to anon, authenticated
with check (
  status = 'new'
  and char_length(customer_name) between 2 and 100
  and char_length(contact) between 5 and 160
  and char_length(notes) <= 1000
  and jsonb_typeof(items) = 'array'
  and jsonb_array_length(items) between 1 and 50
);

drop policy if exists "admins read order requests" on public.order_requests;
create policy "admins read order requests"
on public.order_requests
for select
to authenticated
using (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admins update order requests" on public.order_requests;
create policy "admins update order requests"
on public.order_requests
for update
to authenticated
using (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
)
with check (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

create index if not exists order_requests_status_created_at_idx
on public.order_requests (status, created_at desc);
