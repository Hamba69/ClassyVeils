-- Admin access now terminates in the Next.js server. The application uses a
-- server-only secret key after validating its own signed admin session.

drop policy if exists "admins read own allowlist entry" on public.allowed_admins;

drop policy if exists "read visible or admin veils" on public.veils;
drop policy if exists "admin insert veils" on public.veils;
drop policy if exists "admin update veils" on public.veils;
drop policy if exists "admin delete veils" on public.veils;
drop policy if exists "public read visible veils" on public.veils;
create policy "public read visible veils"
on public.veils
for select
to anon, authenticated
using (visible = true);

drop policy if exists "admin update categories" on public.categories;
drop policy if exists "admin insert site_text" on public.site_text;
drop policy if exists "admin update site_text" on public.site_text;

drop policy if exists "admin upload veil photos" on storage.objects;
drop policy if exists "admin delete veil photos" on storage.objects;
drop policy if exists "admin upload veil editorial" on storage.objects;
drop policy if exists "admin update veil editorial" on storage.objects;
drop policy if exists "admin delete veil editorial" on storage.objects;

drop policy if exists "admins read order requests" on public.order_requests;
drop policy if exists "admins update order requests" on public.order_requests;

revoke insert, update, delete on table public.veils from authenticated;
revoke update on table public.categories from authenticated;
revoke insert, update on table public.site_text from authenticated;
revoke select, update on table public.order_requests from authenticated;
revoke select on table public.allowed_admins from authenticated;

drop table public.allowed_admins;
