'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

export function EarlyAccessSection() {
  return (
    <section id="vision" className="py-24 sm:py-32 bg-white border-t border-[#E4E8E4] scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <div className="text-xs font-medium uppercase tracking-wide text-[#5F665F] mb-4">
          Research & Private Preview
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-tight text-[#111827] leading-[1.08]">
          The investment institution of the future may look very different.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed font-normal">
          Dhanvi is being built at the intersection of artificial intelligence, financial research,
          quantitative systems, and autonomous software. Join our early-access waitlist to participate
          in research updates and private previews.
        </p>

        <div className="mt-10 flex justify-center">
          <EarlyAccessButton
            source="bottom_cta"
            className="group inline-flex items-center gap-2 rounded-full bg-[#111827] hover:bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md cursor-pointer tracking-tight"
          >
            <span>Join Early Access</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </EarlyAccessButton>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E4E8E4] flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-[#5F665F]">
          <span>Collaborative research agents</span>
          <span className="text-[#D8DDD8]">•</span>
          <span>Deterministic risk firewalls</span>
          <span className="text-[#D8DDD8]">•</span>
          <span>Non-custodial research architecture</span>
        </div>
      </div>
    </section>
  )
}
