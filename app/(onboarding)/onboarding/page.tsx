'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft, Building2, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { useDhanviState, saveAppState } from '../../../lib/supabase/demo-store';
import { createClient } from '../../../lib/supabase/client';
import { showToast } from '../../../components/ui/toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { state, setBusinessEntity } = useDhanviState();
  const [step, setStep] = useState(1);

  // Form State initialized clean (No fake prefilled strings)
  const currentMember = state.members[0] || { name: 'Business Owner', email: 'owner@company.in' };
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Wholesale & Distribution');
  const [businessSize, setBusinessSize] = useState('1-10 Employees');
  const [financialYear, setFinancialYear] = useState('FY 2026-27 (Apr - Mar)');
  const [currency, setCurrency] = useState('INR (₹)');
  const [startingDataSource, setStartingDataSource] = useState<'clean' | 'csv'>('clean');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'DH';
  };

  const handleFinish = async () => {
    const finalBizName = businessName.trim() || 'My Business';
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Insert business into Supabase
          const { data: bizRecord } = await supabase
            .from('businesses')
            .insert({
              name: finalBizName,
              legal_name: finalBizName,
              currency: 'INR',
              industry,
              business_size: businessSize,
              fiscal_year_start: 4,
            })
            .select()
            .single();

          if (bizRecord) {
            // Insert business member record
            await supabase.from('business_members').insert({
              business_id: bizRecord.id,
              user_id: session.user.id,
              role: 'OWNER',
            });
          }
        }
      }

      // Update active reactive state
      const updatedState = {
        ...state,
        business: {
          ...state.business,
          name: finalBizName,
          legalName: finalBizName,
          industry,
          businessSize,
        },
      };

      saveAppState(updatedState);
      showToast('Workspace Configured', `${finalBizName} is ready.`);
      router.push('/dashboard');
    } catch (err: any) {
      console.warn('Onboarding persistence fallback:', err);
      router.push('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center py-12 px-6 selection:bg-neutral-900 selection:text-white">
      <div className="max-w-xl mx-auto w-full">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Step {step} of 7
            </span>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
              {step === 1 && 'Confirm Your Profile'}
              {step === 2 && 'What is your business called?'}
              {step === 3 && 'Which industry are you in?'}
              {step === 4 && 'How large is your team?'}
              {step === 5 && 'Select your Financial Year'}
              {step === 6 && 'Confirm your operating currency'}
              {step === 7 && 'Your Financial Workspace is Ready!'}
            </h1>
          </div>
          <Badge variant="info" size="sm">Setup Wizard</Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-neutral-900 dark:bg-white transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>

        <Card className="p-8">
          {/* Step 1: Account Confirmation */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-xs">
                  {getInitials(currentMember.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{currentMember.name}</p>
                  <p className="text-xs text-neutral-500">{currentMember.email || 'Registered User'} • Business Owner</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Dhanvi will establish your dedicated business workspace, initialize your Indian SME Chart of Accounts, and prepare your real-time ledger.
              </p>
            </div>
          )}

          {/* Step 2: Business Name */}
          {step === 2 && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Business Legal or Trade Name
              </label>
              <input
                type="text"
                autoFocus
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                placeholder="e.g. Patel Electronics"
              />
              <p className="text-[11px] text-neutral-400">
                This name will appear on your financial statements, invoices, and executive dashboard.
              </p>
            </div>
          )}

          {/* Step 3: Industry */}
          {step === 3 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Select your industry
              </label>
              {['Wholesale & Distribution', 'Retail & Consumer Goods', 'Manufacturing', 'Professional Services & IT', 'Logistics & Transport', 'Healthcare & Pharma'].map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(ind)}
                  className={`w-full p-3 rounded-lg border text-left text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    industry === ind
                      ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50'
                  }`}
                >
                  <span>{ind}</span>
                  {industry === ind && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Business Size */}
          {step === 4 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Business Size
              </label>
              {['1-5 Employees (Micro)', '5-20 Employees (Small)', '20-50 Employees (Medium)', '50+ Employees'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setBusinessSize(size)}
                  className={`w-full p-3 rounded-lg border text-left text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    businessSize === size
                      ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50'
                  }`}
                >
                  <span>{size}</span>
                  {businessSize === size && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}

          {/* Step 5: Financial Year */}
          {step === 5 && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Financial Year Cycle
              </label>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Indian Fiscal Year: April 1 – March 31</p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Active Year: FY 2026-27 (Quarter 2 in progress)
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Currency */}
          {step === 6 && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Base Operating Currency
              </label>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">Indian Rupee (INR — ₹)</p>
                  <p className="text-[11px] text-neutral-500">Includes standard Indian Lakhs (L) and Crores (Cr) auto-scaling</p>
                </div>
                <Badge variant="success">Default</Badge>
              </div>
            </div>
          )}

          {/* Step 7: Ready! */}
          {step === 7 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {businessName.trim() || 'Your Business'} is configured!
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your clean financial workspace is initialized with standard Indian Chart of Accounts and AI Co-Pilot standby.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            {step > 1 && step < 7 ? (
              <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Previous
              </Button>
            ) : <div />}

            {step < 7 ? (
              <Button
                size="sm"
                onClick={() => {
                  if (step === 2 && !businessName.trim()) {
                    setBusinessName('My Business');
                  }
                  setStep(step + 1);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Continue
              </Button>
            ) : (
              <Button size="sm" onClick={handleFinish} isLoading={isSubmitting} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Launch Dashboard
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
