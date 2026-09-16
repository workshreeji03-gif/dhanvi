'use client'

import React, { useEffect, useState, useRef } from 'react'
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
  ChevronDown,
  Check,
  Copy,
  Brain,
  Layers,
  Shield,
  RotateCcw,
  Zap,
} from 'lucide-react'

const ROLE_OPTIONS = [
  'Investor',
  'Quant / Researcher',
  'Asset Management',
  'Financial Institution',
  'Founder / Builder',
  'Engineer',
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
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const [consent, setConsent] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const [successResult, setSuccessResult] = useState<{
    alreadyRegistered: boolean
    waitlist_number: string
    first_name: string
    masked_email: string
  } | null>(null)

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const modalCardRef = useRef<HTMLDivElement | null>(null)

  // Escape key & scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (roleDropdownOpen) {
          setRoleDropdownOpen(false)
        } else {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, roleDropdownOpen, onClose])

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSuccessResult(null)
        setErrorMsg('')
        setLoading(false)
        setCopied(false)
        setRoleDropdownOpen(false)
      }, 250)
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

    if (!consent) {
      setErrorMsg('Please confirm your consent to receive early access updates.')
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
        alreadyRegistered: Boolean(data.alreadyRegistered),
        waitlist_number: data.waitlist_number || '#0143',
        first_name: data.first_name || fullName.split(' ')[0],
        masked_email: data.masked_email || email,
      })
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyNumber = () => {
    if (!successResult) return
    navigator.clipboard.writeText(successResult.waitlist_number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleExplore = () => {
    onClose()
    const target = document.getElementById('intelligence') || document.getElementById('architecture')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-access-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in font-sans overflow-y-auto"
    >
      {/* Background intelligence-grid pattern */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div
        ref={modalCardRef}
        className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-neutral-800/90 bg-neutral-950 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden animate-scale-in my-auto"
      >
        {/* Ambient Top Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/15 blur-3xl pointer-events-none"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer border border-transparent hover:border-neutral-750"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          /* ================= SUCCESS STATE ================= */
          <div className="p-6 sm:p-10 md:p-12 text-center space-y-6 animate-fade-up">
            {/* Confirmation Header Badge */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/60 ring-1 ring-emerald-400/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {successResult.alreadyRegistered
                    ? 'WAITLIST POSITION VERIFIED'
                    : 'EARLY ACCESS CONFIRMED'}
                </span>
              </div>
              <h2
                id="early-access-title"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              >
                You&apos;re in, {successResult.first_name}.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                {successResult.alreadyRegistered
                  ? "You're already registered as part of Dhanvi's early-access cohort with this verified position."
                  : "You're now part of the Dhanvi early-access cohort as we build AI-native investment intelligence."}
              </p>
            </div>

            {/* Visual Centerpiece: Waitlist Position Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-neutral-900/60 max-w-md mx-auto text-center shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/20">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold mb-2">
                YOUR POSITION
              </div>
              <div className="text-4xl sm:text-6xl font-extrabold text-emerald-400 font-mono tracking-tight my-1">
                {successResult.waitlist_number}
              </div>
              <div className="text-xs text-neutral-400 mt-2 font-mono flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Permanent database-backed sequence</span>
              </div>
            </div>

            {/* Email notice */}
            <div className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              We&apos;ll send important product milestones and access opportunities to:{' '}
              <span className="font-mono text-neutral-200 font-bold block sm:inline mt-1 sm:mt-0">
                {successResult.masked_email}
              </span>
            </div>

            {/* Mini Architecture Flow Progression: YOU → DHANVI EARLY ACCESS → PRODUCT MILESTONES → PRIVATE RELEASES */}
            <div className="max-w-xl mx-auto py-3 px-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2.5">
                YOUR ONBOARDING PIPELINE
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex flex-col items-center">
                  <span className="text-[9px] text-emerald-500">STEP 01</span>
                  <span className="font-bold mt-0.5">YOU</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex flex-col items-center">
                  <span className="text-[9px] text-emerald-500">STEP 02</span>
                  <span className="font-bold mt-0.5">EARLY ACCESS</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-850 border border-neutral-750 text-neutral-400 flex flex-col items-center">
                  <span className="text-[9px] text-neutral-500">STEP 03</span>
                  <span className="font-bold mt-0.5">MILESTONES</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-850 border border-neutral-750 text-neutral-400 flex flex-col items-center">
                  <span className="text-[9px] text-neutral-500">STEP 04</span>
                  <span className="font-bold mt-0.5">PRIVATE RELEASE</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleCopyNumber}
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border border-neutral-750 bg-neutral-900 hover:bg-neutral-850 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied {successResult.waitlist_number}!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>Copy Early Access Number</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExplore}
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-950 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <span>Explore Dhanvi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= TWO-COLUMN MODAL CONTENT ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* LEFT COLUMN: Visual Storytelling & Platform Flow */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-9 border-b lg:border-b-0 lg:border-r border-neutral-850 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950 flex flex-col justify-between">
              <div>
                {/* Cohort Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PRIVATE COHORT</span>
                </div>

                <h2
                  id="early-access-title"
                  className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight"
                >
                  Join the Dhanvi Early Access List.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                  Get early access to Dhanvi as we build a new approach to AI-native investment intelligence.
                </p>

                {/* Animated Interactive Flow Visualization */}
                <div className="my-6 p-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 space-y-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-between">
                    <span>MULTI-AGENT PIPELINE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>RESEARCH</span>
                      <span className="ml-auto text-[10px] text-neutral-500">6 Agents</span>
                    </div>

                    <div className="flex justify-center text-neutral-600 leading-none">↓</div>

                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      <Brain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>MULTI-AGENT INTELLIGENCE</span>
                      <span className="ml-auto text-[10px] text-cyan-400">Synthesis</span>
                    </div>

                    <div className="flex justify-center text-neutral-600 leading-none">↓</div>

                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>STRATEGY</span>
                      <span className="ml-auto text-[10px] text-neutral-500">Simulations</span>
                    </div>

                    <div className="flex justify-center text-neutral-600 leading-none">↓</div>

                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>RISK</span>
                      <span className="ml-auto text-[10px] text-amber-400">Independent</span>
                    </div>

                    <div className="flex justify-center text-neutral-600 leading-none">↓</div>

                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>MEMORY</span>
                      <span className="ml-auto text-[10px] text-emerald-400">Feedback Loop</span>
                    </div>
                  </div>
                </div>

                {/* What you'll receive */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">
                    WHAT YOU&apos;LL RECEIVE
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>Product development updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>Research milestones</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>Early platform previews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>Private testing invitations when available</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Anti-spam footer notice */}
              <div className="pt-6 text-[11px] text-neutral-500 font-mono">
                No spam. Meaningful Dhanvi updates only.
              </div>
            </div>

            {/* RIGHT COLUMN: The Registration Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-9 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Request Cohort Access
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Secure your permanent sequential position on the early-access waitlist.
                  </p>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="mb-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-start gap-2.5 text-xs text-rose-300 animate-fade-in"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field: Full Name */}
                  <div>
                    <label
                      htmlFor="ea-full-name"
                      className="block text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-1.5 font-semibold"
                    >
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="ea-full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field: Email Address (Any domain accepted) */}
                  <div>
                    <label
                      htmlFor="ea-email"
                      className="block text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-1.5 font-semibold"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="ea-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-1">
                      Accepts personal, fund, university, or corporate addresses.
                    </div>
                  </div>

                  {/* Field: Company / Organization (Optional) */}
                  <div>
                    <label
                      htmlFor="ea-company"
                      className="block text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-1.5 font-semibold"
                    >
                      COMPANY / ORGANIZATION <span className="text-neutral-500 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="ea-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company, university, fund or independent"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Custom Polished Accessible Selector: I AM A... */}
                  <div ref={dropdownRef} className="relative">
                    <label
                      id="ea-role-label"
                      className="block text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-1.5 font-semibold"
                    >
                      I AM A...
                    </label>

                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={roleDropdownOpen}
                      aria-labelledby="ea-role-label"
                      onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 text-xs text-white flex items-center justify-between focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer text-left"
                    >
                      <Briefcase className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <span className="font-semibold text-neutral-100">{role}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                          roleDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {roleDropdownOpen && (
                      <div
                        role="listbox"
                        aria-labelledby="ea-role-label"
                        className="absolute z-30 inset-x-0 top-full mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-neutral-750 bg-neutral-900 shadow-2xl p-1.5 space-y-0.5 animate-scale-in"
                      >
                        {ROLE_OPTIONS.map((opt) => {
                          const isSelected = opt === role
                          return (
                            <button
                              key={opt}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setRole(opt)
                                setRoleDropdownOpen(false)
                              }}
                              className={`w-full px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/30'
                                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="ea-consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-emerald-600 focus:ring-0 cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="ea-consent"
                      className="text-[11px] text-neutral-400 leading-relaxed cursor-pointer select-none"
                    >
                      I agree to receive Dhanvi product updates, research milestones and early-access invitations. I can unsubscribe anytime.
                    </label>
                  </div>

                  {/* CTA Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2 font-mono">
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Securing your position...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Join Dhanvi Early Access</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Non-custodial & Privacy Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Non-custodial research platform • Encrypted database submission</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
