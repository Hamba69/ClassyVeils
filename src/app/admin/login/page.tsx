import { signInWithCredentials } from "./actions";
import BrandLogo from "@/components/BrandLogo";

const messages: Record<string, string> = {
  invalid_credentials: "The username or password is incorrect.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const params = await searchParams;
  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;
  const errorMessage = errorCode ? messages[errorCode] : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-linen px-4 py-12 sm:px-6">
      <div className="w-full max-w-sm rounded-[2rem] border border-line bg-white/55 p-6 shadow-[0_24px_80px_rgba(43,38,34,0.10)] sm:p-8">
        <BrandLogo className="mx-auto max-w-56" priority />
        <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.25em] text-ink/45">Private administration</p>
        <h1 className="mt-3 text-center font-display text-3xl text-ink">Site portal</h1>
        <p className="mt-2 text-center text-sm leading-6 text-ink/60">Sign in with your administrator credentials.</p>

        {errorMessage && (
          <p role="alert" className="mt-5 rounded-xl border border-plum/25 bg-plum/5 px-4 py-3 text-sm text-plum">
            {errorMessage}
          </p>
        )}

        <form action={signInWithCredentials} className="mt-7 space-y-5">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-ink">Username</label>
            <input id="username" name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} required className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-plum focus:ring-2 focus:ring-plum/10" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-ink">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-plum focus:ring-2 focus:ring-plum/10" />
          </div>
          <button type="submit" className="min-h-12 w-full rounded-xl bg-ink px-5 text-sm font-semibold text-linen transition hover:bg-plum focus:outline-none focus:ring-2 focus:ring-plum/30">Sign in</button>
        </form>
      </div>
    </main>
  );
}
