'use client'

import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Loader2, AlertCircle, Sparkles } from 'lucide-react'

const BUSINESS_TYPES = [
  'Retail',
  'Services',
  'Manufacturing',
  'Wholesale',
  'E-commerce',
  'Professional Services',
  'Other',
]

const TEAM_SIZES = [
  '1–5',
  '6–10',
  '11–25',
  '26–50',
  '51–100',
  '100+',
]

const ACCOUNTING_SYSTEMS = [
  'Tally',
  'Excel / Google Sheets',
  'Zoho Books',
  'QuickBooks',
  'Busy',
  'Manual / Paper',
  'Other',
]

export function EarlyAccessForm() {
  const [step, setStep] = useState<1 | 2>(1)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    business_type: BUSINESS_TYPES[0],
    employee_count: TEAM_SIZES[0],
    current_accounting: ACCOUNTING_SYSTEMS[0],
  })

  const [step1Errors, setStep1Errors] = useState<{
    name?: string
    email?: string
    business_name?: string
  }>({})

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrorMsg('')
    if (step1Errors[field as keyof typeof step1Errors]) {
      setStep1Errors((prev) => {
        const next = { ...prev }
        delete next[field as keyof typeof step1Errors]
        return next
      })
    }
  }

  const handleContinueStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const errors: typeof step1Errors = {}
    if (!formData.name.trim()) {
      errors.name = 'This field is required.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'This field is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!formData.business_name.trim()) {
      errors.business_name = 'This field is required.'
    }

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors)
      return
    }

    setStep1Errors({})
    setStep(2)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || undefined,
          business_name: formData.business_name.trim(),
          business_type: formData.business_type,
          employee_count: formData.employee_count,
          current_accounting: formData.current_accounting,
          source: (() => {
            if (typeof window !== 'undefined') {
              const params = new URLSearchParams(window.location.search);
              return params.get('source') || params.get('utm_source') || 'landing_page';
            }
            return 'landing_page';
          })(),
        }),
      });

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong while submitting your application.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-lg animate-fade-up space-y-4 font-sans">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-xs">
          <CheckCircle2 className="h-9 w-9" />
        </span>

        <div className="space-y-2">
          <h3 className="text-3xl font-bold tracking-tight text-neutral-950">
            You&apos;re in.
          </h3>
          <p className="max-w-md text-sm sm:text-base font-semibold text-neutral-800 leading-relaxed">
            Dhanvi is being built for businesses that want their finances to stay one step ahead.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            We&apos;ll reach out when your access is ready.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold font-mono mt-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          You&apos;re on the list
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl font-sans">
      {/* Top Header / Progress */}
      <div className="flex items-center justify-between border-b border-border pb-5 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
            Dhanvi Early Access
          </span>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
          Step {step} of 2
        </span>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs sm:text-sm text-rose-900 flex items-start gap-3 animate-fade-up">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">{errorMsg}</p>
            {errorMsg.includes('already') && (
              <p className="text-rose-700 text-xs font-medium">
                We&apos;ll be in touch when Early Access opens.
              </p>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleContinueStep1} noValidate className="space-y-5 animate-fade-up">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Let&apos;s get to know your business.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium">
              Tell us a little about you and your business.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g. Ramesh Patel"
                className={`w-full rounded-xl border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium ${
                  step1Errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-border'
                }`}
              />
              {step1Errors.name && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">
                  {step1Errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@company.com"
                className={`w-full rounded-xl border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium ${
                  step1Errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-border'
                }`}
              />
              {step1Errors.email && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">
                  {step1Errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Business Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.business_name}
                onChange={(e) => updateField('business_name', e.target.value)}
                placeholder="Your company or brand name"
                className={`w-full rounded-xl border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium ${
                  step1Errors.business_name ? 'border-rose-400 bg-rose-50/20' : 'border-border'
                }`}
              />
              {step1Errors.business_name && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">
                  {step1Errors.business_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-neutral-850 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-emerald-400" />
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleFinalSubmit} noValidate className="space-y-5 animate-fade-up">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              A little more context.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium">
              This helps us understand how Dhanvi can work best for your business.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Business Type
              </label>
              <select
                value={formData.business_type}
                onChange={(e) => updateField('business_type', e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Team Size
              </label>
              <select
                value={formData.employee_count}
                onChange={(e) => updateField('employee_count', e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
              >
                {TEAM_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} employees
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                Current Accounting System
              </label>
              <select
                value={formData.current_accounting}
                onChange={(e) => updateField('current_accounting', e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-xs sm:text-sm text-neutral-950 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
              >
                {ACCOUNTING_SYSTEMS.map((sys) => (
                  <option key={sys} value={sys}>
                    {sys}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-5 py-3.5 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-neutral-850 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                  <span>Securing your spot...</span>
                </>
              ) : (
                <>
                  <span>Join Early Access</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-emerald-400" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground font-medium">
        Strict privacy. Zero spam. We&apos;ll only reach out regarding your early access invitation.
      </p>
    </div>
  )
}
