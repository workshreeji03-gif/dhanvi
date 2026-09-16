'use client'

import React, { useEffect, useState } from 'react'
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Mail,
  Briefcase,
  Loader2,
} from 'lucide-react'

const ROLE_OPTIONS = [
  'Investor',
  'Quant / Researcher',
  'Asset Management',
  'Financial Institution',
  'Founder / Builder',
  'Student / Research',
  'Other',
]

export interface EarlyAccessModalProps {
  open: boolean
  defaultSource?: string
  onClose: () => void
}

export function EarlyAccessModal({
  open,
  defaultSource = 'modal',
  onClose,
}: EarlyAccessModalProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState(ROLE_OPTIONS[0])
  const [consent, setConsent] = useState(true)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successResult, setSuccessResult] = useState<{
    alreadyRegistered: boolean
    waitlist_number: number
    first_name: string
    masked_email: string
  } | null>(null)

  // Escape key & scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // Reset when closed
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSuccessResult(null)
        setErrorMsg('')
        setLoading(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.')
      return
    }

    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim() || 'Independent',
          role,
          source: defaultSource,
        }),
      })

      const data = await res.json()

      if (!res.ok && !data.alreadyRegistered) {
        setErrorMsg(data.error || 'Failed to submit registration. Please try again.')
        setLoading(false)
        return
      }

      setSuccessResult({
        alreadyRegistered: !!data.alreadyRegistered,
        waitlist_number: data.waitlist_number || 143,
        first_name: data.first_name || fullName.split(' ')[0],
        masked_email: data.masked_email || email,
      })
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 text-white p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-emerald-500/15 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          /* Success Experience */
          <div className="py-4 text-center space-y-5 animate-fade-up">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                {successResult.alreadyRegistered ? '✓ WAITLIST VERIFIED' : '✓ EARLY ACCESS CONFIRMED'}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Welcome to Dhanvi, {successResult.first_name}.
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                {successResult.alreadyRegistered
                  ? "You're already on the Dhanvi early-access list with your registered position."
                  : "You're officially registered for our early-access research cohort."}
              </p>
            </div>

            {/* Position Box */}
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 max-w-sm mx-auto text-center">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                You're currently:
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono tracking-tight">
                #{successResult.waitlist_number}
              </div>
              <div className="text-xs text-neutral-400 mt-2 font-mono">
                on the Dhanvi early-access list
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Your confirmation has been sent to{' '}
              <span className="font-mono text-neutral-200 font-semibold">{successResult.masked_email}</span>.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Explore Dhanvi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRIVATE COHORT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Join the Dhanvi Early Access List.
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Be among the first institutions and researchers to access our multi-agent market intelligence platform.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Alexander Wright"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Work Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@fund.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Company / Organization (Optional) */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Company / Organization <span className="text-neutral-500">(Optional)</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Citadel / Stanford / Independent"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Your Primary Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-neutral-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-emerald-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="consent" className="text-[11px] text-neutral-400 leading-relaxed cursor-pointer">
                  I agree to receive research milestones, product updates, and early-access invitations from Dhanvi. Unsubscribe anytime.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering Position...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Request Early Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center text-[10px] font-mono text-neutral-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Non-custodial research platform • Encrypted database submission</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
