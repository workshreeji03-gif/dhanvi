'use client'

import React, { useState, useEffect } from 'react'

interface TelemetryEntry {
  id: string
  time: string
  agent: string
  channel: string
  message: string
}

const INITIAL_ENTRIES: TelemetryEntry[] = [
  {
    id: '1',
    time: '14:20:01.042',
    agent: 'Market Agent',
    channel: 'MICROSTRUCTURE',
    message: 'Tick volatility divergence detected in 10Y sovereign curve (+4.2 bps spread widening).',
  },
  {
    id: '2',
    time: '14:20:01.189',
    agent: 'Macro Agent',
    channel: 'POLICY',
    message: 'Central bank speech transcript ingested; semantic divergence index elevated at 0.78.',
  },
  {
    id: '3',
    time: '14:20:01.350',
    agent: 'Company Agent',
    channel: 'FUNDAMENTAL',
    message: 'Semiconductor supplier lowers quarterly equipment lead-time guidance by 8 days.',
  },
  {
    id: '4',
    time: '14:20:01.621',
    agent: 'Intelligence Core',
    channel: 'SYNTHESIS',
    message: 'Cross-modal reconciliation active: resolving supply-chain inventory vs. rate sensitivity.',
  },
  {
    id: '5',
    time: '14:20:02.010',
    agent: 'Strategy Network',
    channel: 'HYPOTHESIS',
    message: 'Strategy 02 updates parameter bounds: long duration-hedged industrials vs. short consumer cyclicals.',
  },
  {
    id: '6',
    time: '14:20:02.312',
    agent: 'Risk Engine',
    channel: 'GOVERNANCE',
    message: 'Deterministic risk check: Portfolio VaR at 0.82% (within 1.5% max ceiling). Allocation approved.',
  },
  {
    id: '7',
    time: '14:20:02.755',
    agent: 'Memory Engine',
    channel: 'LEDGER',
    message: 'Decision context, causal priors, and agent belief vector permanently indexed to #MEM-4892.',
  },
]

const ROTATING_ENTRIES = [
  {
    agent: 'Event Agent',
    channel: 'CATALYST',
    message: 'Breaking geopolitical logistics update mapped across 38 shipping equity constituents.',
  },
  {
    agent: 'Sentiment Agent',
    channel: 'CROWDING',
    message: 'Crowding index on tech mega-caps drops from 91st to 76th percentile across 13F disclosures.',
  },
  {
    agent: 'Market Agent',
    channel: 'VOLATILITY',
    message: 'Implied volatility skew steepens on front-month benchmark equity options.',
  },
  {
    agent: 'Strategy Network',
    channel: 'REBALANCE',
    message: 'Statistical arbitrage alpha proposes 14 pair rebalancing adjustments within factor bounds.',
  },
  {
    agent: 'Risk Engine',
    channel: 'CONSTRAINTS',
    message: 'Cross-asset factor exposure constraints verified; zero sector concentration breaches.',
  },
]

export function IntelligenceTerminal() {
  const [entries, setEntries] = useState<TelemetryEntry[]>(INITIAL_ENTRIES)
  const [isPaused, setIsPaused] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('ALL')

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr =
        now.toTimeString().split(' ')[0] +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0')
      const template =
        ROTATING_ENTRIES[Math.floor(Math.random() * ROTATING_ENTRIES.length)]

      const newEntry: TelemetryEntry = {
        id: String(Date.now()),
        time: timeStr,
        agent: template.agent,
        channel: template.channel,
        message: template.message,
      }

      setEntries((prev) => [newEntry, ...prev.slice(0, 14)])
    }, 3200)

    return () => clearInterval(interval)
  }, [isPaused])

  const triggerShock = () => {
    const now = new Date()
    const timeStr =
      now.toTimeString().split(' ')[0] +
      '.' +
      String(now.getMilliseconds()).padStart(3, '0')
    const shockEntry: TelemetryEntry = {
      id: String(Date.now()),
      time: timeStr,
      agent: 'Simulator',
      channel: 'STRESS-TEST',
      message: 'Simulated catalyst: 50 bps FX liquidity compression injected. Risk engine throttles leverage automatically.',
    }
    setEntries((prev) => [shockEntry, ...prev.slice(0, 14)])
  }

  const filtered =
    activeFilter === 'ALL'
      ? entries
      : entries.filter((e) => e.channel === activeFilter)

  return (
    <section className="py-24 sm:py-32 bg-[#F7F9F7] border-t border-[#E4E8E4]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-medium uppercase tracking-wide text-[#5F665F] mb-3">
            Research Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.035em] text-[#111411] leading-[1.08]">
            Real-time research telemetry.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F665F] leading-relaxed font-normal tracking-[-0.01em]">
            Inspect the telemetry stream as specialized agents formulate hypotheses, evaluate
            risk boundaries, and archive decision context into memory.
          </p>
          <div className="mt-2 text-xs text-[#8B928C] font-normal">
            * Conceptual demonstration / simulated interface. Not actual live market trading data.
          </div>
        </div>

        {/* Telemetry Container */}
        <div className="border border-[#E4E8E4] rounded-xl bg-white shadow-xs overflow-hidden">
          {/* Top Bar: Controls and Channel Filters */}
          <div className="p-4 sm:p-5 border-b border-[#E4E8E4] bg-[#F7F9F7] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="py-1.5 px-3 rounded border border-[#E4E8E4] bg-white hover:border-[#111411] text-[#5F665F] hover:text-[#111411] transition-colors cursor-pointer text-[11px] font-mono font-medium shadow-xs"
              >
                {isPaused ? 'Resume stream' : 'Pause stream'}
              </button>

              <button
                type="button"
                onClick={triggerShock}
                className="py-1.5 px-3 rounded border border-[#E4E8E4] bg-white hover:border-[#111411] text-[#5F665F] hover:text-[#111411] transition-colors cursor-pointer text-[11px] font-mono font-medium shadow-xs"
              >
                Inject shock
              </button>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-[#5F665F]">
              {['ALL', 'MICROSTRUCTURE', 'POLICY', 'SYNTHESIS', 'HYPOTHESIS', 'GOVERNANCE', 'LEDGER'].map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeFilter === filter
                        ? 'text-white bg-[#111411] font-semibold'
                        : 'text-[#5F665F] hover:text-[#111411] hover:bg-black/5'
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Telemetry Stream */}
          <div className="p-5 sm:p-7 divide-y divide-[#E4E8E4] font-mono text-xs">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 leading-relaxed"
              >
                {/* Timestamp */}
                <span className="text-[#8B928C] text-[11px] tabular-nums shrink-0 select-none">
                  {item.time}
                </span>

                {/* Channel Tag */}
                <span className="text-[#5F665F] text-[10px] w-32 shrink-0 tracking-wider font-semibold">
                  [{item.channel}]
                </span>

                {/* Agent & Message */}
                <div className="flex-1 text-[#5F665F] font-sans text-xs sm:text-[13px] font-normal">
                  <span className="text-[#111411] font-semibold mr-2 font-mono text-xs">
                    {item.agent}:
                  </span>
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
