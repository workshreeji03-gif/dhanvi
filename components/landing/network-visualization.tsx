'use client'

import React, { useState, useEffect } from 'react'
import {
  Brain,
  Cpu,
  Layers,
  Shield,
  Zap,
  RotateCcw,
  TrendingUp,
  Activity,
  Database,
  CheckCircle2,
  FileText,
  BarChart3,
  Globe,
  Radio,
} from 'lucide-react'

const RESEARCH_AGENTS = [
  { id: 'news', name: 'News Agent', icon: FileText, metric: '1.4k feeds/min' },
  { id: 'market', name: 'Market Agent', icon: BarChart3, metric: 'Tick microstructure' },
  { id: 'company', name: 'Company Agent', icon: Activity, metric: '10-K & earnings parsed' },
  { id: 'macro', name: 'Macro Agent', icon: Globe, metric: 'Yields & policy signals' },
  { id: 'sentiment', name: 'Sentiment Agent', icon: Radio, metric: 'Cross-asset narrative' },
  { id: 'events', name: 'Events Agent', icon: Zap, metric: 'Catalyst mapping' },
]

const STRATEGIES = [
  { id: 's1', name: 'Strategy 01', type: 'Cross-Asset Momentum', status: 'Active' },
  { id: 's2', name: 'Strategy 02', type: 'Statistical Mean Reversion', status: 'Debating' },
  { id: 's3', name: 'Strategy 03', type: 'Macro Event Driven', status: 'Optimizing' },
  { id: 'sN', name: 'Strategy N', type: 'Volatility Dispersion', status: 'Simulated' },
]

export function NetworkVisualization() {
  const [activeStage, setActiveStage] = useState<number>(1)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // Subtle continuous stage advancement
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev >= 6 ? 1 : prev + 1))
    }, 3200)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <div className="relative w-full rounded-2xl border border-neutral-200/90 bg-neutral-950 p-5 sm:p-8 text-white shadow-2xl overflow-hidden font-sans">
      {/* Background ambient network glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE MULTI-AGENT TOPOLOGY
          </div>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Autonomous Collaborative Architecture
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors text-[11px] font-mono cursor-pointer"
          >
            {isPaused ? '▶ Resume Flow' : '⏸ Pause'}
          </button>
          <div className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-900/60 border border-neutral-850">
            Loop: #{activeStage} of 6
          </div>
        </div>
      </div>

      {/* Main Architecture Flow Canvas */}
      <div className="space-y-6">
        {/* Layer 1: Specialized Research Agents */}
        <div>
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            <span>01. Multi-Agent Research Perception</span>
            <span className="text-emerald-400">Independent Sensing</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {RESEARCH_AGENTS.map((agent) => {
              const Icon = agent.icon
              const isSelected = selectedNode === agent.id
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedNode(isSelected ? null : agent.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeStage === 1 || isSelected
                      ? 'border-emerald-500/50 bg-emerald-950/20 shadow-xs shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="text-xs font-bold text-neutral-100 truncate">{agent.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                    {agent.metric}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Connecting Conduit 1 */}
        <div className="relative flex justify-center items-center py-1">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <div className="absolute px-3 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
            <span>Cross-Modal Synthesis</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Layer 2: Central Intelligence Hub */}
        <div
          className={`p-4 sm:p-5 rounded-xl border transition-all ${
            activeStage === 2
              ? 'border-emerald-500/60 bg-gradient-to-r from-emerald-950/30 via-neutral-900 to-neutral-950 ring-1 ring-emerald-500/30'
              : 'border-neutral-800 bg-neutral-900/60'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Dhanvi Intelligence Layer</span>
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    Core Engine
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Reconciles conflicting signals, extracts consensus, and generates testable market hypotheses.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
              <span className="px-2 py-1 rounded bg-neutral-800/80">Debate: Active</span>
              <span className="px-2 py-1 rounded bg-neutral-800/80">Confidence: 87.4%</span>
            </div>
          </div>
        </div>

        {/* Connecting Conduit 2 */}
        <div className="relative flex justify-center items-center py-1">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="absolute px-3 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
            <span>Hypothesis → Strategy Generation</span>
          </div>
        </div>

        {/* Layer 3: Strategy Network */}
        <div>
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            <span>02. Strategy Network & Competition</span>
            <span className="text-cyan-400">Independent Models</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {STRATEGIES.map((strat, idx) => (
              <div
                key={strat.id}
                className={`p-3 rounded-xl border transition-all ${
                  activeStage === 3
                    ? 'border-cyan-500/50 bg-cyan-950/20 ring-1 ring-cyan-500/30'
                    : 'border-neutral-800/80 bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                  <span>{strat.name}</span>
                  <span className="text-cyan-400 font-semibold">{strat.status}</span>
                </div>
                <div className="text-xs font-bold text-neutral-200 truncate">{strat.type}</div>
                <div className="mt-2 w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(idx + 1) * 22 + 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 4: Governance & Hard Safety Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Allocation */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activeStage === 4
                ? 'border-emerald-500/50 bg-emerald-950/20'
                : 'border-neutral-800 bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-100 mb-1">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Capital & Portfolio Allocation</span>
            </div>
            <div className="text-[11px] text-neutral-400">
              Evaluates cross-strategy correlation, liquidity, regime fit, and drawdown budget.
            </div>
          </div>

          {/* Hard Risk Controls */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activeStage === 5
                ? 'border-amber-500/60 bg-amber-950/20 ring-1 ring-amber-500/30'
                : 'border-neutral-800 bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Independent Risk Controls</span>
            </div>
            <div className="text-[11px] text-neutral-400">
              Hard limits outside agent reasoning: VaR caps, gross exposure ceilings, kill switches.
            </div>
          </div>

          {/* Execution Intelligence */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activeStage === 5
                ? 'border-cyan-500/50 bg-cyan-950/20'
                : 'border-neutral-800 bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Execution Intelligence</span>
            </div>
            <div className="text-[11px] text-neutral-400">
              Simulated routing, market impact analysis, and order slicing algorithms.
            </div>
          </div>
        </div>

        {/* Layer 5: Institutional Memory Feedback Loop */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            activeStage === 6
              ? 'border-emerald-500/70 bg-gradient-to-r from-emerald-950/40 to-neutral-900 ring-1 ring-emerald-500/30'
              : 'border-neutral-800/90 bg-neutral-900/50'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <RotateCcw className="w-4 h-4 animate-spin-reverse" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Dhanvi Institutional Memory</span>
                  <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-500/30">
                    Continuous Learning Loop
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Stores decision context, hypothesis rationales, outcomes, and attribution — feeding lessons back to all agents.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Attribution Indexed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info / Disclaimer */}
      <div className="mt-6 pt-3 border-t border-neutral-900 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-mono">
        <div>Architecture status: Active multi-agent research topology</div>
        <div className="text-neutral-400">Illustrative system architecture diagram</div>
      </div>
    </div>
  )
}
