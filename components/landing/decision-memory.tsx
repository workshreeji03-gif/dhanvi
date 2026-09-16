'use client'

import React, { useState } from 'react'
import {
  Database,
  Search,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  GitCommit,
  Brain,
  Layers,
  Sparkles,
  FileCode,
} from 'lucide-react'

const DECISION_STAGES = [
  { step: '01', title: 'Market State', value: 'Elevated cross-asset volatility (VIX 28.4); US 10Y Yield compressed 14 bps.' },
  { step: '02', title: 'Information Available', value: 'CPI print 0.2% cooler than consensus; semiconductor CAPEX upward revision.' },
  { step: '03', title: 'Agent Hypothesis', value: 'Rate sensitivity will rotate capital into high-FCF hardware; growth multiples will expand.' },
  { step: '04', title: 'Strategy Decision', value: 'Strategy 01 initiates long semiconductor basket vs. short consumer discretionary pair.' },
  { step: '05', title: 'Risk Assessment', value: 'Independent risk check limits position sizing to 4.5% of NAV; enforces 6% stop-loss barrier.' },
  { step: '06', title: 'Action', value: 'Executed across dark liquidity venues with 1.2 bps realized slippage.' },
  { step: '07', title: 'Outcome', value: 'Realized gain +2.8% over 72-hour holding horizon; max intra-trade drawdown 0.4%.' },
  { step: '08', title: 'Attribution', value: 'Selection alpha: +2.1%; Macro factor beta: +0.8%; Execution cost: -0.1%.' },
  { step: '09', title: 'Lesson & Indexing', value: 'Regime confirmed: tech factor sensitivity to disinflation prints remains durable above 85%.' },
]

const HISTORICAL_MEMORIES = [
  {
    id: 'mem-2023',
    regime: '2023 Bank Liquidity Contraction',
    context: 'Deposit flight & discount window borrowing surge',
    lesson: 'Prioritized short-duration sovereign collateral over regional credit spreads.',
    matchScore: '94% Semantic Match',
  },
  {
    id: 'mem-2022',
    regime: '2022 Rapid Fed Tightening Cycle',
    context: 'Consecutive 75 bps rate hikes & term premia repricing',
    lesson: 'Short-duration value outperformed unprofitable growth regardless of trailing revenue growth.',
    matchScore: '89% Semantic Match',
  },
  {
    id: 'mem-2020',
    regime: '2020 Liquidity Crunch & Rebound',
    context: 'High-yield spread blowout followed by emergency central bank backstops',
    lesson: 'Central bank balance sheet expansion velocity signaled risk-on inflection before trailing earnings bottomed.',
    matchScore: '81% Semantic Match',
  },
]

export function DecisionMemory() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectedMemory, setSelectedMemory] = useState<string>('mem-2023')

  return (
    <section id="memory" className="py-20 sm:py-28 bg-neutral-950 text-white border-y border-neutral-800 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL MEMORY ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            A system that remembers why decisions were made.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
            In human organizations, institutional memory dissolves when key people leave. Dhanvi preserves
            the complete forensic context behind every hypothesis, risk calculation, and trade —
            building an immortal record of what was believed, why it happened, and what was learned.
          </p>
        </div>

        {/* The 9-Stage Decision Forensic Record */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              <FileCode className="w-4 h-4" />
              <span>FORENSIC DECISION TRACE — AUDIT RECORD #MEM-4892</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              Immutable Retrospective Log
            </span>
          </div>

          {/* Stepper nodes */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-6">
            {DECISION_STAGES.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'border-emerald-500 bg-emerald-950/60 text-white ring-1 ring-emerald-500/50'
                    : 'border-neutral-800/80 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold">{s.step}</div>
                <div className="text-xs font-semibold truncate mt-0.5">{s.title}</div>
              </button>
            ))}
          </div>

          {/* Active Stage Highlight */}
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-neutral-950/80">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Stage {DECISION_STAGES[activeStep].step} — {DECISION_STAGES[activeStep].title}
            </div>
            <div className="text-sm sm:text-base font-semibold text-neutral-100 mt-1">
              {DECISION_STAGES[activeStep].value}
            </div>
          </div>
        </div>

        {/* Retrospective Context Retrieval Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Historical Analogue Retrieval</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                When new market situations emerge, Dhanvi indexes prior episodes to retrieve relevant lessons.
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              Vector Context Search
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HISTORICAL_MEMORIES.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMemory(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMemory === item.id
                    ? 'border-emerald-500/60 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-emerald-400 font-semibold">{item.matchScore}</span>
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  </div>
                  <h4 className="font-bold text-sm text-white">{item.regime}</h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    <strong>Context:</strong> {item.context}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 text-xs text-neutral-300">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">
                    Lesson Retrieved:
                  </div>
                  <span>{item.lesson}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
