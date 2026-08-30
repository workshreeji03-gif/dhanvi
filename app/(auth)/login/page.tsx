'use client';

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Logo } from "../../../components/landing/logo";
import { createClient } from "../../../lib/supabase/client";
import { showToast } from "../../../components/ui/toast";
import { getInitialAppState, saveAppState, markUserRegistered } from "../../../lib/supabase/demo-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [authMode, setAuthMode] = useState<"password" | "magic-link">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEmailUnverified, setIsEmailUnverified] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Check URL query parameters for errors or messages
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMsg(decodeURIComponent(error));
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter your work email.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setIsEmailUnverified(false);

    try {
      const supabase = createClient();
      const next = searchParams.get("next") || "/dashboard";
      const safeNext = next.startsWith("/") ? next : "/dashboard";

      // -------------------------------------------------------------
      // Magic Link Sign In Flow
      // -------------------------------------------------------------
      if (authMode === "magic-link") {
        if (!supabase) {
          throw new Error("Supabase is not configured.");
        }

        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const emailRedirectTo = origin ? `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}` : undefined;

        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo,
          },
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        setMagicLinkSent(true);
        showToast("Magic Link Sent", `Check ${email.trim()} for your secure sign-in link.`);
        setIsLoading(false);
        return;
      }

      // -------------------------------------------------------------
      // Password Sign In Flow
      // -------------------------------------------------------------
      if (!password) {
        setErrorMsg("Please enter your password.");
        setIsLoading(false);
        return;
      }

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message.toLowerCase().includes("email not confirmed")) {
            setIsEmailUnverified(true);
            setErrorMsg("Please verify your email before signing in. Check your inbox for the confirmation link.");
          } else if (error.message.toLowerCase().includes("invalid login credentials")) {
            setErrorMsg("Incorrect email or password. Please check your credentials and try again.");
          } else {
            setErrorMsg(error.message);
          }
          setIsLoading(false);
          return;
        }

        if (data?.user) {
          // Fetch user's registered business
          const { data: memberRecords } = await supabase
            .from("business_members")
            .select("role, businesses(*)")
            .eq("user_id", data.user.id);

          if (memberRecords && memberRecords.length > 0 && memberRecords[0].businesses) {
            const rawBiz: any = memberRecords[0].businesses;
            const biz: any = Array.isArray(rawBiz) ? rawBiz[0] : rawBiz;
            if (biz) {
              const currentState = getInitialAppState();
              currentState.business.id = biz.id;
              currentState.business.name = biz.name || currentState.business.name;
              currentState.business.legalName = biz.legal_name || currentState.business.legalName;
              currentState.business.gstin = biz.gstin || currentState.business.gstin;
              currentState.members = [
                {
                  id: data.user.id,
                  businessId: biz.id,
                  name: data.user.user_metadata?.full_name || email.split("@")[0],
                  email: data.user.email || email,
                  role: memberRecords[0].role || "OWNER",
                },
              ];
              saveAppState(currentState);
            }
          }
        }
      }

      markUserRegistered();
      showToast("Welcome back!", "Authenticated into Dhanvi financial workspace.");
      router.push(safeNext);
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (resendCooldown > 0) return;
    try {
      const supabase = createClient();
      if (supabase) {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const emailRedirectTo = origin ? `${origin}/auth/callback?next=/dashboard` : undefined;

        const { error } = await supabase.auth.resend({
          type: "signup",
          email: email.trim(),
          options: {
            emailRedirectTo,
          },
        });

        if (error) {
          showToast("Error", error.message);
          return;
        }

        showToast("Confirmation Sent", `A new verification link was sent to ${email.trim()}.`);
        setResendCooldown(60);
        const timer = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err: any) {
      showToast("Error", err.message || "Failed to resend confirmation.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center py-12 px-6 selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-5 group transition-transform hover:scale-105" aria-label="Dhanvi home">
          <Logo className="h-9 w-auto" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Sign In to Your Workspace
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Access your real-time double-entry general ledger, GST filings, and AI co-pilot
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white">
          {/* Auth Method Tabs */}
          <div className="flex rounded-xl bg-neutral-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setErrorMsg("");
                setMagicLinkSent(false);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === "password"
                  ? "bg-white text-neutral-900 shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Password Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("magic-link");
                setErrorMsg("");
                setMagicLinkSent(false);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === "magic-link"
                  ? "bg-white text-neutral-900 shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Magic Link (Passwordless)
            </button>
          </div>

          {/* Magic Link Sent Confirmation Banner */}
          {magicLinkSent ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-neutral-900">Check your email</h3>
                <p className="text-xs text-neutral-500">
                  We sent a secure instant login link to:
                  <br />
                  <strong className="text-neutral-900">{email}</strong>
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => setMagicLinkSent(false)}
              >
                Sign in with another method
              </Button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <p>{errorMsg}</p>
                    {isEmailUnverified && (
                      <button
                        type="button"
                        onClick={handleResendConfirmation}
                        disabled={resendCooldown > 0}
                        className="inline-flex items-center gap-1 font-bold underline text-rose-900 hover:text-rose-950 mt-1 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>
                          {resendCooldown > 0
                            ? `Resend available in ${resendCooldown}s`
                            : "Click here to resend verification email"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>
              </div>

              {authMode === "password" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-neutral-700">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full justify-center py-2.5 mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span>{authMode === "password" ? "Sign In to Workspace" : "Send Magic Link"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </Card>

        {/* Create account link */}
        <div className="text-center mt-6">
          <p className="text-xs text-neutral-500">
            Don't have a Dhanvi account yet?{" "}
            <Link
              href="/signup"
              className="font-bold text-neutral-900 hover:text-emerald-700 underline transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SOC-2 compliant · 256-bit AES database encryption</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}