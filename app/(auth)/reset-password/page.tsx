'use client';

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/landing/logo";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/toast";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSessionReady, setIsSessionReady] = useState(false);

  // Capture session from hash or query if arriving directly on /reset-password
  useEffect(() => {
    async function initRecoverySession() {
      try {
        const supabase = createClient();
        if (!supabase) return;

        // Check if session exists in hash
        const hash = window.location.hash.substring(1);
        if (hash && hash.includes("access_token=")) {
          const params = new URLSearchParams(hash);
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");
          if (accessToken && refreshToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (!error && data?.session) {
              setIsSessionReady(true);
              if (window.history.replaceState) {
                window.history.replaceState(null, "", window.location.pathname);
              }
            }
          }
        }

        // Check if code in query
        const code = searchParams.get("code");
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsSessionReady(true);
        }
      } catch (err) {
        console.warn("Recovery session init fallback:", err);
      }
    }

    initRecoverySession();
  }, [searchParams]);

  // Password criteria helper
  const hasMinLength = password.length >= 6;
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg("Please enter a new password.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-type the confirmation password.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Unable to connect to authentication server.");
      }

      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      showToast("Password Updated", "Your password has been reset successfully.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update password. Your reset link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center py-12 px-6 selection:bg-emerald-100 selection:text-emerald-950 font-sans relative overflow-hidden">
      {/* Subtle Background Glows matching Landing Page */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center mb-5 group transition-transform hover:scale-105"
          aria-label="Dhanvi home"
        >
          <Logo className="h-9 w-auto" />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-800 tracking-wide uppercase mb-2">
          <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
          <span>Account Security</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Create New Password
        </h1>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
          Choose a secure new password for your Dhanvi financial co-pilot workspace
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white/95 backdrop-blur-xs">
          {isSuccess ? (
            <div className="text-center space-y-5 py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-neutral-900">Password Updated Successfully</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Your new password is active. You can now sign in to access your autonomous double-entry general ledger.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  className="w-full justify-center py-2.5"
                  onClick={() => router.push("/login")}
                >
                  <span>Sign In with New Password</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p>{errorMsg}</p>
                    {errorMsg.toLowerCase().includes("expire") && (
                      <Link
                        href="/forgot-password"
                        className="font-bold underline text-rose-900 hover:text-rose-950 block mt-1"
                      >
                        Request a fresh password reset link →
                      </Link>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full pl-10 pr-10 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Validation Checklist */}
              <div className="p-3 bg-neutral-50/80 rounded-xl border border-neutral-100 space-y-1.5 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      hasMinLength ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className={hasMinLength ? "text-neutral-800 font-medium" : ""}>
                    At least 6 characters long
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      passwordsMatch ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className={passwordsMatch ? "text-neutral-800 font-medium" : ""}>
                    Passwords match exactly
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !hasMinLength || !passwordsMatch}
                className="w-full justify-center py-2.5 mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span>Save New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </Card>

        {/* Back to sign in link */}
        <div className="text-center mt-6">
          <p className="text-xs text-neutral-500">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-neutral-900 hover:text-emerald-700 underline transition-colors"
            >
              Back to Sign In
            </Link>
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-bit encrypted password hashing & token authentication</span>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}