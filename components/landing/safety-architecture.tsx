'use client'

import React from 'react'

const HIERARCHY_STEPS = [
  {
    tier: '01',
    title: 'Research Intelligence Layer',
    description: 'Concurrent agents formulate market perceptions and factor observations.',
    governance: 'Unrestricted perception',
  },
  {
    tier: '02',
    title: 'Strategy Formulation Layer',
    description: 'Specialized models construct parameterized alpha candidates and hypotheses.',
    governance: 'Simulated candidates only',
  },
  {
    tier: '03',
    title: 'Portfolio Optimization Layer',
    description: 'Calculates cross-asset correlation, diversification benefit, and capital sizing.',
    governance: 'Mathematical sizing bounds',
  },
  {
    tier: '04',
    title: 'Independent Risk Engine',
    description: 'Deterministic software firewall enforcing hard constraints outside agent reasoning.',
    governance: 'Hard programmatic veto',
    isFirewall: true,
  },
  {
    tier: '05',
    title: 'Execution Infrastructure',
    description: 'Routes approved orders to dark liquidity venues and smart algorithmic brokers.',
    governance: 'Hardware execution checks',
  },
]

const RISK_CONTROLS = [
  {
    rule: 'Max 5.0% NAV single asset',
    title: 'Position Limits',
    description: 'Prevents single-name idiosyncratic exposure from disproportionately impacting total portfolio value.',
  },
  {
    rule: 'Max 150% Gross, 30% Net',
    title: 'Exposure Bounds',
    description: 'Enforces strict systemic limits on leverage and directional market beta, regardless of agent conviction.',
  },
  {
    rule: '3.0% trailing circuit breaker',
    title: 'Drawdown Protections',
    description: 'Deterministic automated de-risking when trailing portfolio drawdown touches predetermined bounds.',
  },
  {
    rule: 'Max 10% ADV participation',
    title: 'Liquidity Capacity',
    description: 'Ensures no transaction creates market impact beyond strict thresholds; mandates orderly liquidations.',
  },
  {
    rule: 'Spread > 15 bps lock-out',
    title: 'Execution Safeguards',
    description: 'Locks out execution during uncharacteristic spread widening or extreme microstructure illiquidity.',
  },
  {
    rule: 'Multi-sig authorization',
    title: 'Human Oversight',
    description: 'Requires human sign-off for large re-allocations or non-standard asset onboarding outside normal bands.',
  },
  {
    rule: 'Instant zero-state liquidation',
    title: 'Hardware Kill Switch',
    description: 'An independent manual and automated kill switch that cancels pending orders and flattens positions immediately.',
  },
]

export function SafetyArchitecture() {
  return (
    <section className="py-28 sm:py-36 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs font-medium text-[#9A9F9B] mb-3">
            Deterministic risk governance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-[1.12]">
            Autonomous intelligence does not mean
            <br />
            unrestricted control.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9A9F9B] leading-relaxed">
            In financial systems, machine learning models cannot be allowed to alter their own safety
            boundaries. Dhanvi isolates risk management in a separate, deterministic software layer
            outside agent reasoning — enforcing hard rules that AI cannot override or negotiate away.
          </p>
        </div>

        {/* 5-Tier Decision Governance Hierarchy */}
        <div className="mb-16">
          <div className="text-xs font-medium text-[#7A807B] mb-4">
            Five-tier governance hierarchy
          </div>

          <div className="border border-white/[0.08] rounded-xl bg-[#111412] divide-y divide-white/[0.06] overflow-hidden">
            {HIERARCHY_STEPS.map((h) => (
              <div
                key={h.tier}
                className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  h.isFirewall ? 'bg-[#151816]' : ''
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${
                      h.isFirewall
                        ? 'bg-[#10B981]/15 text-[#10B981] font-semibold'
                        : 'text-[#7A807B] bg-white/[0.04]'
                    }`}
                  >
                    Tier {h.tier}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-[#F1F3EF]">
                      {h.title}
                      {h.isFirewall && (
                        <span className="ml-2 text-[11px] font-mono text-[#10B981]">
                          — Programmatic Firewall
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#9A9F9B] mt-0.5">{h.description}</div>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#7A807B] md:text-right shrink-0">
                  {h.governance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Independent Risk Controls Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-medium text-[#7A807B]">
              Independent risk safeguards
            </div>
            <span className="text-[11px] font-mono text-[#7A807B]">
              Deterministic software bounds
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {RISK_CONTROLS.map((ctrl) => (
              <div
                key={ctrl.title}
                className="p-5 rounded-xl border border-white/[0.08] bg-[#111412] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#10B981] font-medium mb-2">
                    {ctrl.rule}
                  </div>
                  <h3 className="text-sm font-medium text-[#F1F3EF]">{ctrl.title}</h3>
                  <p className="mt-2 text-xs text-[#9A9F9B] leading-relaxed">
                    {ctrl.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-[#7A807B]">
                  Hard constraint
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
