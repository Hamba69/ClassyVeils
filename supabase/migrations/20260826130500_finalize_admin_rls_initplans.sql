-- Supabase's linter recognizes the auth call itself as the initplan target.
-- Parenthesize `select auth.jwt()` before extracting the email claim.

drop policy if exists "admins read own allowlist entry" on public.allowed_admins;
create policy "admins read own allowlist entry"
on public.allowed_admins
for select
to authenticated
using (email = ((select auth.jwt()) ->> 'email'));

drop policy if exists "read visible or admin veils" on public.veils;
create policy "read visible or admin veils"
on public.veils
for select
to anon, authenticated
using (
  visible = true
  or ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin insert veils" on public.veils;
create policy "admin insert veils"
on public.veils
for insert
to authenticated
with check (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update veils" on public.veils;
create policy "admin update veils"
on public.veils
for update
to authenticated
using (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
)
with check (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin delete veils" on public.veils;
create policy "admin delete veils"
on public.veils
for delete
to authenticated
using (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update categories" on public.categories;
create policy "admin update categories"
on public.categories
for update
to authenticated
using (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
)
with check (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin insert site_text" on public.site_text;
create policy "admin insert site_text"
on public.site_text
for insert
to authenticated
with check (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update site_text" on public.site_text;
create policy "admin update site_text"
on public.site_text
for update
to authenticated
using (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
)
with check (
  ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin upload veil photos" on storage.objects;
create policy "admin upload veil photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'veil-photos'
  and ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin delete veil photos" on storage.objects;
create policy "admin delete veil photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'veil-photos'
  and ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin upload veil editorial" on storage.objects;
create policy "admin upload veil editorial"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'veil-editorial'
  and ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin update veil editorial" on storage.objects;
create policy "admin update veil editorial"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'veil-editorial'
  and ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
)
with check (
  bucket_id = 'veil-editorial'
  and ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);

drop policy if exists "admin delete veil editorial" on storage.objects;
create policy "admin delete veil editorial"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'veil-editorial'
  and ((select auth.jwt()) ->> 'email') in (select email from public.allowed_admins)
);
