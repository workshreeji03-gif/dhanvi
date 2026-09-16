'use client'

import React, { useState } from 'react'
import {
  Eye,
  FileSearch,
  MessageSquare,
  Sliders,
  PieChart,
  ShieldAlert,
  Zap,
  CheckCircle,
  Database,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const PIPELINE_STAGES = [
  {
    step: '01',
    name: 'OBSERVE',
    icon: Eye,
    tagline: 'Multi-Modal Ingestion',
    desc: 'Dhanvi receives real-time market microstructure, global regulatory filings, tick streams, macro indicators, and relevant catalysts across asset classes.',
    telemetry: 'Ingesting 18,400 events/sec across equities, rates, FX, and disclosures.',
  },
  {
    step: '02',
    name: 'RESEARCH',
    icon: FileSearch,
    tagline: 'Dimensional Analysis',
    desc: 'Specialized agents analyze different dimensions independently: fundamental unit economics, volatility regimes, macro policy impulse, and sentiment velocity.',
    telemetry: '6 specialized agents formulating parallel domain assessments.',
  },
  {
    step: '03',
    name: 'DEBATE',
    icon: MessageSquare,
    tagline: 'Adversarial Challenge',
    desc: 'Competing interpretations and hypotheses are computationally compared. Bull and bear theses are interrogated against historical analogs and alternative scenarios.',
    telemetry: 'Synthesizing 4 competing hypotheses; resolving cross-signal divergences.',
  },
  {
    step: '04',
    name: 'STRATEGIZE',
    icon: Sliders,
    tagline: 'Hypothesis Formulation',
    desc: 'Strategy agents transform synthesized intelligence into testable, discrete quantitative decisions with parameterized entry criteria and horizon definitions.',
    telemetry: 'Generating 3 candidate strategy allocations with quantified edge bounds.',
  },
  {
    step: '05',
    name: 'ALLOCATE',
    icon: PieChart,
    tagline: 'Portfolio Construction',
    desc: 'A dedicated portfolio layer evaluates how capital could be distributed between strategies, considering cross-asset correlations, liquidity constraints, and factor budgets.',
    telemetry: 'Simulating optimal risk-budget distribution across active alphas.',
  },
  {
    step: '06',
    name: 'RISK CHECK',
    icon: ShieldAlert,
    tagline: 'Independent Governance',
    desc: 'Independent risk controls evaluate net and gross exposures, Value at Risk (VaR), stress drawdown limits, and liquidity reserves outside strategy reasoning.',
    telemetry: 'Hard risk verification: 0 limits breached; drawdown safety ceiling verified.',
  },
  {
    step: '07',
    name: 'EXECUTE',
    icon: Zap,
    tagline: 'Execution Routing',
    desc: 'Approved decisions can be translated into execution instructions through appropriate infrastructure, using algorithmic order slicing to minimize market impact.',
    telemetry: 'Simulated TWAP/VWAP smart-routing across fragmentation venues.',
  },
  {
    step: '08',
    name: 'EVALUATE',
    icon: CheckCircle,
    tagline: 'Outcome Deconstruction',
    desc: 'Expected outcomes are continuously compared against actual realized market outcomes, distinguishing asset selection skill from macro beta and execution drag.',
    telemetry: 'Attribution deconstructed: +18 bps alpha selection, -2 bps slippage.',
  },
  {
    step: '09',
    name: 'REMEMBER',
    icon: Database,
    tagline: 'Institutional Indexing',
    desc: 'The complete decision context, pre-trade beliefs, market regime, and realized outcomes become permanently indexed into Dhanvi’s institutional memory.',
    telemetry: 'Perpetual memory indexed; feedback vector updated across agent weights.',
  },
]

export function DecisionPipeline() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const current = PIPELINE_STAGES[selectedIdx]

  return (
    <section className="py-20 sm:py-28 bg-neutral-900 text-white border-y border-neutral-800">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE COGNITIVE PIPELINE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            From Information to Decision.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Every market event navigates an explicit nine-stage institutional lifecycle.
            Explore each stage to understand how unstructured global market information is
            transformed into controlled decisions and perpetual institutional memory.
          </p>
        </div>

        {/* Desktop Pipeline Stage Scroller / Stepper */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
          {PIPELINE_STAGES.map((stg, idx) => {
            const Icon = stg.icon
            const isSelected = selectedIdx === idx
            return (
              <button
                key={stg.step}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/40 text-white ring-1 ring-emerald-500/50 shadow-md'
                    : 'border-neutral-800 bg-neutral-950/70 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span>{stg.step}</span>
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                </div>
                <div className="text-xs font-bold truncate">{stg.name}</div>
              </button>
            )
          })}
        </div>

        {/* Active Stage Detailed Stage Card */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-neutral-850 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <current.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Stage {current.step} — {current.tagline}
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">{current.name}</h3>
              </div>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={selectedIdx === 0}
                onClick={() => setSelectedIdx((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                type="button"
                disabled={selectedIdx === PIPELINE_STAGES.length - 1}
                onClick={() => setSelectedIdx((prev) => Math.min(PIPELINE_STAGES.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/80 text-xs font-semibold text-emerald-400 hover:bg-emerald-900 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Next Stage →
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-4xl">
            {current.desc}
          </p>

          <div className="mt-6 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-emerald-400 font-bold uppercase">Telemetry:</span>
            <span className="text-neutral-300">{current.telemetry}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
