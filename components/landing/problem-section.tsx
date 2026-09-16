'use client'

import React from 'react'

export function ProblemSection() {
  return (
    <section id="research" className="py-24 sm:py-32 border-t border-[#E4E8E4] bg-[#F7F9F7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs sm:text-[13px] font-medium tracking-[-0.01em] text-[#5F665F] mb-3">
            The structural problem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#111827] leading-[1.12]">
            Institutional asset management was designed around human bottlenecks.
          </h2>
          <p className="mt-5 text-base sm:text-[18px] text-[#4B5563] leading-relaxed">
            Specialized teams traditionally operate in separate functional silos — passing memos,
            spreadsheets, and delayed models across organizational boundaries with inevitable friction.
          </p>
        </div>

        {/* 12-Column Asymmetric Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8 border-t border-[#E4E8E4]">
          {/* Left Column (5 cols): The Traditional Model */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono font-semibold tracking-wider text-[#8B928C]">
              TRADITIONAL ARCHITECTURE
            </div>
            <h3 className="text-xl font-bold tracking-[-0.025em] text-[#111411]">
              Siloed analysis & sequential latency
            </h3>
            <p className="text-sm text-[#5F665F] leading-relaxed tracking-[-0.005em]">
              When research is fragmented, macro assumptions diverge from company models, and trade
              ideas wait for weekly allocation committee meetings.
            </p>

            <ul className="space-y-4 pt-2 text-xs sm:text-[13px] text-[#5F665F]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C] shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#111411] font-semibold">Cognitive limits:</strong> Human analysts cannot parse thousands of global SEC filings, earnings calls, and tick streams in parallel.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C] shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#111411] font-semibold">Context loss:</strong> When positions are closed, the original hypothesis, market regime context, and attribution details are rarely codified.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C] shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#111411] font-semibold">Reactive risk:</strong> Human risk committees frequently adjust exposures after market volatility spikes have already occurred.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column (7 cols): The Dhanvi Multi-Agent Shift */}
          <div className="lg:col-span-7 space-y-6 lg:pl-8 lg:border-l lg:border-[#E4E8E4]">
            <div className="text-xs font-mono font-semibold tracking-wider text-[#10B981]">
              DHANVI SPECIFICATION
            </div>
            <h3 className="text-xl font-bold tracking-[-0.025em] text-[#111411]">
              Software-native collaborative intelligence
            </h3>
            <p className="text-sm text-[#5F665F] leading-relaxed tracking-[-0.005em]">
              Instead of isolated teams waiting on quarterly memos, specialized autonomous agents
              interrogate data streams concurrently, synthesize consensus, and formulate testable strategies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg border border-[#E4E8E4] bg-white">
                <div className="text-xs font-semibold text-[#111411] mb-1 tracking-[-0.01em]">
                  Concurrent Perception
                </div>
                <div className="text-xs text-[#5F665F] leading-relaxed">
                  News, microstructure, fundamentals, macro yields, and sentiment are processed simultaneously.
                </div>
              </div>

              <div className="p-4 rounded-lg border border-[#E4E8E4] bg-white">
                <div className="text-xs font-semibold text-[#111411] mb-1 tracking-[-0.01em]">
                  Hypothesis Debate
                </div>
                <div className="text-xs text-[#5F665F] leading-relaxed">
                  Competing strategy agents challenge assumptions and backtest scenarios before capital is allocated.
                </div>
              </div>

              <div className="p-4 rounded-lg border border-[#E4E8E4] bg-white">
                <div className="text-xs font-semibold text-[#111411] mb-1 tracking-[-0.01em]">
                  Hard Risk Bounds
                </div>
                <div className="text-xs text-[#5F665F] leading-relaxed">
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
