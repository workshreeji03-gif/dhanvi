'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, AlertCircle, Eye, EyeOff, ShieldCheck, Building2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { createClient } from '../../../lib/supabase/client';
import { showToast } from '../../../components/ui/toast';
import { getInitialAppState, saveAppState, markUserRegistered } from '../../../lib/supabase/demo-store';
import { Logo } from '../../../components/landing/logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        if (data?.user) {
          // Fetch user's registered business
          const { data: memberRecords } = await supabase
            .from('business_members')
            .select('role, businesses(*)')
            .eq('user_id', data.user.id);

          if (memberRecords && memberRecords.length > 0 && memberRecords[0].businesses) {
            const rawBiz: any = memberRecords[0].businesses;
            const biz: any = Array.isArray(rawBiz) ? rawBiz[0] : rawBiz;
            if (biz) {
              const currentState = getInitialAppState();
              currentState.business.name = biz.name || currentState.business.name;
              currentState.business.legalName = biz.legal_name || currentState.business.legalName;
              currentState.business.gstin = biz.gstin || currentState.business.gstin;
              currentState.members = [
                {
                  id: data.user.id,
                  businessId: biz.id,
                  name: data.user.user_metadata?.full_name || email.split('@')[0],
                  email: data.user.email || email,
                  role: memberRecords[0].role || 'OWNER',
                },
              ];
              saveAppState(currentState);
            }
          }
        }
      }

      markUserRegistered();
      showToast('Welcome back!', 'Authenticated into Dhanvi financial workspace.');
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
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
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-neutral-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-neutral-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Forgot password?
                </Link>
              </div>
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
                disabled={isLoading}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs py-2.5"
              >
                {isLoading ? 'Authenticating...' : 'Sign In to Workspace'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500">
              Don&apos;t have a Dhanvi account?{' '}
              <Link href="/signup" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Register your business
              </Link>
            </p>
          </div>
        </Card>

        {/* Security Assurance Pill */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted • Supabase Auth</span>
        </div>
      </div>
    </div>
  );
}
