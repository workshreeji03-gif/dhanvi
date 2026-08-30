'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthHashListener() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    const search = window.location.search;

    // 1. Instant Hard-Redirect for Password Recovery
    if (hash.includes("type=recovery") || search.includes("type=recovery")) {
      if (window.location.pathname !== "/reset-password") {
        window.location.replace("/reset-password" + search + hash);
        return;
      }
    }

    const supabase = createClient();
    if (!supabase) return;

    const hashParams = new URLSearchParams(hash.startsWith("#") ? hash.substring(1) : hash);
    const searchParams = new URLSearchParams(search);

    const type = hashParams.get("type") || searchParams.get("type");
    const isRecovery = type === "recovery" || pathname === "/reset-password";

    // 2. Process URL hash fragments (#access_token=...&refresh_token=...)
    if (hash && hash.includes("access_token=")) {
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        }).then(({ data, error }) => {
          if (!error && data?.session) {
            if (isRecovery) {
              if (window.location.pathname !== "/reset-password") {
                window.location.replace("/reset-password");
              }
            } else if (window.location.pathname === "/" || window.location.pathname === "/auth/callback") {
              window.location.replace("/dashboard");
            }
          }
        }).catch((err) => {
          console.warn("Auth hash session setup error:", err);
        });
        return;
      }
    }

    // 3. Process query code (?code=...) on root or non-callback routes
    const codeParam = searchParams.get("code");
    if (codeParam && pathname !== "/auth/callback") {
      supabase.auth.exchangeCodeForSession(codeParam).then(({ data, error }) => {
        if (!error && data?.session) {
          if (isRecovery) {
            window.location.replace("/reset-password");
          } else if (pathname === "/") {
            window.location.replace("/dashboard");
          }
        }
      }).catch((err) => {
        console.warn("Auth code exchange error:", err);
      });
      return;
    }

    // 4. Process token_hash (?token_hash=...&type=...) on non-callback routes
    const tokenHash = searchParams.get("token_hash");
    const otpType = searchParams.get("type") || hashParams.get("type");
    if (tokenHash && otpType && pathname !== "/auth/callback") {
      supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: otpType as any,
      }).then(({ data, error }) => {
        if (!error && data?.session) {
          if (otpType === "recovery" || isRecovery) {
            window.location.replace("/reset-password");
          } else if (pathname === "/") {
            window.location.replace("/dashboard");
          }
        }
      }).catch((err) => {
        console.warn("Auth OTP verification error:", err);
      });
      return;
    }
  }, [router, pathname]);

  return null;
}