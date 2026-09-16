'use client'

import React from 'react'
import {
  ShieldAlert,
  Lock,
  StopCircle,
  TrendingDown,
  Gauge,
  Sliders,
  UserCheck,
  AlertOctagon,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react'

const SAFETY_CONTROLS = [
  {
    title: 'Position Limits',
    rule: 'Max 5.0% NAV single asset',
    desc: 'Prevents single-name idiosyncratic exposure from disproportionately impacting total portfolio value.',
    icon: Sliders,
  },
  {
    title: 'Gross & Net Exposure Limits',
    rule: 'Max 150% Gross, 30% Net',
    desc: 'Enforces strict systemic limits on leverage and directional market beta, regardless of agent confidence.',
    icon: Gauge,
  },
  {
    title: 'Max Drawdown Controls',
    rule: '3.0% trailing circuit breaker',
    desc: 'Deterministic automated de-risking when trailing portfolio drawdown touches predetermined bounds.',
    icon: TrendingDown,
  },
  {
    title: 'Liquidity Constraints',
    rule: 'Max 10% daily volume participation',
    desc: 'Ensures no trade creates market impact beyond allowed thresholds; mandates orderly liquidations.',
    icon: Lock,
  },
  {
    title: 'Execution Restrictions',
    rule: 'Spread > 15 bps lock-out',
    desc: 'Locks out execution during uncharacteristic bid-ask spread expansions or extreme illiquidity events.',
    icon: AlertOctagon,
  },
  {
    title: 'Human Authorization Thresholds',
    rule: 'Multi-sig above $250k rebalancing',
    desc: 'Mandates institutional human sign-off for large re-allocations or non-standard asset onboarding.',
    icon: UserCheck,
  },
  {
    title: 'Emergency Kill Switch',
    rule: 'Instant zero-state liquidation',
    desc: 'Hardware-independent panic kill switch that cancels pending orders and flattens exposure immediately.',
    icon: StopCircle,
  },
]

const HIERARCHY_STEPS = [
  { step: '01', title: 'AI Intelligence Layer', role: 'Formulates multi-modal market perceptions and hypotheses.' },
  { step: '02', title: 'Strategy Generation Layer', role: 'Constructs parameterized strategies and risk-seeking alphas.' },
  { step: '03', title: 'Portfolio Optimization Layer', role: 'Calculates cross-asset correlation & capital weighting.' },
  { step: '04', title: 'Independent Risk Controls', role: 'Deterministic firewall enforcing non-negotiable safety rules outside agent control.' },
  { step: '05', title: 'Execution Infrastructure', role: 'Translates approved orders into smart-routed execution packets.' },
]

export function SafetyArchitecture() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs font-mono font-semibold text-amber-800 dark:text-amber-400 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>DETERMINISTIC SAFETY & GOVERNANCE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Autonomous intelligence does not mean unrestricted control.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            In financial systems, machine learning agents cannot be allowed to alter their own safety
            boundaries. Dhanvi isolates risk management in a separate, deterministic software layer
            outside agent reasoning — enforcing hard rules that AI cannot override or negotiate away.
          </p>
        </div>

        {/* 5-Layer Governance Hierarchy */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Five-Tier Decision Governance Hierarchy
          </div>

          <div className="flex flex-col gap-3">
            {HIERARCHY_STEPS.map((h, idx) => (
              <div
                key={h.step}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  idx === 3
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      idx === 3 ? 'bg-amber-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    Tier {h.step}
                  </span>
                  <span className="font-bold text-sm sm:text-base">{h.title}</span>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-right max-w-md">
                  {h.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The 7 Independent Risk Controls */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Hard Risk Control Safeguards
            </h3>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              Deterministic Software Rules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SAFETY_CONTROLS.map((ctrl) => {
              const Icon = ctrl.icon
              return (
                <div
                  key={ctrl.title}
                  className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs hover:border-amber-400/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        Enforced
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                      {ctrl.title}
                    </h4>
                    <div className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold mt-1">
                      {ctrl.rule}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                      {ctrl.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
