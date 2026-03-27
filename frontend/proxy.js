import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isTools = pathname.startsWith("/tools");
  const isDashboard = pathname.startsWith("/dashboard");

  // Login required for tools and dashboard
  if ((isTools || isDashboard) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin only for dashboard
  if (isDashboard) {
    const adminEmails =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()) || [];

    const currentEmail = (token?.email || "").toLowerCase();

    if (!adminEmails.includes(currentEmail)) {
      return NextResponse.redirect(new URL("/tools", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tools/:path*", "/dashboard/:path*"],
};