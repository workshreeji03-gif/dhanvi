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
    <section className="py-28 sm:py-36 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-medium text-[#9A9F9B] mb-3">
            Simulated telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-[1.12]">
            Real-time research telemetry.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9A9F9B] leading-relaxed">
            Inspect the telemetry stream as specialized agents formulate hypotheses, evaluate
            risk boundaries, and archive decision context into memory.
          </p>
          <div className="mt-2 text-xs font-mono text-[#7A807B]">
            * Conceptual demonstration / simulated interface. Not actual live market trading data.
          </div>
        </div>

        {/* Telemetry Container */}
        <div className="border border-white/[0.08] rounded-xl bg-[#111412] overflow-hidden">
          {/* Top Bar: Controls and Channel Filters */}
          <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="py-1 px-2.5 rounded border border-white/[0.08] hover:border-white/[0.2] text-[#9A9F9B] hover:text-[#F1F3EF] transition-colors cursor-pointer text-[11px] font-mono"
              >
                {isPaused ? 'Resume stream' : 'Pause'}
              </button>

              <button
                type="button"
                onClick={triggerShock}
                className="py-1 px-2.5 rounded border border-white/[0.08] hover:border-white/[0.2] text-[#9A9F9B] hover:text-[#F1F3EF] transition-colors cursor-pointer text-[11px] font-mono"
              >
                Inject shock
              </button>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-[#7A807B]">
              {['ALL', 'MICROSTRUCTURE', 'POLICY', 'SYNTHESIS', 'HYPOTHESIS', 'GOVERNANCE', 'LEDGER'].map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      activeFilter === filter
                        ? 'text-[#F1F3EF] bg-white/[0.08]'
                        : 'hover:text-[#9A9F9B]'
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Telemetry Stream */}
          <div className="p-4 sm:p-6 divide-y divide-white/[0.04] space-y-3 font-mono text-xs">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 leading-relaxed"
              >
                {/* Timestamp */}
                <span className="text-[#7A807B] text-[11px] shrink-0 select-none">
                  {item.time}
                </span>

                {/* Channel Tag */}
                <span className="text-[#9A9F9B] text-[10px] w-28 shrink-0 tracking-wider">
                  [{item.channel}]
                </span>

                {/* Agent & Message */}
                <div className="flex-1 text-[#C4C9C3] font-sans text-xs sm:text-[13px]">
                  <span className="text-[#F1F3EF] font-medium mr-2 font-mono text-xs">
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
