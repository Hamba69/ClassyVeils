import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linen">
      <header className="border-b border-line bg-linen">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg text-ink">Portal</span>
            <Link href="/admin" className="text-sm text-ink/70 hover:text-plum">
              Veils
            </Link>
            <Link href="/admin/categories" className="text-sm text-ink/70 hover:text-plum">
              Category pages
            </Link>
            <Link href="/admin/site-text" className="text-sm text-ink/70 hover:text-plum">
              Site text
            </Link>
          </div>
          <form action={signOut}>
            <button className="text-sm text-ink/50 hover:text-plum">Sign out</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
