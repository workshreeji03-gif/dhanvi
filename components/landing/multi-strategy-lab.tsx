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
    context: 'Orderly equity trends, normal credit spreads, and active market liquidity.',
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
  { name: 'Risk', desc: 'Value at Risk and Expected Shortfall limits bound maximum position sizing.' },
  { name: 'Correlation', desc: 'Cross-strategy covariance matrix dampens unintended factor concentration.' },
  { name: 'Liquidity', desc: 'Realistic exit horizons prevent outsized positions in fragile order books.' },
  { name: 'Drawdown', desc: 'Firm drawdown budgets trigger progressive, non-discretionary de-risking.' },
  { name: 'Regime', desc: 'Alphas are dynamically weighted by their suitability for the active environment.' },
  { name: 'Uncertainty', desc: 'Epistemic confidence metrics penalize hypotheses with insufficient precedent.' },
]

export function MultiStrategyLab() {
  const [activeRegimeKey, setActiveRegimeKey] = useState<string>('expansion')
  const currentRegime = REGIMES[activeRegimeKey]

  return (
    <section id="strategies" className="py-24 sm:py-32 border-t border-[#E4E8E4] bg-[#F7F9F7] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-[#5F665F] mb-3 tracking-wide uppercase">
              Strategy competition
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#111827] leading-[1.08]">
              Many hypotheses.
              <br />
              One portfolio.
            </h2>
            <p className="mt-4 text-base text-[#4B5563] leading-relaxed font-normal">
              Dhanvi simulates multiple independent strategies simultaneously. Competing alphas are
              continuously evaluated and dynamically weighted across shifting market regimes.
            </p>
          </div>

          {/* Regime Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-[#E4E8E4] bg-white text-xs shadow-xs">
            {Object.entries(REGIMES).map(([key, reg]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveRegimeKey(key)}
                className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer text-xs font-medium tracking-tight ${
                  activeRegimeKey === key
                    ? 'bg-[#111827] text-white font-semibold'
                    : 'text-[#5F665F] hover:text-[#111827]'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Strategy Visualization: Strategies Connected to Central Portfolio Node */}
        <div className="p-8 sm:p-12 rounded-xl border border-[#E4E8E4] bg-white mb-14 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono tabular-nums font-semibold tracking-wider text-[#10B981] uppercase">
              REGIME: {currentRegime.label}
            </span>
            <p className="mt-1 text-xs text-[#5F665F] font-normal">
              {currentRegime.context}
            </p>
          </div>

          {/* Grid of Strategy Concepts with Central Portfolio Hub */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {currentRegime.strategies.map((strat) => (
              <div
                key={strat.name}
                className="p-4 rounded-lg border border-[#E4E8E4] bg-[#F7F9F7] flex flex-col justify-between min-h-[120px] transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-[#111411] tracking-[-0.01em]">
                    {strat.name}
                  </div>
                  <div className="text-[11px] text-[#5F665F] font-medium mt-0.5">
                    {strat.category}
                  </div>
                  <div className="mt-2.5 w-full bg-[#E4E8E4] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((strat.weight / 35) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-[11px] text-[#8B928C] mt-3 leading-tight font-normal">
                  {strat.role}
                </div>
              </div>
            ))}
          </div>

          {/* Central Portfolio Allocation Convergence */}
          <div className="mt-8 pt-6 border-t border-[#E4E8E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-semibold text-[#111411] tracking-[-0.01em]">
                Central Portfolio Weighting
              </span>
              <span className="text-[#5F665F]">— dynamic multi-factor covariance</span>
            </div>
            <span className="font-mono tabular-nums text-[#8B928C] text-[11px]">
              * Illustrative strategy allocation model
            </span>
          </div>
        </div>

        {/* Capital Allocation Principles — Minimal Typographic List */}
        <div>
          <div className="text-base font-semibold text-[#111411] tracking-[-0.015em] mb-1.5">
            Capital allocation considers more than recent performance.
          </div>
          <div className="text-xs text-[#5F665F] mb-6 font-normal">
            Dhanvi weights capital according to fundamental portfolio construction principles:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ALLOCATION_PRINCIPLES.map((principle) => (
              <div
                key={principle.name}
                className="p-4 rounded-lg border border-[#E4E8E4] bg-white space-y-1.5 shadow-xs"
              >
                <div className="text-xs font-semibold text-[#111411] tracking-[-0.01em]">
                  {principle.name}
                </div>
                <div className="text-[11px] text-[#5F665F] leading-relaxed font-normal">
                  {principle.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
