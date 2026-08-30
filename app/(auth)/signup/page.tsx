'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { createClient } from '../../../lib/supabase/client';
import { showToast } from '../../../components/ui/toast';
import { createCleanAppState, saveAppState, markUserRegistered } from '../../../lib/supabase/demo-store';

export default function SignupPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  // Step 1: User Account Credentials
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Business & GST Details
  const [businessName, setBusinessName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [gstin, setGstin] = useState('');
  const [industry, setIndustry] = useState('Wholesale & Distribution');
  const [businessSize, setBusinessSize] = useState('1-10 Employees');
  const [cityState, setCityState] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg('Please provide your full name, email, and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    setErrorMsg('');
    setActiveStep(2);
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrorMsg('Please enter your business / company name.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const cleanState = createCleanAppState(businessName.trim(), fullName.trim(), email.trim());
      cleanState.business.legalName = legalName.trim() || businessName.trim();
      cleanState.business.gstin = gstin.trim().toUpperCase() || undefined;

      const supabase = createClient();
      if (supabase) {
        // Sign up user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
              business_name: businessName.trim(),
            },
          },
        });

        if (authError) {
          console.warn('Supabase Auth error:', authError.message);
        }

        const userId = authData?.user?.id;
        if (userId) {
          // Create business row in Supabase database
          const { data: newBiz } = await supabase
            .from('businesses')
            .insert({
              name: businessName.trim(),
              legal_name: legalName.trim() || businessName.trim(),
              gstin: gstin.trim().toUpperCase() || null,
              created_by: userId,
            })
            .select()
            .single();

          if (newBiz) {
            await supabase.from('business_members').insert({
              business_id: newBiz.id,
              user_id: userId,
              role: 'OWNER',
            });
            cleanState.business.id = newBiz.id;
          }
        }
      }

      saveAppState(cleanState);
      markUserRegistered();

      showToast('Registration Complete!', `Welcome to Dhanvi, ${fullName.trim()}. Your ledger is initialized.`);
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center py-12 px-6 selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
          <Image
            src="/dhanvi-logo.svg"
            alt="Dhanvi"
            width={34}
            height={34}
            className="w-8.5 h-8.5 object-contain"
            priority
          />
          <span className="font-bold text-2xl tracking-tight text-neutral-900">
            Dhanvi
          </span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          {activeStep === 1 ? 'Create Your Founder Account' : 'Register Your Business Entity'}
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          {activeStep === 1
            ? 'Set up credentials to access your autonomous double-entry ledger'
            : 'Configure your company details, GSTIN, and industry parameters'}
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeStep === 1 ? 'w-8 bg-emerald-600' : 'w-4 bg-emerald-300'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeStep === 2 ? 'w-8 bg-emerald-600' : 'w-4 bg-neutral-200'
            }`}
          />
        </div>
      </div>

      {/* Registration Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white">
          {errorMsg && (
            <div className="p-3.5 mb-4 bg-rose-50 border border-rose-200/80 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: USER CREDENTIALS */}
          {activeStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    autoFocus
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shreeji Patel"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Work Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="shreeji@company.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Mobile / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Create Password * (min. 6 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs py-2.5"
                >
                  Continue to Business Setup
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: BUSINESS ENTITY DETAILS */}
          {activeStep === 2 && (
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Business / Company Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    autoFocus
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Enterprises"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  GSTIN (15 Digits, Optional for Non-GST)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="24AAAAA0000A1Z5"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs font-mono uppercase bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-neutral-900"
                  >
                    <option value="Wholesale & Distribution">Wholesale & Trade</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail & D2C">Retail & D2C</option>
                    <option value="Services & Consulting">Services & Tech</option>
                    <option value="Export / Import">Export / Import</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Business Size
                  </label>
                  <select
                    value={businessSize}
                    onChange={(e) => setBusinessSize(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-neutral-900"
                  >
                    <option value="1-5 Employees">1-5 Employees</option>
                    <option value="6-20 Employees">6-20 Employees</option>
                    <option value="20+ Employees">20+ Employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  City & State
                </label>
                <input
                  type="text"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  placeholder="e.g. Ahmedabad, Gujarat"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(1)}
                  leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  rightIcon={<Sparkles className="w-3.5 h-3.5" />}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs py-2.5"
                >
                  {isLoading ? 'Creating Workspace...' : 'Launch Dashboard'}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500">
              Already have a Dhanvi account?{' '}
              <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Security Assurance */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>GST & Indian Accounting Standards (Ind AS) Compliant</span>
        </div>
      </div>
    </div>
  );
}
