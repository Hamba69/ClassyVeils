"use client";

import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const params = useSearchParams();
  const error = params.get("error");

  async function signIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linen px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-display text-2xl text-ink">Classyveils</p>
        <h1 className="mt-1 font-display text-lg text-ink/70">Site portal</h1>

        {error === "not_authorized" && (
          <p className="mt-6 rounded-md border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
            That Google account isn&apos;t on the admin list yet. Ask for it to be added, or sign in
            with the right account.
          </p>
        )}
        {error === "auth_failed" && (
          <p className="mt-6 rounded-md border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
            Sign-in didn&apos;t go through. Try again.
          </p>
        )}

        <button
          onClick={signIn}
          className="mt-8 w-full rounded-md bg-ink px-6 py-3 text-sm font-medium text-linen transition hover:bg-plum"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
