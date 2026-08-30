'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { createClient } from '../../../lib/supabase/client';
import { showToast } from '../../../components/ui/toast';
import { Logo } from '../../../components/landing/logo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined,
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }
      }

      setIsSent(true);
      showToast('Reset Instructions Sent', `Password reset instructions sent to ${email}.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send password reset email.');
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
          Reset Your Password
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Enter your registered work email to receive password reset instructions
        </p>
      </div>

      {/* Reset Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-xs border border-neutral-200/80 bg-white">
          {isSent ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900">Check your inbox</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  We sent a secure password reset link to <strong className="text-neutral-900">{email}</strong>.
                </p>
              </div>
              <Link href="/login" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs py-2.5"
                >
                  {isLoading ? 'Sending Link...' : 'Send Reset Instructions'}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted • Supabase Auth</span>
        </div>
      </div>
    </div>
  );
}
