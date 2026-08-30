'use client'

import React, { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react'
import { Reveal } from './reveal'

export function FinalCta() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !businessName.trim()) return

    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name.trim(),
          email: email.trim(),
          business_name: businessName.trim(),
          source: 'final_cta',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register. Please try again.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please check your network and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="join" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-16 text-center sm:px-12 sm:py-24 shadow-2xl">
        <div
          aria-hidden="true"
          className="grain pointer-events-none absolute inset-0 opacity-[0.12]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
        />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" /> Early Access
          </span>

          <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Stop waiting for month-end to understand your business.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-neutral-400 font-medium">
            Join the early access list and be among the first businesses to experience continuous financial clarity.
          </p>

          {submitted ? (
            <div className="mx-auto mt-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 p-6 text-center animate-fade-up">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">You&apos;re on the list.</h3>
              <p className="text-xs sm:text-sm text-emerald-300 mt-1 font-medium">
                Thanks for joining Dhanvi Early Access. We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md space-y-3 text-left">
              {errorMsg && (
                <div className="rounded-xl bg-rose-950/80 border border-rose-500/50 p-3 text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full h-11 rounded-xl border border-white/15 bg-white/5 px-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-11 rounded-xl border border-white/15 bg-white/5 px-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business"
                  className="w-full h-11 rounded-xl border border-white/15 bg-white/5 px-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-4 w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-xs sm:text-sm font-bold text-neutral-950 shadow-md transition-all hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Joining Early Access...' : 'Join Early Access'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict privacy. Zero spam. Works alongside your existing accountant.</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
