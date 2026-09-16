'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

const FLOW_STAGES = [
  { step: '01', label: 'Research Agents', detail: 'News · Markets · Companies · Macro · Sentiment · Events' },
  { step: '02', label: 'Intelligence Synthesis', detail: 'Cross-signal reconciliation & hypothesis formulation' },
  { step: '03', label: 'Strategy Network', detail: 'Competing quantitative alphas & regime calibration' },
  { step: '04', label: 'Portfolio Allocation', detail: 'Covariance weighting, liquidity & drawdown budgeting' },
  { step: '05', label: 'Deterministic Risk Gate', detail: 'Hard independent constraints outside agent reasoning' },
  { step: '06', label: 'Institutional Memory', detail: 'Forensic decision traces permanently indexed' },
]

export function Hero() {
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % FLOW_STAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-38 lg:pb-32 bg-white overflow-hidden">
      {/* subtle dotted texture with soft radial fade */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(85%_65%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT 58%: Editorial Thesis & Positioning */}
          <div className="lg:col-span-7 space-y-7">
            {/* Pill Badge matching Image 1 */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E4E8E4] bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#5F665F] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
                The AI Investment Intelligence System
              </span>
            </div>

            {/* Headline matching Image 1's font size, hierarchy, and color */}
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-[56px] text-balance">
              Markets are complex.{' '}
              <br className="hidden sm:inline" />
              Intelligence should be{' '}
              <span className="text-[#10B981]">collaborative.</span>
            </h1>

            {/* Sub-headline matching Image 1's readability and color */}
            <p className="text-pretty text-base leading-relaxed text-[#4B5563] sm:text-[18px] max-w-xl font-normal">
              Dhanvi is building an AI-native investment intelligence system where specialized agents
              research markets, develop competing strategies, evaluate risk, and learn from outcomes.
            </p>

            {/* Action Row matching Image 1's rounded-full pill buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <LinkButtonOrEarlyAccess />

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 rounded-full border border-[#E4E8E4] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#F7F9F7] shadow-xs cursor-pointer"
              >
                <span>Explore the system</span>
                <span className="text-[#8B928C]">↓</span>
              </a>
            </div>

            {/* Reassuring microcopy */}
            <p className="text-sm text-[#6B7280] font-normal pt-1">
              Works alongside institutional workflows. Governed by deterministic risk gates.
            </p>
          </div>

          {/* RIGHT 42%: Interactive System Architecture Window Mockup matching Image 1 */}
          <div className="lg:col-span-5 relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-[#10B981]/10 to-teal-500/5 blur-2xl"
            />
            <div className="overflow-hidden rounded-2xl border border-[#E4E8E4] bg-white shadow-2xl shadow-black/[0.04]">
              {/* window chrome header */}
              <div className="flex items-center justify-between border-b border-[#E4E8E4] bg-[#F7F9F7]/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D1D5DB]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D1D5DB]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D1D5DB]" />
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#5F665F]">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  Live · System Pipeline Active
                </span>
              </div>

              {/* Connected Stage Nodes */}
              <div className="p-4 sm:p-5 space-y-2">
                {FLOW_STAGES.map((s, idx) => {
                  const isActive = activeStage === idx
                  return (
                    <div key={s.step}>
                      <div
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? 'border-[#10B981] bg-[#F7F9F7] shadow-xs'
                            : 'border-[#E4E8E4] bg-white hover:border-[#D0D7D0]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span className="font-semibold tracking-[-0.01em] text-[#111827]">
                            {s.label}
                          </span>
                          <span
                            className={`text-[11px] font-mono tabular-nums ${
                              isActive ? 'text-[#10B981] font-bold' : 'text-[#8B928C]'
                            }`}
                          >
                            {s.step}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#5F665F] leading-normal font-normal">
                          {s.detail}
                        </div>
                      </div>

                      {/* Thin connector line between nodes */}
                      {idx < FLOW_STAGES.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <div
                            className={`w-px h-2 transition-colors ${
                              activeStage === idx ? 'bg-[#10B981]' : 'bg-[#E4E8E4]'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom status */}
              <div className="px-4 py-3 border-t border-[#E4E8E4] bg-[#F7F9F7]/50 flex items-center justify-between text-[11px] text-[#8B928C]">
                <span>Stage {activeStage + 1} of 6</span>
                <span className="font-mono tabular-nums text-[#10B981] font-medium">
                  Multi-agent consensus active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LinkButtonOrEarlyAccess() {
  return (
    <EarlyAccessButton
      source="hero_primary"
      className="group inline-flex items-center gap-2 rounded-full bg-[#111827] hover:bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md cursor-pointer active:scale-[0.99]"
    >
      <span>Join Early Access</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </EarlyAccessButton>
  )
}
