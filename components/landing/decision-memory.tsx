'use client'

import React, { useState } from 'react'
import { Clock } from 'lucide-react'

const TIMELINE_STEPS = [
  {
    time: '09:41',
    title: 'Market event detected',
    description: 'Semiconductor capital equipment export policy revision published; cross-source verification confirms authenticity across primary regulatory feeds.',
    detail: 'Parsed 34 regulatory releases in 180ms · High-conviction regulatory catalyst',
  },
  {
    time: '09:42',
    title: 'Relevant companies identified',
    description: 'Dhanvi supply chain ontology maps revenue exposure across 42 equipment suppliers; tier-1 component bottleneck identified with direct supplier linkages.',
    detail: 'Entity resolution graph traversal · 14 affected constituents in active coverage',
  },
  {
    time: '09:44',
    title: 'Competing hypotheses generated',
    description: 'Strategy agents independently formulate candidate reactions: CapEx contraction rotation, dispersion hedge, and supply-chain substitution pair.',
    detail: '3 candidate alphas formulated · Dispersion pair selected via Sharpe simulation',
  },
  {
    time: '09:46',
    title: 'Risk relationships evaluated',
    detail: 'Stress-tested across 4 past shock episodes · Approved with 3.2% NAV sizing ceiling',
    description: 'Deterministic risk engine checks cross-asset factor correlation, portfolio beta ceiling (<0.25), and 10-day market liquidity depth before approval.',
  },
  {
    time: 'Later',
    title: 'Outcome observed',
    description: '+2.6% selection alpha realized over the holding horizon; factor residual analysis confirms thesis accuracy with minimal market beta contamination.',
    detail: 'Selection alpha: +2.6% | Beta drag: -0.2% · Validated within 1-sigma bounds',
  },
  {
    time: 'Memory',
    title: 'Decision context archived',
    description: 'The complete belief state, market snapshot, causal graph, and attribution metrics are indexed into Dhanvi’s immutable vector memory ledger.',
    detail: 'Record #MEM-4892 sealed · Indexed across 7 factor dimensions',
  },
]

export function DecisionMemory() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="memory" className="py-24 sm:py-32 border-t border-[#E5E8E5] bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-normal text-[#606660] mb-3">
            Institutional Memory Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#101310] leading-tight">
            A system that remembers
            <br />
            why decisions were made.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#606660] leading-relaxed">
            In human organizations, institutional memory dissolves when key people leave. Dhanvi
            preserves the complete forensic context behind every hypothesis, risk calculation, and
            trade — creating a permanent record of what was believed, why it happened, and what was learned.
          </p>
        </div>

        {/* Vertical Timeline & Memory Retrieval Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT 7 cols: Clean Vertical Timeline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-normal text-[#929892] mb-2 flex items-center justify-between">
              <span>Decision journey — Forensic Case #MEM-4892</span>
              <span className="font-mono text-[11px]">Click a step to inspect context</span>
            </div>

            <div className="border border-[#E5E8E5] rounded-xl bg-white divide-y divide-[#E5E8E5] overflow-hidden">
              {TIMELINE_STEPS.map((step, idx) => {
                const isActive = activeStep === idx
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full p-4 sm:p-5 text-left transition-colors flex items-start gap-4 cursor-pointer ${
                      isActive ? 'bg-[#F7F8F6]' : 'hover:bg-[#FAFAFA]'
                    }`}
                  >
                    {/* Timestamp Pill */}
                    <div className="w-16 shrink-0 pt-0.5">
                      <span
                        className={`text-xs font-mono font-medium ${
                          isActive ? 'text-[#10B981]' : 'text-[#606660]'
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`text-sm font-medium ${
                            isActive ? 'text-[#101310]' : 'text-[#606660]'
                          }`}
                        >
                          {step.title}
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#606660] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT 5 cols: Telemetry Context & Retrieved When Similar Conditions Appear */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step Diagnostic Snapshot */}
            <div className="border border-[#E5E8E5] rounded-xl bg-[#F7F8F6] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E8E5] pb-3 text-xs">
                <span className="text-[#101310] font-medium">Captured Step Context</span>
                <span className="font-mono text-[#10B981] text-[11px]">{TIMELINE_STEPS[activeStep].time}</span>
              </div>

              <div>
                <div className="text-xs text-[#929892]">Selected milestone</div>
                <div className="text-sm font-medium text-[#101310] mt-0.5">
                  {TIMELINE_STEPS[activeStep].title}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#929892]">Forensic telemetry detail</div>
                <div className="text-xs text-[#606660] mt-1 p-3 rounded-lg bg-white border border-[#E5E8E5] leading-relaxed">
                  {TIMELINE_STEPS[activeStep].detail}
                </div>
              </div>
            </div>

            {/* Visual Link: Retrieved when similar conditions appear again */}
            <div className="border border-[#E5E8E5] rounded-xl bg-white p-6 relative">
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] mb-2 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>RETRIEVED 184 DAYS LATER</span>
              </div>

              <div className="text-sm font-medium text-[#101310]">
                Retrieved when similar conditions appear again
              </div>

              <p className="mt-2 text-xs text-[#606660] leading-relaxed">
                When semiconductor supply-chain bottleneck constraints and rate sensitivity re-emerged
                6 months later, Dhanvi’s vector retrieval surfaced this exact decision trace with 92%
                semantic alignment — preventing recency bias and accelerating parameter calibration.
              </p>

              <div className="mt-4 pt-3 border-t border-[#E5E8E5] flex items-center justify-between text-[11px] text-[#929892]">
                <span>Retrieved: #MEM-4892</span>
                <span className="font-mono text-[#10B981] font-semibold">92% Semantic Match</span>
              </div>
            </div>

            <div className="text-[11px] text-[#929892]">
              * Illustrative decision journey and retrospective trace.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
