'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

export function EarlyAccessSection() {
  return (
    <section id="vision" className="py-24 sm:py-32 bg-white border-t border-[#E5E8E5] scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-4 font-mono">
          Research & Private Preview
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#101310] leading-tight">
          The investment institution of the future may look very different.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#606660] max-w-2xl mx-auto leading-relaxed">
          Dhanvi is being built at the intersection of artificial intelligence, financial research,
          quantitative systems, and autonomous software. Join our early-access waitlist to participate
          in research updates and private previews.
        </p>

        <div className="mt-10 flex justify-center">
          <EarlyAccessButton
            source="bottom_cta"
            className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] px-6 py-3 text-xs sm:text-sm font-medium text-white shadow-xs transition-colors cursor-pointer"
          >
            <span>Join Early Access</span>
            <ArrowRight className="w-4 h-4" />
          </EarlyAccessButton>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E8E5] flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-[#606660]">
          <span>Collaborative research agents</span>
          <span className="text-[#C5C8C5]">•</span>
          <span>Deterministic risk firewalls</span>
          <span className="text-[#C5C8C5]">•</span>
          <span>Non-custodial research architecture</span>
        </div>
      </div>
    </section>
  )
}
