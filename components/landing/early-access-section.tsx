'use client'

import React from 'react'
import { Sparkles, ArrowRight, ShieldCheck, Binary, Cpu } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

export function EarlyAccessSection() {
  return (
    <section className="py-24 sm:py-32 bg-neutral-950 text-white relative overflow-hidden font-sans border-t border-neutral-850">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400 font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>RESEARCH & PRIVATE PREVIEW</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          The investment institution of the future may look very different.
        </h2>

        <p className="mt-6 text-sm sm:text-base lg:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Dhanvi is being built at the intersection of artificial intelligence, financial research,
          quantitative systems and autonomous software. Join our early-access waitlist to participate
          in research milestones and product previews.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <EarlyAccessButton
            source="footer_cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Join Early Access</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </EarlyAccessButton>
        </div>

        {/* Security / Non-custodial reassurance */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Deterministic Risk Bounds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Binary className="w-3.5 h-3.5 text-emerald-500" />
            <span>Non-Custodial Architecture</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>Multi-Agent Research</span>
          </div>
        </div>
      </div>
    </section>
  )
}
