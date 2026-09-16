'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

const TELEMETRY_STATES = [
  {
    regime: 'Neutral dispersion',
    hypothesis: 'Cross-asset momentum divergence',
    riskCheck: 'Passed (VaR 1.2%)',
    activeAlpha: 'Strategy 01 & 03',
  },
  {
    regime: 'Macro rate pivot signal',
    hypothesis: 'Yield curve steepening impact on equities',
    riskCheck: 'Passed (Gross 142%)',
    activeAlpha: 'Strategy 03',
  },
  {
    regime: 'Volatility spike scenario',
    hypothesis: 'Liquidity withdrawal in small-cap factor',
    riskCheck: 'Drawdown limit verified',
    activeAlpha: 'Strategy 02 & N',
  },
]

export function Hero() {
  const [telemetryIndex, setTelemetryIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % TELEMETRY_STATES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const currentTelemetry = TELEMETRY_STATES[telemetryIndex]

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Asymmetric 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT 58%: Editorial Thesis & Positioning */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-xs font-medium tracking-wide text-[#9A9F9B]">
              Institutional investment intelligence
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-medium tracking-[-0.035em] text-[#F1F3EF] leading-[1.08]">
              Markets are complex.
              <br />
              <span className="text-[#9A9F9B]">Intelligence should be collaborative.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9A9F9B] leading-relaxed max-w-2xl font-normal">
              Dhanvi is building an AI-native investment intelligence system where specialized agents
              research markets, develop competing strategies, evaluate risk, and learn from outcomes.
            </p>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <EarlyAccessButton
                source="hero_primary"
                className="inline-flex items-center gap-2 rounded-md bg-[#10B981] px-5 py-3 text-xs sm:text-sm font-semibold text-[#080A09] transition-all hover:bg-[#059669] cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Join Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </EarlyAccessButton>

              <a
                href="#architecture"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#9A9F9B] hover:text-[#F1F3EF] transition-colors py-2"
              >
                <span>Explore the architecture</span>
                <span>↓</span>
              </a>
            </div>

            {/* Quiet Institutional Principles */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7A807B]">
              <span>Independent research agents</span>
              <span className="text-neutral-700">•</span>
              <span>Deterministic risk controls</span>
              <span className="text-neutral-700">•</span>
              <span>Continuous memory trace</span>
            </div>
          </div>

          {/* RIGHT 42%: Abstract Architecture Representation */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/[0.08] bg-[#111412] p-6 shadow-2xl relative overflow-hidden">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-5 text-[11px]">
                <span className="text-[#9A9F9B] font-medium">Architecture schematic</span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Telemetry active</span>
                </div>
              </div>

              {/* Schematic Flow: Nodes, Thin Hairline Lines, and Live States */}
              <div className="space-y-4">
                {/* Stage 1: Perception Layer */}
                <div className="p-3.5 rounded-lg border border-white/[0.05] bg-[#151816]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#F1F3EF] font-medium">Research Perception</span>
                    <span className="text-[11px] font-mono text-[#7A807B]">01 / 05</span>
                  </div>
                  <div className="text-xs text-[#9A9F9B] leading-relaxed">
                    6 concurrent agents ingest news, price microstructure, filings, macro yields, and sentiment.
                  </div>
                </div>

                {/* Hairline link */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-px h-5 bg-white/[0.1]" />
                </div>

                {/* Stage 2: Synthesis Core */}
                <div className="p-3.5 rounded-lg border border-white/[0.05] bg-[#151816]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#F1F3EF] font-medium">Intelligence Synthesis Core</span>
                    <span className="text-[11px] font-mono text-[#7A807B]">02 / 05</span>
                  </div>
                  <div className="text-xs text-[#9A9F9B] leading-relaxed">
                    Cross-signal reconciliation extracts consensus and formalizes verifiable market hypotheses.
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-[#10B981] truncate">
                    Active: {currentTelemetry.hypothesis}
                  </div>
                </div>

                {/* Hairline link */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-px h-5 bg-white/[0.1]" />
                </div>

                {/* Stage 3: Strategy Network & Risk Gate */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-white/[0.05] bg-[#151816]">
                    <div className="text-[11px] text-[#7A807B] font-mono">03 / Strategies</div>
                    <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Alpha Competition</div>
                    <div className="text-[11px] text-[#9A9F9B] mt-1 truncate">
                      {currentTelemetry.activeAlpha}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-white/[0.05] bg-[#151816]">
                    <div className="text-[11px] text-[#7A807B] font-mono">04 / Risk Gate</div>
                    <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Independent Controls</div>
                    <div className="text-[11px] text-[#10B981] font-mono mt-1 truncate">
                      {currentTelemetry.riskCheck}
                    </div>
                  </div>
                </div>

                {/* Hairline link */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-px h-5 bg-white/[0.1]" />
                </div>

                {/* Stage 5: Institutional Memory */}
                <div className="p-3.5 rounded-lg border border-white/[0.05] bg-[#151816]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#F1F3EF] font-medium">Institutional Memory Loop</span>
                    <span className="text-[11px] font-mono text-[#7A807B]">05 / 05</span>
                  </div>
                  <div className="text-xs text-[#9A9F9B]">
                    Every decision rationale, regime context, and attribution metric is archived for retrospective learning.
                  </div>
                </div>
              </div>

              {/* Bottom Micro-Bar */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#7A807B]">
                <span>Regime: {currentTelemetry.regime}</span>
                <span>Conceptual demonstration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
