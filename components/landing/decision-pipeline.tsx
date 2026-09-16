'use client'

import React, { useState } from 'react'

const PIPELINE_STAGES = [
  {
    step: '01',
    name: 'Observe',
    tagline: 'Multi-modal ingestion',
    desc: 'Receives market microstructure, global regulatory filings, tick streams, macro indicators, and corporate disclosures in parallel.',
    note: 'Ingesting continuous feeds across global asset classes and regulatory registries.',
  },
  {
    step: '02',
    name: 'Research',
    tagline: 'Dimensional analysis',
    desc: 'Specialized agents evaluate distinct dimensions: fundamental unit economics, volatility surfaces, macro policy impulse, and narrative velocity.',
    note: '6 specialized agents formulating parallel domain assessments.',
  },
  {
    step: '03',
    name: 'Debate',
    tagline: 'Adversarial challenge',
    desc: 'Competing interpretations and hypotheses are computationally compared. Bull and bear theses are interrogated against historical analogs.',
    note: 'Reconciling cross-signal divergences before strategy formation.',
  },
  {
    step: '04',
    name: 'Strategize',
    tagline: 'Hypothesis formulation',
    desc: 'Strategy agents transform synthesized intelligence into testable, discrete quantitative hypotheses with explicit parameter bounds.',
    note: 'Generating candidate allocations across momentum, mean reversion, and macro event models.',
  },
  {
    step: '05',
    name: 'Allocate',
    tagline: 'Portfolio construction',
    desc: 'A dedicated allocation layer evaluates how capital should be distributed across strategies, factoring correlation, regime, and drawdown budget.',
    note: 'Capital is allocated based on multi-factor covariance, not past performance alone.',
  },
  {
    step: '06',
    name: 'Risk Check',
    tagline: 'Independent governance',
    desc: 'Independent risk controls evaluate net and gross exposures, VaR, stress drawdown limits, and liquidity reserves outside strategy reasoning.',
    note: 'Deterministic guardrails operate as an unconditional mathematical firewall.',
  },
  {
    step: '07',
    name: 'Execute',
    tagline: 'Algorithmic routing',
    desc: 'Approved decisions are sliced into algorithmic orders designed to minimize market footprint and adverse selection slippage.',
    note: 'Simulated liquidity-aware order slicing across fragmented venues.',
  },
  {
    step: '08',
    name: 'Evaluate',
    tagline: 'Outcome deconstruction',
    desc: 'Realized market outcomes are decomposed to isolate pure alpha selection skill from macro beta and execution drag.',
    note: 'Continuous performance attribution distinguishing skill from luck.',
  },
  {
    step: '09',
    name: 'Remember',
    tagline: 'Institutional indexing',
    desc: 'The complete decision journey, pre-trade beliefs, market regime, and realized outcomes become permanently indexed in institutional memory.',
    note: 'Retrieved automatically whenever similar market conditions emerge.',
  },
]

export function DecisionPipeline() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const current = PIPELINE_STAGES[selectedIdx]

  return (
    <section id="intelligence" className="py-24 sm:py-32 border-t border-[#E5E8E5] bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-normal text-[#606660] mb-3">
            Decision lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#101310] leading-tight">
            From information to decision.
          </h2>
          <p className="mt-4 text-base text-[#606660] leading-relaxed">
            How market observations move through multi-agent research, hypothesis debate, portfolio
            allocation, independent risk verification, and institutional memory.
          </p>
        </div>

        {/* 9-Stage Clean Stepper Bar */}
        <div className="border border-[#E5E8E5] rounded-xl overflow-hidden bg-white">
          {/* Top Stage Selectors */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 divide-x divide-y lg:divide-y-0 divide-[#E5E8E5]">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = selectedIdx === idx
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-4 text-left transition-colors cursor-pointer relative group outline-none ${
                    isActive ? 'bg-[#F7F8F6]' : 'hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-[2px] transition-colors ${
                      isActive ? 'bg-[#10B981]' : 'bg-transparent group-hover:bg-[#E5E8E5]'
                    }`}
                  />
                  <div className="text-[10px] font-mono text-[#929892] mb-1">
                    {stage.step}
                  </div>
                  <div
                    className={`text-xs font-medium truncate ${
                      isActive ? 'text-[#101310]' : 'text-[#606660] group-hover:text-[#101310]'
                    }`}
                  >
                    {stage.name}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Stage Editorial Detail */}
          <div className="p-6 sm:p-10 border-t border-[#E5E8E5] bg-[#FAFAFA]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#10B981] font-medium">
                    STAGE {current.step} / 09
                  </span>
                  <span className="text-[#D8DDD8]">•</span>
                  <span className="text-xs text-[#606660]">
                    {current.tagline}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium text-[#101310] tracking-tight">
                  {current.name}
                </h3>
                <p className="text-sm sm:text-base text-[#606660] leading-relaxed max-w-2xl">
                  {current.desc}
                </p>
              </div>

              <div className="lg:col-span-4 p-5 rounded-lg border border-[#E5E8E5] bg-white">
                <div className="text-[11px] font-mono text-[#929892] mb-1.5">
                  SYSTEM TELEMETRY
                </div>
                <div className="text-xs text-[#101310] leading-relaxed">
                  {current.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
