# Classyveils.ug

Next.js site for Classyveils.ug with a built-in, environment-protected admin
portal at `/admin` — no CMS and no separate dashboard product.

## 1. Supabase setup

Link the Supabase CLI to the project and run `npx supabase db push`. If you use
the SQL editor instead, run every file in `supabase/migrations/` in filename
order. The migrations create the catalogue and order tables, set up Row Level
Security and Data API grants, seed the fabric categories, and create the public
image buckets. The final auth migration removes the retired Supabase Auth admin
policies.

## 2. Environment variables

Copy `.env.local.example` to `.env.local`. Fill in the public values from
Supabase, one server-only secret key, and your private portal credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SECRET_KEY=...
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
```

Add all five variables in Vercel → Project Settings → Environment Variables
when you deploy. `SUPABASE_SECRET_KEY`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`
must remain server-only: never prefix them with `NEXT_PUBLIC_` and never commit
their real values.

## 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and `/admin/login` for the
portal.

## 4. Deploy

Push to your GitHub repo and import it in Vercel. It is a standard Next.js App
Router project with no custom build settings.

## How the portal works

- **`/admin`** — add, edit, reorder, hide, or remove veils and product photos.
- **`/admin/categories`** — edit the story text for each fabric category.
- **`/admin/site-text`** — edit homepage, About, WhatsApp, phone, and Instagram text.
- **`/admin/orders`** — review customer requests and update their status.

To change the portal username or password later, update `ADMIN_USERNAME` or
`ADMIN_PASSWORD` in `.env.local` and in the deployment environment. Changing
either value immediately invalidates existing admin sessions.
