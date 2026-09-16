'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
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
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT 58%: Editorial Thesis & Positioning */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-xs sm:text-[13px] font-medium tracking-[-0.01em] text-[#5F665F]">
              AI-native investment intelligence
            </div>

            <h1 className="text-[clamp(2.9rem,5.2vw,5.3rem)] font-bold tracking-[-0.045em] text-[#111411] leading-[1.02]">
              Markets are complex.
              <br />
              Intelligence should be{' '}
              <span className="text-[#10B981]">collaborative.</span>
            </h1>

            <p className="text-base sm:text-[19px] text-[#5F665F] leading-[1.62] max-w-2xl font-normal tracking-[-0.01em]">
              Dhanvi is building an AI-native investment intelligence system where specialized agents
              research markets, develop competing strategies, evaluate risk and learn from outcomes.
            </p>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <EarlyAccessButton
                source="hero_primary"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] px-5 py-3 text-xs sm:text-sm font-semibold text-white tracking-[-0.01em] transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>Join Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </EarlyAccessButton>

              <a
                href="#architecture"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#5F665F] hover:text-[#111411] tracking-[-0.01em] transition-colors py-2"
              >
                <span>Explore the system</span>
                <span>↓</span>
              </a>
            </div>

            {/* Quiet Institutional Attributes */}
            <div className="pt-8 border-t border-[#E4E8E4] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#8B928C]">
              <span>Independent research agents</span>
              <span className="text-[#E4E8E4]">•</span>
              <span>Deterministic risk controls</span>
              <span className="text-[#E4E8E4]">•</span>
              <span>Continuous memory trace</span>
            </div>
          </div>

          {/* RIGHT 42%: Minimal Research Architecture Diagram */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#E4E8E4] bg-[#F7F9F7] p-6 sm:p-7 relative">
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-[#E4E8E4] pb-3 mb-5 text-xs">
                <span className="text-[#111411] font-semibold tracking-[-0.015em]">Dhanvi System Architecture</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Active pipeline</span>
                </div>
              </div>

              {/* Connected Stage Nodes with Thin Hairline Lines */}
              <div className="space-y-2">
                {FLOW_STAGES.map((s, idx) => {
                  const isActive = activeStage === idx
                  return (
                    <div key={s.step}>
                      <div
                        className={`p-3.5 rounded-lg border transition-all ${
                          isActive
                            ? 'border-[#10B981] bg-white shadow-xs'
                            : 'border-[#E4E8E4] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span
                            className={`font-semibold tracking-[-0.015em] ${
                              isActive ? 'text-[#111411]' : 'text-[#111411]'
                            }`}
                          >
                            {s.label}
                          </span>
                          <span
                            className={`text-[11px] font-mono tabular-nums ${
                              isActive ? 'text-[#10B981] font-semibold' : 'text-[#8B928C]'
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
                        <div className="flex justify-center py-1">
                          <div
                            className={`w-px h-3 transition-colors ${
                              activeStage === idx ? 'bg-[#10B981]' : 'bg-[#E4E8E4]'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom Note */}
              <div className="mt-4 pt-3 border-t border-[#E4E8E4] flex items-center justify-between text-[11px] text-[#8B928C]">
                <span>Stage {activeStage + 1} of 6</span>
                <span className="font-mono tabular-nums">Research flow specification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
