import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin/session";

export async function proxy(request: NextRequest) {
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";
  const hasValidSession = await verifyAdminSessionToken(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  );

  if (isLoginRoute && hasValidSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginRoute && !hasValidSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
