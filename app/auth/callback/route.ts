import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") || (type === "recovery" ? "/reset-password" : "/dashboard");

  // Sanitize redirect target to prevent open redirects
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(new URL("/login?error=Configuration%20missing", origin));
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Handled in middleware / server route
        }
      },
    },
  });

  try {
    // 1. PKCE Code Exchange
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("Auth code exchange error:", error.message);
        return NextResponse.redirect(new URL("/login?error=" + encodeURIComponent(error.message), origin));
      }

      if (data?.user) {
        await ensureUserProfileAndBusiness(supabase, data.user);
      }

      return NextResponse.redirect(new URL(safeNext, origin));
    }

    // 2. Token Hash Verification (Magic link, signup confirmation, recovery, invite)
    if (token_hash && type) {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (error) {
        console.error("Token hash verification error:", error.message);
        return NextResponse.redirect(new URL("/login?error=" + encodeURIComponent(error.message), origin));
      }

      if (data?.user) {
        await ensureUserProfileAndBusiness(supabase, data.user);
      }

      const redirectPath = type === "recovery" ? "/reset-password" : safeNext;
      return NextResponse.redirect(new URL(redirectPath, origin));
    }

    // 3. Fallback: Check if active session already exists
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await ensureUserProfileAndBusiness(supabase, session.user);
      return NextResponse.redirect(new URL(safeNext, origin));
    }

    return NextResponse.redirect(new URL("/login?error=Invalid%20or%20expired%20verification%20link", origin));
  } catch (err: any) {
    console.error("Auth callback exception:", err);
    return NextResponse.redirect(new URL("/login?error=" + encodeURIComponent(err.message || "Authentication failed"), origin));
  }
}

async function ensureUserProfileAndBusiness(supabase: any, user: any) {
  try {
    const meta = user.user_metadata || {};
    const fullName = meta.full_name || user.email?.split("@")[0] || "User";
    const bizName = meta.business_name || (fullName + " Business");

    // 1. Upsert Profile
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: fullName,
      phone: meta.phone || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

    // 2. Check if user already has a business membership
    const { data: members } = await supabase
      .from("business_members")
      .select("id, business_id")
      .eq("user_id", user.id);

    if (!members || members.length === 0) {
      // Create default business
      const { data: newBiz } = await supabase
        .from("businesses")
        .insert({
          name: bizName,
          legal_name: bizName,
          currency: "INR",
          fiscal_year_start: 4,
          is_active: true,
        })
        .select()
        .single();

      if (newBiz) {
        await supabase.from("business_members").insert({
          business_id: newBiz.id,
          user_id: user.id,
          role: "OWNER",
        });
      }
    }
  } catch (err) {
    console.warn("ensureUserProfileAndBusiness fallback:", err);
  }
}