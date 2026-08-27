import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/admin/server";
import BrandLogo from "@/components/BrandLogo";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();
  return (
    <div className="min-h-screen bg-linen">
      <header className="border-b border-line bg-linen">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2.5 font-display text-xl text-ink">
              <BrandLogo variant="mark" />
              Classyveils portal
            </span>
            <form action={signOut}>
              <button className="min-h-11 rounded-full px-3 text-sm text-ink/55 hover:text-plum">Sign out</button>
            </form>
          </div>
          <nav className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Admin sections">
            <Link href="/admin" className="flex min-h-11 shrink-0 items-center rounded-full border border-line bg-white px-4 text-sm text-ink/70 hover:border-plum hover:text-plum">
              Veils
            </Link>
            <Link href="/admin/categories" className="flex min-h-11 shrink-0 items-center rounded-full border border-line bg-white px-4 text-sm text-ink/70 hover:border-plum hover:text-plum">
              Categories
            </Link>
            <Link href="/admin/site-text" className="flex min-h-11 shrink-0 items-center rounded-full border border-line bg-white px-4 text-sm text-ink/70 hover:border-plum hover:text-plum">
              Site text
            </Link>
            <Link href="/admin/orders" className="flex min-h-11 shrink-0 items-center rounded-full border border-line bg-white px-4 text-sm text-ink/70 hover:border-plum hover:text-plum">
              Orders
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
