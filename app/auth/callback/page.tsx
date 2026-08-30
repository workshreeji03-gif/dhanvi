'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusText, setStatusText] = useState("Verifying your authentication link...");

  useEffect(() => {
    let isMounted = true;

    async function handleAuth() {
      try {
        const supabase = createClient();
        if (!supabase) {
          throw new Error("Unable to initialize authentication client.");
        }

        const url = new URL(window.location.href);
        const search = searchParams;
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);

        // 1. Check for errors in query or hash
        const errorDesc = search.get("error_description") || hashParams.get("error_description");
        const errorMsg = search.get("error") || hashParams.get("error");
        if (errorDesc || errorMsg) {
          throw new Error(errorDesc || errorMsg || "Authentication link is invalid or has expired.");
        }

        // Determine destination
        const type = search.get("type") || hashParams.get("type");
        const nextParam = search.get("next") || (type === "recovery" ? "/reset-password" : "/dashboard");
        const safeNext = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

        // 2. Handle Implicit Flow (Access Token in Hash)
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          setStatusText("Setting up secure session...");
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          if (isMounted) {
            setStatus("success");
            setStatusText("Authentication confirmed. Redirecting...");
            setTimeout(() => {
              router.push(type === "recovery" ? "/reset-password" : safeNext);
            }, 600);
          }
          return;
        }

        // 3. Handle PKCE Flow (Code in Query)
        const code = search.get("code");
        if (code) {
          setStatusText("Exchanging authorization code...");
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;

          if (isMounted) {
            setStatus("success");
            setStatusText("Authentication confirmed. Redirecting...");
            setTimeout(() => {
              router.push(type === "recovery" ? "/reset-password" : safeNext);
            }, 600);
          }
          return;
        }

        // 4. Handle Token Hash Verification (OTP / Magiclink / Signup)
        const tokenHash = search.get("token_hash");
        if (tokenHash && type) {
          setStatusText("Verifying one-time token...");
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          });
          if (error) throw error;

          if (isMounted) {
            setStatus("success");
            setStatusText("Authentication confirmed. Redirecting...");
            setTimeout(() => {
              router.push(type === "recovery" ? "/reset-password" : safeNext);
            }, 600);
          }
          return;
        }

        // 5. Fallback: Check if session already exists
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          if (isMounted) {
            setStatus("success");
            setStatusText("Session active. Redirecting...");
            setTimeout(() => {
              router.push(type === "recovery" ? "/reset-password" : safeNext);
            }, 400);
          }
          return;
        }

        // If no code, no token, and no session
        throw new Error("This verification link has expired or has already been used. Please request a new link.");
      } catch (err: any) {
        if (isMounted) {
          setStatus("error");
          setErrorMessage(err.message || "Failed to verify authentication link.");
        }
      }
    }

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center py-12 px-6 font-sans selection:bg-emerald-100 selection:text-emerald-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-5 group transition-transform hover:scale-105" aria-label="Dhanvi home">
          <Logo className="h-9 w-auto" />
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white text-center">
          {status === "verifying" && (
            <div className="space-y-4 py-4">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-600/20 border-t-emerald-600 animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-neutral-900">Verifying Credentials</h3>
                <p className="text-xs text-neutral-500">{statusText}</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4 py-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-neutral-900">Verification Successful</h3>
                <p className="text-xs text-neutral-500">{statusText}</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4 py-2">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200 shadow-2xs">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-neutral-900">Link Invalid or Expired</h3>
                <p className="text-xs text-rose-600 leading-relaxed max-w-xs mx-auto">
                  {errorMessage}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  variant="primary"
                  className="w-full justify-center text-xs"
                  onClick={() => router.push("/login")}
                >
                  <span>Request New Link / Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                <Link
                  href="/forgot-password"
                  className="block text-center text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted cryptographic session authentication</span>
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}