'use client'

import React from 'react'

export function ProblemSection() {
  return (
    <section id="research" className="py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-medium text-[#9A9F9B] mb-3">
            The structural problem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-tight">
            Institutional asset management was designed around human bottlenecks.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9A9F9B] leading-relaxed">
            Specialized teams traditionally operate in separate functional silos — passing memos,
            spreadsheets, and delayed models across organizational boundaries with inevitable friction.
          </p>
        </div>

        {/* 12-Column Asymmetric Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-6 border-t border-white/[0.06]">
          {/* Left Column (5 cols): The Traditional Model */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-[#7A807B]">
              TRADITIONAL ARCHITECTURE
            </div>
            <h3 className="text-xl font-medium text-[#F1F3EF]">
              Siloed analysis & sequential latency
            </h3>
            <p className="text-sm text-[#9A9F9B] leading-relaxed">
              When research is fragmented, macro assumptions diverge from company models, and trade
              ideas wait for weekly allocation meetings.
            </p>

            <ul className="space-y-4 pt-2 text-xs text-[#9A9F9B]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#F1F3EF] font-medium">Cognitive limits:</strong> Human analysts cannot parse thousands of global SEC filings, earnings calls, and tick streams in parallel.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#F1F3EF] font-medium">Context loss:</strong> When positions are closed, the original hypothesis, market regime context, and attribution details are rarely codified.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#F1F3EF] font-medium">Reactive risk:</strong> Human risk committees frequently adjust exposures after market volatility spikes have already occurred.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column (7 cols): The Dhanvi Multi-Agent Shift */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/[0.06]">
            <div className="text-xs font-mono text-[#10B981]">
              DHANVI SPECIFICATION
            </div>
            <h3 className="text-xl font-medium text-[#F1F3EF]">
              Software-native collaborative intelligence
            </h3>
            <p className="text-sm text-[#9A9F9B] leading-relaxed">
              Instead of isolated teams waiting on quarterly memos, specialized autonomous agents
              interrogate data streams concurrently, synthesize consensus, and formulate testable strategies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
                <div className="text-xs font-medium text-[#F1F3EF] mb-1">
                  Concurrent Perception
                </div>
                <div className="text-xs text-[#9A9F9B] leading-relaxed">
                  News, microstructure, fundamentals, macro yields, and sentiment are processed simultaneously.
                </div>
              </div>

              <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
                <div className="text-xs font-medium text-[#F1F3EF] mb-1">
                  Hypothesis Debate
                </div>
                <div className="text-xs text-[#9A9F9B] leading-relaxed">
                  Competing strategy agents challenge assumptions and backtest scenarios before capital is allocated.
                </div>
              </div>

              <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
                <div className="text-xs font-medium text-[#F1F3EF] mb-1">
                  Hard Risk Bounds
                </div>
                <div className="text-xs text-[#9A9F9B] leading-relaxed">
                  Deterministic limits (VaR, gross exposure, drawdown ceilings) operate outside agent reasoning.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
