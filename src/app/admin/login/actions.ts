"use server";

import { redirect } from "next/navigation";
import { startAdminSession } from "@/lib/admin/server";
import { credentialsAreValid } from "@/lib/admin/session";

export async function signInWithCredentials(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!credentialsAreValid(username, password)) {
    redirect("/admin/login?error=invalid_credentials");
  }

  await startAdminSession();
  redirect("/admin");
}
