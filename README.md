# Classyveils.ug

Next.js site for Classyveils.ug with a built-in admin portal at `/admin` —
no CMS, no separate dashboard product, just pages only Anisha and her helper
can reach.

## 1. Supabase setup

You said Supabase is already set up with Google OAuth working — good, this
plugs straight into that.

1. Link the Supabase CLI to the project and run `npx supabase db push`.
   If you use the SQL editor instead, run every file in `supabase/migrations/`
   in filename order. These migrations create the `categories`, `veils`,
   `site_text`, and `allowed_admins` tables, seed the four fabric categories,
   set up Row Level Security and Data API grants, and create the public
   `veil-photos` storage bucket.
2. Add the real admin emails — uncomment and run the last line of that file,
   or just run in the SQL editor:
   ```sql
   insert into allowed_admins (email) values
     ('anisha@example.com'),
     ('helper@example.com');
   ```
   Only these two Google accounts will be able to reach `/admin`.
3. In Supabase -> Authentication -> URL Configuration, make sure your site's
   real domain and `http://localhost:3000` are both in the redirect URL
   allow-list, since Google OAuth redirects through `/auth/callback`.

## 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in the two values from
Supabase -> Project Settings -> API:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Add the same two variables in Vercel -> Project Settings -> Environment
Variables when you deploy.

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site, `/admin/login` for the
portal.

## 4. Deploy

Push to your GitHub repo and import it in Vercel — it's a standard Next.js
App Router project, no special build settings needed.

## How the portal works (for Anisha)

- **`/admin`** — every veil, grouped by fabric. Add a veil with a name,
  optional price, description, and photos. Use the up/down arrows to
  reorder, "Hide" to pull something from the site without deleting it, and
  "Edit" to change details or add more photos later.
- **`/admin/categories`** — the story text on each fabric's page (the
  intro paragraph and bullet list), separate from individual veil listings.
- **`/admin/site-text`** — the homepage headline, the About page bio, and
  the WhatsApp/phone/Instagram details used across the site. The WhatsApp
  number here is what every "Order on WhatsApp" button uses.

Nothing requires touching code, Supabase, or Vercel after initial setup.
