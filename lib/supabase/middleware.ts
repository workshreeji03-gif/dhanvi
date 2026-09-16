import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refreshes the auth token if expired
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protected App Route Check
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/ledger") ||
    pathname.startsWith("/accounts") ||
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/invoices") ||
    pathname.startsWith("/customers") ||
    pathname.startsWith("/vendors") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/reconciliation") ||
    pathname.startsWith("/bank-reconciliation") ||
    pathname.startsWith("/assistant") ||
    pathname.startsWith("/insights") ||
    pathname.startsWith("/accountant") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/admin");

  const isLegacyAuthRoute = 
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/auth/callback";

  // Redirect legacy auth routes to home
  if (isLegacyAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated user from internal protected routes to home
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}