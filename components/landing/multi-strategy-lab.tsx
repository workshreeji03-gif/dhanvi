'use client'

import React, { useState } from 'react'

interface StrategyNode {
  name: string
  category: string
  role: string
  weight: number
}

const REGIMES: Record<string, { label: string; context: string; strategies: StrategyNode[] }> = {
  expansion: {
    label: 'Expansion regime',
    context: 'Orderly equity trends, normal credit spreads, and active liquidity.',
    strategies: [
      { name: 'Momentum', category: 'Trend', role: 'Cross-asset directional drift', weight: 26 },
      { name: 'Fundamental', category: 'Quality', role: 'Earnings durability & moat health', weight: 22 },
      { name: 'Statistical', category: 'Mean Reversion', role: 'Pair spread mean-reversion', weight: 18 },
      { name: 'Event', category: 'Catalyst', role: 'Pre/post earnings catalyst drift', weight: 14 },
      { name: 'Macro', category: 'Rates', role: 'Sovereign curve steepening', weight: 12 },
      { name: 'Volatility', category: 'Convexity', role: 'Tail risk insurance', weight: 8 },
    ],
  },
  volatility: {
    label: 'Volatility shock',
    context: 'Rapid VIX breakout, liquidity contraction, and elevated cross-asset correlation.',
    strategies: [
      { name: 'Volatility', category: 'Convexity', role: 'Convex tail risk payoff', weight: 32 },
      { name: 'Macro', category: 'Rates', role: 'Flight-to-quality sovereign debt', weight: 24 },
      { name: 'Statistical', category: 'Mean Reversion', role: 'Liquidity shock mean-reversion', weight: 16 },
      { name: 'Fundamental', category: 'Quality', role: 'Cash flow balance sheet defense', weight: 12 },
      { name: 'Event', category: 'Catalyst', role: 'Hedged special situations', weight: 8 },
      { name: 'Momentum', category: 'Trend', role: 'De-leveraged trend reduction', weight: 8 },
    ],
  },
  ratePivot: {
    label: 'Rate transition',
    context: 'Central-bank terminal rate recalibration, curve twists, and FX realignment.',
    strategies: [
      { name: 'Macro', category: 'Rates', role: 'Monetary policy impulse capture', weight: 30 },
      { name: 'Momentum', category: 'Trend', role: 'Currency & commodity trends', weight: 20 },
      { name: 'Statistical', category: 'Mean Reversion', role: 'Cross-currency spread arb', weight: 18 },
      { name: 'Fundamental', category: 'Quality', role: 'Rate-sensitive debt screening', weight: 14 },
      { name: 'Event', category: 'Catalyst', role: 'Policy decision scenario trading', weight: 10 },
      { name: 'Volatility', category: 'Convexity', role: 'Duration hedging', weight: 8 },
    ],
  },
}

const ALLOCATION_PRINCIPLES = [
  {
    name: 'Risk',
    desc: 'Value at Risk and Expected Shortfall limits bound maximum position sizing.',
  },
  {
    name: 'Correlation',
    desc: 'Cross-strategy covariance matrix dampens unintended factor concentration.',
  },
  {
    name: 'Liquidity',
    desc: 'Realistic exit horizons prevent outsized positions in fragile order books.',
  },
  {
    name: 'Drawdown',
    desc: 'Firm drawdown budgets trigger progressive, non-discretionary de-risking.',
  },
  {
    name: 'Regime',
    desc: 'Alphas are dynamically weighted by their suitability for the active environment.',
  },
  {
    name: 'Uncertainty',
    desc: 'Epistemic confidence metrics penalize hypotheses with insufficient precedent.',
  },
]

export function MultiStrategyLab() {
  const [activeRegimeKey, setActiveRegimeKey] = useState<string>('expansion')
  const currentRegime = REGIMES[activeRegimeKey]

  return (
    <section id="strategies" className="py-24 sm:py-32 border-t border-white/[0.06] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-[#9A9F9B] mb-3">
              Strategy competition
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-tight">
              Many hypotheses.
              <br />
              One portfolio.
            </h2>
            <p className="mt-4 text-base text-[#9A9F9B] leading-relaxed">
              Dhanvi simulates multiple independent strategies simultaneously. Competing alphas are
              continuously evaluated and dynamically weighted across shifting market regimes.
            </p>
          </div>

          {/* Regime Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-lg border border-white/[0.08] bg-[#111412] self-start md:self-end">
            {Object.entries(REGIMES).map(([key, regime]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveRegimeKey(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeRegimeKey === key
                    ? 'bg-[#151816] text-[#F1F3EF] border border-white/[0.08]'
                    : 'text-[#9A9F9B] hover:text-[#F1F3EF]'
                }`}
              >
                {regime.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Strategy Representation */}
        <div className="p-6 sm:p-10 rounded-xl border border-white/[0.08] bg-[#111412] mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-8 text-xs">
            <div className="text-[#9A9F9B]">
              Active regime: <span className="text-[#F1F3EF] font-medium">{currentRegime.label}</span>
            </div>
            <div className="text-[11px] font-mono text-[#7A807B]">
              Simulated alpha distribution • Illustrative
            </div>
          </div>

          {/* 6 Spatial Strategy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentRegime.strategies.map((strat) => (
              <div
                key={strat.name}
                className="p-5 rounded-lg border border-white/[0.06] bg-[#151816] transition-all hover:border-white/[0.12]"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7A807B] mb-2">
                  <span>{strat.category}</span>
                  <span className="text-[#10B981] font-semibold">{strat.weight}% weight</span>
                </div>
                <div className="text-base font-medium text-[#F1F3EF] mb-1">
                  {strat.name}
                </div>
                <div className="text-xs text-[#9A9F9B] leading-relaxed">
                  {strat.role}
                </div>

                {/* Subtle visual weight indicator */}
                <div className="mt-4 w-full bg-white/[0.06] h-[2px] rounded-full overflow-hidden">
                  <div
                    className="bg-[#10B981] h-full transition-all duration-500"
                    style={{ width: `${strat.weight * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-[#7A807B] leading-relaxed">
            {currentRegime.context}
          </div>
        </div>

        {/* Capital Allocation Editorial Principles */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-mono text-[#10B981] mb-2">
              GOVERNANCE PRINCIPLE
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#F1F3EF] tracking-tight">
              Capital is not allocated based on performance alone.
            </h3>
            <p className="text-sm text-[#9A9F9B] mt-2 leading-relaxed">
              Past returns are an unreliable guide to future covariance. Dhanvi weights strategies
              through multi-factor portfolio construction constraints.
            </p>
          </div>

          {/* Editorial Annotations Grid (6 Principles) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {ALLOCATION_PRINCIPLES.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="text-sm font-medium text-[#F1F3EF]">
                  {item.name}
                </div>
                <p className="text-xs text-[#9A9F9B] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
