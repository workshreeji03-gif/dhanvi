'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthHashListener() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supabase = createClient();
    if (!supabase) return;

    // 1. Process URL hash fragments (#access_token=...&refresh_token=...)
    const hash = window.location.hash.substring(1);
    if (hash && hash.includes("access_token=")) {
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const type = params.get("type");

      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        }).then(({ data, error }) => {
          if (!error && data?.session) {
            // Clean up the hash from the browser URL bar
            if (window.history.replaceState) {
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            }
            if (type === "recovery") {
              router.push("/reset-password");
            } else {
              router.push("/dashboard");
            }
          }
        }).catch((err) => {
          console.warn("Auth hash session setup error:", err);
        });
        return;
      }
    }

    // 2. Process query code (?code=...) on non-callback routes
    const search = new URLSearchParams(window.location.search);
    const codeParam = search.get("code");
    if (codeParam && pathname !== "/auth/callback") {
      supabase.auth.exchangeCodeForSession(codeParam).then(({ data, error }) => {
        if (!error && data?.session) {
          router.push("/dashboard");
        }
      }).catch((err) => {
        console.warn("Auth code exchange error:", err);
      });
      return;
    }

    // 3. Process token_hash (?token_hash=...&type=...) on non-callback routes
    const tokenHash = search.get("token_hash");
    const otpType = search.get("type");
    if (tokenHash && otpType && pathname !== "/auth/callback") {
      supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: otpType as any,
      }).then(({ data, error }) => {
        if (!error && data?.session) {
          if (otpType === "recovery") {
            router.push("/reset-password");
          } else {
            router.push("/dashboard");
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