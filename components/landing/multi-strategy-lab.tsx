'use client'

import React, { useState } from 'react'
import {
  BarChart2,
  TrendingUp,
  Activity,
  Sliders,
  ShieldCheck,
  Layers,
  Info,
  Shuffle,
  Percent,
} from 'lucide-react'

interface StrategyData {
  id: string
  name: string
  category: string
  status: 'Active' | 'Under-weight' | 'Over-weight' | 'Hedged'
  risk: string
  correlation: string
  confidence: string
  allocationPct: number
}

const REGIMES: Record<string, { label: string; description: string; strategies: StrategyData[] }> = {
  'risk-on': {
    label: 'Risk-On Expansion',
    description: 'Equities trending with healthy liquidity and low cross-asset volatility.',
    strategies: [
      { id: '1', name: 'Cross-Asset Momentum', category: 'Momentum', status: 'Over-weight', risk: 'Medium', correlation: '0.24', confidence: '92%', allocationPct: 28 },
      { id: '2', name: 'Quality Factor Growth', category: 'Factor', status: 'Active', risk: 'Low', correlation: '0.38', confidence: '88%', allocationPct: 22 },
      { id: '3', name: 'Statistical Mean Reversion', category: 'Statistical', status: 'Active', risk: 'Low', correlation: '-0.12', confidence: '84%', allocationPct: 18 },
      { id: '4', name: 'Earnings Catalyst Drift', category: 'Event Driven', status: 'Active', risk: 'Medium', correlation: '0.15', confidence: '81%', allocationPct: 14 },
      { id: '5', name: 'Macro Sovereign Rates', category: 'Macro', status: 'Under-weight', risk: 'Low', correlation: '-0.30', confidence: '76%', allocationPct: 10 },
      { id: '6', name: 'Tail Volatility Hedge', category: 'Volatility', status: 'Hedged', risk: 'High', correlation: '-0.68', confidence: '95%', allocationPct: 8 },
    ],
  },
  'vol-spike': {
    label: 'High Volatility Spike',
    description: 'Sudden VIX breakout with sharp equity drawdowns and elevated cross-asset correlation.',
    strategies: [
      { id: '6', name: 'Tail Volatility Hedge', category: 'Volatility', status: 'Over-weight', risk: 'High', correlation: '-0.82', confidence: '98%', allocationPct: 32 },
      { id: '5', name: 'Macro Sovereign Rates', category: 'Macro', status: 'Over-weight', risk: 'Low', correlation: '-0.55', confidence: '90%', allocationPct: 24 },
      { id: '3', name: 'Statistical Mean Reversion', category: 'Statistical', status: 'Active', risk: 'Medium', correlation: '-0.18', confidence: '86%', allocationPct: 18 },
      { id: '2', name: 'Quality Factor Growth', category: 'Factor', status: 'Under-weight', risk: 'Medium', correlation: '0.62', confidence: '72%', allocationPct: 12 },
      { id: '1', name: 'Cross-Asset Momentum', category: 'Momentum', status: 'Under-weight', risk: 'High', correlation: '0.74', confidence: '64%', allocationPct: 8 },
      { id: '4', name: 'Earnings Catalyst Drift', category: 'Event Driven', status: 'Hedged', risk: 'Medium', correlation: '0.42', confidence: '60%', allocationPct: 6 },
    ],
  },
  'rate-pivot': {
    label: 'Macro Rate Pivot',
    description: 'Central bank yield surprises triggering sovereign curve steepening and currency revaluation.',
    strategies: [
      { id: '5', name: 'Macro Sovereign Rates', category: 'Macro', status: 'Over-weight', risk: 'Medium', correlation: '-0.40', confidence: '94%', allocationPct: 30 },
      { id: '1', name: 'Cross-Asset Momentum', category: 'Momentum', status: 'Active', risk: 'Medium', correlation: '0.28', confidence: '85%', allocationPct: 20 },
      { id: '3', name: 'Statistical Mean Reversion', category: 'Statistical', status: 'Active', risk: 'Low', correlation: '-0.15', confidence: '82%', allocationPct: 18 },
      { id: '2', name: 'Quality Factor Growth', category: 'Factor', status: 'Active', risk: 'Low', correlation: '0.35', confidence: '80%', allocationPct: 14 },
      { id: '4', name: 'Earnings Catalyst Drift', category: 'Event Driven', status: 'Under-weight', risk: 'Medium', correlation: '0.22', confidence: '75%', allocationPct: 10 },
      { id: '6', name: 'Tail Volatility Hedge', category: 'Volatility', status: 'Hedged', risk: 'High', correlation: '-0.60', confidence: '88%', allocationPct: 8 },
    ],
  },
}

export function MultiStrategyLab() {
  const [selectedRegime, setSelectedRegime] = useState<string>('risk-on')
  const current = REGIMES[selectedRegime]

  return (
    <section id="strategies" className="py-20 sm:py-28 bg-white dark:bg-neutral-950 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-700/60 text-xs font-mono font-bold text-amber-800 dark:text-amber-300 mb-3">
              <span>SIMULATION / ILLUSTRATIVE DATA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Multi-Strategy Laboratory.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Dhanvi simulates multiple independent strategies simultaneously. Rather than selecting
              a single winning algorithm, capital allocation dynamically distributes risk budget
              across non-correlated signals based on current and emerging market regimes.
            </p>
          </div>

          {/* Regime Switcher */}
          <div className="p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-1">
            {Object.entries(REGIMES).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedRegime(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedRegime === key
                    ? 'bg-neutral-900 text-white shadow-xs dark:bg-emerald-600'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Regime Description Banner */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 mb-8 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Shuffle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-neutral-900 dark:text-white">Active Regime:</span>
            <span className="text-neutral-600 dark:text-neutral-400">{current.description}</span>
          </div>
          <span className="font-mono text-[11px] text-neutral-500 hidden sm:inline">
            Dynamic rebalancing active
          </span>
        </div>

        {/* Strategy Matrix Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.strategies.map((strat) => (
            <div
              key={strat.id}
              className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2 font-mono">
                  <span className="text-neutral-400 uppercase">{strat.category}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                      strat.status === 'Over-weight'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                        : strat.status === 'Hedged'
                        ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800'
                        : strat.status === 'Under-weight'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                        : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    {strat.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {strat.name}
                </h3>

                {/* Progress Allocation Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-neutral-500">Illustrative Allocation:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                      {strat.allocationPct}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${strat.allocationPct * 2.5}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono">
                  <div>
                    <div className="text-neutral-400">Risk Profile</div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {strat.risk}
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Correlation</div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {strat.correlation}
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Confidence</div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {strat.confidence}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Factor Allocation Principles Box */}
        <div className="mt-10 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Why Capital Allocation Considers More Than Recent Performance</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            In quantitative finance, optimizing strictly for recent returns invariably induces overfitting.
            Dhanvi’s portfolio allocation algorithms evaluate multi-dimensional parameters including:{' '}
            <strong className="text-neutral-900 dark:text-white">marginal risk contribution</strong>,{' '}
            <strong className="text-neutral-900 dark:text-white">pairwise correlation matrices</strong>,{' '}
            <strong className="text-neutral-900 dark:text-white">bid-ask liquidity depth</strong>,{' '}
            <strong className="text-neutral-900 dark:text-white">worst-case drawdown budgets</strong>,{' '}
            <strong className="text-neutral-900 dark:text-white">macro regime transitions</strong>,{' '}
            <strong className="text-neutral-900 dark:text-white">transaction slippage costs</strong>, and{' '}
            <strong className="text-neutral-900 dark:text-white">model parameter uncertainty</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}
