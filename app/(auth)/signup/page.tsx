'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  User,
  Building2,
  Phone,
  FileText,
  Briefcase,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  Inbox,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Logo } from "../../../components/landing/logo";
import { createClient } from "../../../lib/supabase/client";
import { showToast } from "../../../components/ui/toast";
import { createCleanAppState, saveAppState, markUserRegistered } from "../../../lib/supabase/demo-store";

export default function SignupPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  // Step 1: User credentials
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Business entity details
  const [businessName, setBusinessName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [gstin, setGstin] = useState("");
  const [industry, setIndustry] = useState("Retail & Wholesale Trade");
  const [businessSize, setBusinessSize] = useState("1-10");

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    setErrorMsg("");
    setActiveStep(2);
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrorMsg("Please enter your business / company name.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const cleanState = createCleanAppState(businessName.trim(), fullName.trim(), email.trim());
      cleanState.business.legalName = legalName.trim() || businessName.trim();
      cleanState.business.gstin = gstin.trim().toUpperCase() || undefined;
      cleanState.business.industry = industry;
      cleanState.business.businessSize = businessSize;

      const supabase = createClient();
      if (supabase) {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const emailRedirectTo = origin ? `${origin}/auth/callback?next=/dashboard` : undefined;

        // Sign up user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo,
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
              business_name: businessName.trim(),
              legal_name: legalName.trim() || businessName.trim(),
              gstin: gstin.trim().toUpperCase() || null,
              industry,
              business_size: businessSize,
            },
          },
        });

        if (authError) {
          if (authError.message.toLowerCase().includes("already registered") || authError.message.toLowerCase().includes("user already exists")) {
            setErrorMsg("An account with this email address already exists. Please sign in or reset your password.");
            setIsLoading(false);
            return;
          }
          setErrorMsg(authError.message);
          setIsLoading(false);
          return;
        }

        // Check if user already exists (identities array empty)
        if (authData?.user && Array.isArray(authData.user.identities) && authData.user.identities.length === 0) {
          setErrorMsg("An account with this email already exists. Please sign in or reset your password.");
          setIsLoading(false);
          return;
        }

        // If email confirmation is required (session is null)
        if (authData?.user && !authData.session) {
          setIsVerificationSent(true);
          setIsLoading(false);
          return;
        }

        const userId = authData?.user?.id;
        if (userId) {
          // Create business row in Supabase database if session exists
          const { data: newBiz } = await supabase
            .from("businesses")
            .insert({
              name: businessName.trim(),
              legal_name: legalName.trim() || businessName.trim(),
              gstin: gstin.trim().toUpperCase() || null,
              industry,
              business_size: businessSize,
              fiscal_year_start: 4,
            })
            .select()
            .single();

          if (newBiz) {
            await supabase.from("business_members").insert({
              business_id: newBiz.id,
              user_id: userId,
              role: "OWNER",
            });
            cleanState.business.id = newBiz.id;
          }
        }
      }

      saveAppState(cleanState);
      markUserRegistered();

      showToast("Registration Complete!", `Welcome to Dhanvi, ${fullName.trim()}. Your workspace is ready.`);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
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

        showToast("Verification Email Sent", `We sent a new confirmation link to ${email.trim()}.`);
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
      showToast("Error", err.message || "Failed to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  // -------------------------------------------------------------
  // Screen: Email Verification Required
  // -------------------------------------------------------------
  if (isVerificationSent) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center py-12 px-6 selection:bg-emerald-100 selection:text-emerald-950 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link href="/" className="inline-flex items-center justify-center mb-5 group transition-transform hover:scale-105" aria-label="Dhanvi home">
            <Logo className="h-9 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Verify Your Email Address
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            We sent a secure confirmation link to complete your Dhanvi account setup
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <Inbox className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-neutral-900">Check your inbox</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Click the confirmation link sent to:
                <br />
                <strong className="text-neutral-950 font-bold text-sm">{email}</strong>
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-left text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>What happens next:</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-normal">
                1. Open the email from <strong>Dhanvi</strong>.
                <br />
                2. Click <strong>Confirm Your Account</strong>.
                <br />
                3. Your workspace for <strong>{businessName}</strong> will initialize automatically.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendCooldown > 0 || isResending}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-800 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
              >
                {isResending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-neutral-400 border-t-neutral-800 rounded-full animate-spin" />
                    <span>Resending email...</span>
                  </>
                ) : resendCooldown > 0 ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Resend available in {resendCooldown}s</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Resend verification email</span>
                  </>
                )}
              </button>

              <Link
                href="/login"
                className="block text-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors py-1"
              >
                Already confirmed? Sign in →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Screen: 2-Step Registration Form
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center py-12 px-6 selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-5 group transition-transform hover:scale-105" aria-label="Dhanvi home">
          <Logo className="h-9 w-auto" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          {activeStep === 1 ? "Create Your Founder Account" : "Register Your Business Entity"}
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          {activeStep === 1
            ? "Set up credentials to access your autonomous double-entry ledger"
            : "Configure your company details, GSTIN, and industry parameters"}
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeStep === 1 ? "w-8 bg-emerald-600" : "w-2 bg-emerald-200"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeStep === 2 ? "w-8 bg-emerald-600" : "w-2 bg-neutral-200"
            }`}
          />
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white">
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span>{errorMsg}</span>
                {errorMsg.includes("already exists") && (
                  <div className="mt-2">
                    <Link
                      href="/login"
                      className="font-bold underline text-rose-900 hover:text-rose-950"
                    >
                      Click here to Sign In →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeStep === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>
              </div>

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

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Mobile Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Password
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-2.5 mt-2"
              >
                <span>Continue to Business Profile</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Business / Trading Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Global Distributors"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Legal Entity Name (Optional)
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="e.g. Apex Global Distributors Pvt Ltd"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  GSTIN (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27ABCDE1234F1Z5"
                    maxLength={15}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  >
                    <option value="Retail & Wholesale Trade">Wholesale & Trade</option>
                    <option value="Manufacturing & Fabrication">Manufacturing</option>
                    <option value="Logistics & Supply Chain">Logistics</option>
                    <option value="Professional Services & IT">IT & Services</option>
                    <option value="D2C & E-Commerce">E-Commerce / D2C</option>
                    <option value="Healthcare & Pharma">Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Team Size
                  </label>
                  <select
                    value={businessSize}
                    onChange={(e) => setBusinessSize(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  >
                    <option value="1-5">1 - 5 people</option>
                    <option value="6-20">6 - 20 people</option>
                    <option value="21-50">21 - 50 people</option>
                    <option value="50+">50+ people</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(1)}
                  className="py-2.5 px-4 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span>Back</span>
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="flex-1 justify-center py-2.5"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Workspace...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Existing account link */}
        <div className="text-center mt-6">
          <p className="text-xs text-neutral-500">
            Already have a Dhanvi account?{" "}
            <Link
              href="/login"
              className="font-bold text-neutral-900 hover:text-emerald-700 underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>India GST compliant · Bank-grade data encryption</span>
        </div>
      </div>
    </div>
  );
}