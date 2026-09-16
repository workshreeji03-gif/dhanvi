'use client'

import React, { useState } from 'react'
import { ArrowRight, Clock, Database, FileText, CheckCircle2 } from 'lucide-react'

interface JourneyStep {
  time: string
  title: string
  detail: string
  context: {
    agent: string
    telemetry: string
    signal: string
  }
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    time: '09:41:07',
    title: 'Event detected',
    detail: 'Semiconductor capital equipment export policy revision published; cross-source verification confirms authenticity across primary regulatory feeds.',
    context: {
      agent: 'News & Event Intelligence',
      telemetry: 'Parsed 34 releases in 180ms',
      signal: 'High-conviction regulatory catalyst',
    },
  },
  {
    time: '09:41:11',
    title: 'Company exposure identified',
    detail: 'Dhanvi supply chain ontology maps revenue dependency across 42 equipment suppliers; tier-1 component bottleneck identified with direct supplier linkages.',
    context: {
      agent: 'Company Intelligence',
      telemetry: 'Entity resolution graph traversal',
      signal: '14 affected constituents in coverage',
    },
  },
  {
    time: '09:41:14',
    title: 'Three competing hypotheses generated',
    detail: 'Strategy agents independently formulate candidate reactions: CapEx contraction rotation, dispersion hedge, and supply-chain substitution pair.',
    context: {
      agent: 'Multi-Strategy Network',
      telemetry: '3 candidate alphas formulated',
      signal: 'Dispersion pair selected via Sharpe simulation',
    },
  },
  {
    time: '09:41:19',
    title: 'Risk relationships evaluated',
    detail: 'Deterministic risk engine checks cross-asset factor correlation, portfolio beta ceiling (<0.25), and 10-day market liquidity depth before approval.',
    context: {
      agent: 'Independent Risk Engine',
      telemetry: 'Stress-tested across 4 past shocks',
      signal: 'Approved with 3.2% NAV sizing ceiling',
    },
  },
  {
    time: '09:41:26',
    title: 'Action executed & logged',
    detail: 'Order packet smart-routed across dark liquidity venues with 1.1 bps realized slippage; full execution telemetry preserved in forensic trace.',
    context: {
      agent: 'Execution Infrastructure',
      telemetry: 'Smart-routed in 3 algorithmic tranches',
      signal: 'Zero market impact footprint',
    },
  },
  {
    time: 'Day +14',
    title: 'Outcome observed & attributed',
    detail: '+2.6% selection alpha realized over the holding horizon; factor residual analysis confirms thesis accuracy with minimal market beta contamination.',
    context: {
      agent: 'Attribution Engine',
      telemetry: 'Selection alpha: +2.6% | Beta drag: -0.2%',
      signal: 'Thesis validated within 1-sigma bounds',
    },
  },
  {
    time: 'Archive',
    title: 'Decision permanently indexed',
    detail: 'The complete belief state, market snapshot, causal graph, and attribution metrics are indexed into Dhanvi’s immutable vector memory ledger.',
    context: {
      agent: 'Memory Engine',
      telemetry: 'Record #MEM-4892 sealed',
      signal: 'Indexed across 7 factor dimensions',
    },
  },
]

export function DecisionMemory() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const activeStep = JOURNEY_STEPS[activeStepIndex]

  return (
    <section id="memory" className="py-28 sm:py-36 border-t border-white/[0.06] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs font-medium text-[#9A9F9B] mb-3">
            Institutional memory engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-[1.12]">
            Markets forget nothing.
            <br />
            Neither should the system.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9A9F9B] leading-relaxed">
            In human organizations, institutional memory dissolves when key people leave. Dhanvi
            preserves the complete forensic context behind every hypothesis, risk calculation, and
            trade — creating an immortal record of what was believed, why it happened, and what was learned.
          </p>
        </div>

        {/* ONE Concrete Forensic Decision Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Journey Timeline Stepper */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-medium text-[#7A807B] mb-2 flex items-center justify-between">
              <span>Decision journey — Case #MEM-4892</span>
              <span className="font-mono text-[11px]">Click a step to inspect context</span>
            </div>

            <div className="border border-white/[0.08] rounded-xl bg-[#111412] divide-y divide-white/[0.06] overflow-hidden">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full p-4 sm:p-5 text-left transition-colors flex items-start gap-4 cursor-pointer ${
                      isActive ? 'bg-[#151816]' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Timestamp */}
                    <div className="w-18 shrink-0 pt-0.5">
                      <span
                        className={`text-xs font-mono font-medium ${
                          isActive ? 'text-[#10B981]' : 'text-[#7A807B]'
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>

                    {/* Step Title & Detail */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`text-sm font-medium ${
                            isActive ? 'text-[#F1F3EF]' : 'text-[#9A9F9B]'
                          }`}
                        >
                          {step.title}
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#7A807B] leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {step.detail}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Step Deep-Dive & Subtle Memory Connection */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Step Telemetry Card */}
            <div className="border border-white/[0.08] rounded-xl bg-[#111412] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                <span className="text-[#9A9F9B] font-medium">Step context snapshot</span>
                <span className="font-mono text-[#10B981] text-[11px]">{activeStep.time}</span>
              </div>

              <div>
                <div className="text-xs text-[#7A807B]">Originating agent</div>
                <div className="text-sm font-medium text-[#F1F3EF] mt-0.5">
                  {activeStep.context.agent}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#7A807B]">Diagnostic telemetry</div>
                <div className="text-xs font-mono text-[#9A9F9B] mt-1 p-2.5 rounded bg-[#0C0F0D] border border-white/[0.04]">
                  {activeStep.context.telemetry}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#7A807B]">Synthesized signal</div>
                <div className="text-xs text-[#F1F3EF] mt-1 font-medium">
                  {activeStep.context.signal}
                </div>
              </div>
            </div>

            {/* Subtle Connection: Retrieved 184 Days Later */}
            <div className="border border-white/[0.08] rounded-xl bg-[#0C0F0D] p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>RETRIEVED 184 DAYS LATER</span>
              </div>

              <div className="text-sm font-medium text-[#F1F3EF] leading-snug">
                Similar market environment detected
              </div>

              <p className="mt-2.5 text-xs text-[#9A9F9B] leading-relaxed">
                When semiconductor supply-chain bottleneck constraints and rate sensitivity re-emerged
                6 months later, Dhanvi’s vector retrieval surfaced this exact decision trace with 92%
                semantic alignment — preventing recency bias and accelerating parameter calibration.
              </p>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#7A807B]">
                <span>Retrieved: #MEM-4892</span>
                <span className="text-[#10B981]">92% Match</span>
              </div>
            </div>

            {/* Illustrative disclaimer */}
            <div className="text-[11px] text-[#7A807B] font-mono">
              * Illustrative decision journey and retrospective trace.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
