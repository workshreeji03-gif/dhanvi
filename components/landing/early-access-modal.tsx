'use client'

import React, { useEffect, useState, useRef } from 'react'
import { X, ChevronDown, Check } from 'lucide-react'
import { Logo } from './logo'

const ROLE_OPTIONS = [
  'Investor',
  'Quant / Researcher',
  'Asset Management',
  'Financial Institution',
  'Founder / Builder',
  'Engineer',
  'Student / Academic',
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

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successResult, setSuccessResult] = useState<{
    alreadyRegistered: boolean
    waitlist_number: string
    first_name: string
    masked_email: string
  } | null>(null)

  const dropdownRef = useRef<HTMLDivElement | null>(null)

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset state on modal close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSuccessResult(null)
        setErrorMsg('')
        setLoading(false)
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

    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          role,
          source: defaultSource,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit. Please try again.')
      }

      setSuccessResult({
        alreadyRegistered: Boolean(data.alreadyRegistered),
        waitlist_number: data.waitlist_number || '#0028',
        first_name: data.first_name || fullName.split(' ')[0],
        masked_email: data.masked_email || email,
      })
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-access-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container: 45% / 55% desktop split */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0C0F0D] text-[#F1F3EF] shadow-2xl overflow-hidden my-auto z-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg text-[#7A807B] hover:text-[#F1F3EF] hover:bg-white/[0.05] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* LEFT 45%: Editorial Message */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-[#111412] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between">
            <div className="space-y-6">
              <Logo className="h-6 w-auto" />

              <div>
                <div className="text-xs text-[#9A9F9B] mb-2 font-normal">
                  Early Access
                </div>
                <h2
                  id="early-access-title"
                  className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F1F3EF] leading-snug"
                >
                  Help shape what Dhanvi becomes.
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#9A9F9B] leading-relaxed">
                Join researchers, investors, engineers and builders following the development of Dhanvi.
              </p>

              {/* Subtle List — No decorative icons */}
              <div className="space-y-2 text-xs text-[#7A807B] pt-2 border-t border-white/[0.06]">
                <div>Research updates</div>
                <div>Product milestones</div>
                <div>Private previews</div>
              </div>
            </div>

            {/* Subtle Abstract Dhanvi Network Graphic */}
            <div className="pt-8 mt-auto" aria-hidden="true">
              <svg
                viewBox="0 0 240 70"
                className="w-full h-14 text-white/[0.15]"
                fill="none"
              >
                <circle cx="20" cy="35" r="3" fill="#9A9F9B" />
                <circle cx="70" cy="20" r="2.5" fill="#7A807B" />
                <circle cx="70" cy="50" r="2.5" fill="#7A807B" />
                <circle cx="130" cy="35" r="3.5" fill="#10B981" />
                <circle cx="190" cy="22" r="2.5" fill="#7A807B" />
                <circle cx="190" cy="48" r="2.5" fill="#7A807B" />
                <circle cx="225" cy="35" r="3" fill="#9A9F9B" />
                <line x1="20" y1="35" x2="70" y2="20" stroke="currentColor" strokeWidth="0.75" />
                <line x1="20" y1="35" x2="70" y2="50" stroke="currentColor" strokeWidth="0.75" />
                <line x1="70" y1="20" x2="130" y2="35" stroke="currentColor" strokeWidth="0.75" />
                <line x1="70" y1="50" x2="130" y2="35" stroke="currentColor" strokeWidth="0.75" />
                <line x1="130" y1="35" x2="190" y2="22" stroke="currentColor" strokeWidth="0.75" />
                <line x1="130" y1="35" x2="190" y2="48" stroke="currentColor" strokeWidth="0.75" />
                <line x1="190" y1="22" x2="225" y2="35" stroke="currentColor" strokeWidth="0.75" />
                <line x1="190" y1="48" x2="225" y2="35" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </div>
          </div>

          {/* RIGHT 55%: Form or Quiet Success State */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            {successResult ? (
              /* Success State: Restrained, No Confetti */
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F1F3EF]">
                    You&apos;re in.
                  </h3>
                  <p className="mt-2 text-xs text-[#9A9F9B] leading-relaxed">
                    {successResult.alreadyRegistered
                      ? "You're already on the Dhanvi waitlist. Your position is recorded."
                      : "We'll keep you updated as Dhanvi develops."}
                  </p>
                </div>

                <div className="py-6 border-y border-white/[0.06]">
                  <div className="text-xs text-[#7A807B] mb-2 font-normal">
                    Early access position
                  </div>
                  <div className="text-5xl sm:text-6xl font-medium text-[#10B981] font-mono tracking-tight">
                    {successResult.waitlist_number}
                  </div>
                  <div className="mt-3 text-xs text-[#7A807B]">
                    Confirmation sent to {successResult.masked_email}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-[#151816] px-6 py-2.5 text-xs font-medium text-[#F1F3EF] hover:border-white/[0.2] transition-colors cursor-pointer"
                >
                  Return to Dhanvi
                </button>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor="ea-name" className="block text-xs text-[#9A9F9B] mb-1.5 font-normal">
                    Full name
                  </label>
                  <input
                    id="ea-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Elena Vance"
                    className="w-full rounded-lg border border-white/[0.1] bg-[#111412] px-3.5 py-2.5 text-xs sm:text-sm text-[#F1F3EF] placeholder-[#555A56] outline-none focus:border-[#10B981] transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="ea-email" className="block text-xs text-[#9A9F9B] mb-1.5 font-normal">
                    Email
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full rounded-lg border border-white/[0.1] bg-[#111412] px-3.5 py-2.5 text-xs sm:text-sm text-[#F1F3EF] placeholder-[#555A56] outline-none focus:border-[#10B981] transition-colors"
                  />
                </div>

                {/* Organization (Optional) */}
                <div>
                  <label htmlFor="ea-company" className="block text-xs text-[#9A9F9B] mb-1.5 font-normal">
                    Organization (optional)
                  </label>
                  <input
                    id="ea-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Fund, university, or firm"
                    className="w-full rounded-lg border border-white/[0.1] bg-[#111412] px-3.5 py-2.5 text-xs sm:text-sm text-[#F1F3EF] placeholder-[#555A56] outline-none focus:border-[#10B981] transition-colors"
                  />
                </div>

                {/* Role */}
                <div ref={dropdownRef} className="relative">
                  <label className="block text-xs text-[#9A9F9B] mb-1.5 font-normal">
                    Role
                  </label>
                  <button
                    type="button"
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="w-full rounded-lg border border-white/[0.1] bg-[#111412] px-3.5 py-2.5 text-xs sm:text-sm text-[#F1F3EF] flex items-center justify-between outline-none focus:border-[#10B981] transition-colors cursor-pointer"
                  >
                    <span>{role}</span>
                    <ChevronDown className="w-4 h-4 text-[#7A807B]" />
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-white/[0.1] bg-[#151816] shadow-xl z-30 py-1 max-h-48 overflow-y-auto">
                      {ROLE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setRole(opt)
                            setRoleDropdownOpen(false)
                          }}
                          className="w-full px-3.5 py-2 text-left text-xs text-[#9A9F9B] hover:text-[#F1F3EF] hover:bg-white/[0.04] transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span>{opt}</span>
                          {role === opt && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#080A09] py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Join early access'}
                  </button>
                </div>

                <div className="text-center text-[11px] text-[#7A807B] pt-1">
                  No spam. Unsubscribe anytime.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
