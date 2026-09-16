'use client'

import React, { useState, useEffect } from 'react'
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Cpu,
} from 'lucide-react'

interface TerminalLog {
  id: string
  time: string
  agent: string
  color: string
  message: string
}

const INITIAL_LOGS: TerminalLog[] = [
  { id: '1', time: '14:20:01.042', agent: 'MARKET', color: 'text-cyan-400', message: 'Tick volatility anomaly detected in 10Y sovereign curve (+4.2 bps spread widening)' },
  { id: '2', time: '14:20:01.189', agent: 'MACRO', color: 'text-emerald-400', message: 'Central bank speech transcript ingested; semantic divergence index elevated at 0.78' },
  { id: '3', time: '14:20:01.350', agent: 'COMPANY', color: 'text-purple-400', message: 'Semi equipment supplier lowers quarterly lead-time guidance by 8 days' },
  { id: '4', time: '14:20:01.621', agent: 'INTELLIGENCE', color: 'text-yellow-400', message: 'Cross-modal debate initiated: reconciles supply-chain inventory vs. interest-rate impact' },
  { id: '5', time: '14:20:02.010', agent: 'STRATEGY', color: 'text-cyan-400', message: 'Strategy 02 updates parameter bounds: long duration-hedged industrials vs. short cyclical retail' },
  { id: '6', time: '14:20:02.312', agent: 'RISK', color: 'text-amber-400', message: 'Independent risk check: Portfolio VaR at 0.82% (within 1.5% max ceiling). Allocation approved.' },
  { id: '7', time: '14:20:02.755', agent: 'MEMORY', color: 'text-emerald-400', message: 'Decision context and agent belief vector permanently indexed to #MEM-4892' },
]

const ROTATING_EVENTS = [
  { agent: 'EVENT', color: 'text-rose-400', message: 'Breaking geopolitical logistics update mapped across 38 shipping equities' },
  { agent: 'SENTIMENT', color: 'text-pink-400', message: 'Crowding index on tech mega-caps drops from 91st to 76th percentile' },
  { agent: 'MARKET', color: 'text-cyan-400', message: 'Implied volatility skew steepens on front-month index options' },
  { agent: 'STRATEGY', color: 'text-cyan-400', message: 'Statistical arbitrage alpha proposes 14 pair rebalancing adjustments' },
  { agent: 'RISK', color: 'text-amber-400', message: 'Factor exposure constraints verified; zero sector concentration breaches' },
]

export function IntelligenceTerminal() {
  const [logs, setLogs] = useState<TerminalLog[]>(INITIAL_LOGS)
  const [isPaused, setIsPaused] = useState(false)
  const [filterAgent, setFilterAgent] = useState<string>('ALL')

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0')
      const randomEvent = ROTATING_EVENTS[Math.floor(Math.random() * ROTATING_EVENTS.length)]

      const newLog: TerminalLog = {
        id: String(Date.now()),
        time: timeStr,
        agent: randomEvent.agent,
        color: randomEvent.color,
        message: randomEvent.message,
      }

      setLogs((prev) => [newLog, ...prev.slice(0, 14)])
    }, 2800)

    return () => clearInterval(interval)
  }, [isPaused])

  const triggerShock = () => {
    const now = new Date()
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0')
    const shockLog: TerminalLog = {
      id: String(Date.now()),
      time: timeStr,
      agent: 'SIMULATOR',
      color: 'text-red-400 font-bold',
      message: '⚡ SIMULATED CATALYST INJECTED: Sudden 50 bps FX liquidity drain. Risk engine throttles leverage.',
    }
    setLogs((prev) => [shockLog, ...prev.slice(0, 14)])
  }

  const filteredLogs = filterAgent === 'ALL' ? logs : logs.filter((l) => l.agent === filterAgent)

  return (
    <section className="py-20 sm:py-28 bg-neutral-950 text-white font-sans">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>REAL-TIME SYSTEM EMULATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Live-Style Intelligence Terminal.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Inspect the real-time event telemetry as specialized agents formulate hypotheses, evaluate
            risk parameters, and store forensic decision rationales.
          </p>
          <div className="mt-2 text-xs font-mono text-amber-400/90 font-semibold">
            * Conceptual demonstration / simulated interface. Not actual live market trading data.
          </div>
        </div>

        {/* Status Header Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">RESEARCH AGENTS</span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">STRATEGY LAB</span>
            <span className="text-xs font-mono font-bold text-cyan-400">SIMULATION</span>
          </div>
          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">RISK ENGINE</span>
            <span className="text-xs font-mono font-bold text-amber-400">MONITORING</span>
          </div>
          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">MEMORY ENGINE</span>
            <span className="text-xs font-mono font-bold text-emerald-400">INDEXING</span>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-neutral-800 bg-black/90 p-4 sm:p-6 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Console Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-850 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-neutral-400 text-[11px]">dhanvi-kernel://telemetry/stream</span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={triggerShock}
                className="px-2.5 py-1 rounded bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900 text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Zap className="w-3 h-3" />
                <span>Simulate Market Catalyst</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Stream List */}
          <div className="space-y-2 min-h-[320px] max-h-[420px] overflow-y-auto pr-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-1 border-b border-neutral-900/60 animate-fade-in">
                <span className="text-neutral-500 shrink-0 text-[11px]">{log.time}</span>
                <span className={`px-1.5 py-0.2 rounded bg-neutral-900 text-[10px] font-bold shrink-0 ${log.color}`}>
                  [{log.agent}]
                </span>
                <span className="text-neutral-300 leading-relaxed">{log.message}</span>
              </div>
            ))}
          </div>

          {/* Terminal Prompt Footer */}
          <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">&gt;</span>
              <span className="animate-pulse">Listening on multi-agent consensus bus...</span>
            </div>
            <span>Buffered events: {logs.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
