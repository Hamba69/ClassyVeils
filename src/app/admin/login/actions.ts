"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_USERNAME = "admin";
const ADMIN_AUTH_EMAIL = "admin@classyveils.ug";

export async function signInWithCredentials(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (username !== ADMIN_USERNAME || password.length === 0) {
    redirect("/admin/login?error=invalid_credentials");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email: ADMIN_AUTH_EMAIL, password });
  if (error || !data.user?.email) redirect("/admin/login?error=invalid_credentials");

  const { data: allowed, error: allowError } = await supabase
    .from("allowed_admins")
    .select("email")
    .eq("email", data.user.email)
    .maybeSingle();

  if (allowError || !allowed) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not_authorized");
  }

  redirect("/admin");
}
