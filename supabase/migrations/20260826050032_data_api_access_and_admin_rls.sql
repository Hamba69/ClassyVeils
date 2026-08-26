-- New Supabase projects no longer expose public-schema tables to the Data API
-- by default. Grant only the operations used by the storefront and admin UI.
grant usage on schema public to anon, authenticated;

grant select on table
  public.categories,
  public.site_text,
  public.veils
to anon, authenticated;

grant select on table public.allowed_admins to authenticated;
grant insert, update, delete on table public.veils to authenticated;
grant update on table public.categories to authenticated;
grant insert, update on table public.site_text to authenticated;

-- The proxy checks only whether the signed-in user's own email is allowlisted.
-- Do not expose the rest of the administrator list.
drop policy if exists "admins read own allowlist entry" on public.allowed_admins;
create policy "admins read own allowlist entry"
on public.allowed_admins
for select
to authenticated
using (email = (select auth.jwt() ->> 'email'));

-- PostgreSQL does not create an index automatically for referencing FK columns.
create index if not exists veils_category_slug_idx
on public.veils (category_slug);
