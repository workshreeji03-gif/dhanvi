'use client'

import React, { useState } from 'react'
import {
  Users,
  Cpu,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  GitFork,
  Clock,
  Shuffle,
  ShieldCheck,
} from 'lucide-react'

const TRADITIONAL_FUNCTIONS = [
  {
    title: 'Market Research',
    desc: 'Monitoring global asset classes, correlations, liquidity shifts, and order book dynamics.',
    friction: 'Human latency across thousands of concurrent instruments.',
  },
  {
    title: 'Company Research',
    desc: 'Reading quarterly 10-K/10-Q filings, transcripts, guidance changes, and supply chains.',
    friction: 'Cognitive bottlenecks reading tens of thousands of pages.',
  },
  {
    title: 'Macro Research',
    desc: 'Interpreting central bank commentary, yield curve dynamics, inflation, and fiscal policies.',
    friction: 'Siloed assumptions disconnected from micro equity models.',
  },
  {
    title: 'Quantitative Research',
    desc: 'Designing mathematical factor models, alpha signals, and backtesting hypotheses.',
    friction: 'Overfitting risk and slow manual iteration cycles.',
  },
  {
    title: 'Portfolio Management',
    desc: 'Deciding capital allocation across competing ideas, thesis weights, and horizon mandates.',
    friction: 'Emotional conviction bias and recency heuristic.',
  },
  {
    title: 'Risk Management',
    desc: 'Enforcing VaR limits, scenario stress-testing, factor concentration, and tail hedges.',
    friction: 'Often reactive after regime shifts or volatility spikes.',
  },
  {
    title: 'Execution Intelligence',
    desc: 'Timing orders, minimizing market impact, algorithmic routing, and dark pool crossing.',
    friction: 'Manual trade desk execution slippage.',
  },
  {
    title: 'Performance & Attribution',
    desc: 'Deconstructing returns: asset selection vs. factor exposure vs. pure execution skill.',
    friction: 'Loss of decision context — remembering whether a trade won, but forgetting why.',
  },
]

export function ProblemSection() {
  const [activeTab, setActiveTab] = useState<'traditional' | 'dhanvi'>('traditional')

  return (
    <section className="py-20 sm:py-28 bg-neutral-50/50 dark:bg-neutral-900/30 border-y border-neutral-200/80 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-3">
            <span>THE STRUCTURAL PARADIGM SHIFT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Investment institutions traditionally require dozens of siloed specialized functions.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            In traditional asset management, specialized teams operate in separate silos — passing
            notes, models, and briefs across organizational boundaries with inevitable latency.
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800 flex items-center gap-1 border border-neutral-300/80 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setActiveTab('traditional')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'traditional'
                  ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-950 dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950'
              }`}
            >
              Traditional Institutional Structure
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dhanvi')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dhanvi'
                  ? 'bg-neutral-950 text-white shadow-xs dark:bg-emerald-600 dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950'
              }`}
            >
              Software-Native Multi-Agent System
            </button>
          </div>
        </div>

        {/* Grid of Functions or Paradigm View */}
        {activeTab === 'traditional' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {TRADITIONAL_FUNCTIONS.map((item, idx) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span>FUNCTION #{String(idx + 1).padStart(2, '0')}</span>
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-start gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{item.friction}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 bg-neutral-950 text-white p-6 sm:p-10 shadow-xl animate-fade-in">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>WHAT HAPPENS WHEN INTELLIGENCE BECOMES SOFTWARE-NATIVE?</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Introducing Dhanvi: Collaborative Multi-Agent Intelligence
              </h3>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Instead of isolated teams waiting on quarterly memos, specialized AI agents
                interrogate data streams in parallel. Hypotheses are debated computationally, risk
                constraints are applied unconditionally outside agent reasoning, and every decision
                is permanently stored in an institutional memory engine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono mb-1">
                    <Clock className="w-4 h-4" />
                    <span>ZERO SYNTHESIS DELAY</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Macro, filing, and tick changes are synthesized immediately across all strategies.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono mb-1">
                    <Shuffle className="w-4 h-4" />
                    <span>CONTINUOUS COMPETITION</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Competing strategies challenge each other’s assumptions before capital is allocated.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>UNCONDITIONAL SAFETY</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Independent risk firewalls govern maximum drawdowns and leverage automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
