'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import {
  Brain,
  Layers,
  Shield,
  Zap,
  RotateCcw,
  CheckCircle2,
  FileText,
  BarChart3,
  Globe,
  Radio,
  Activity,
  X,
  ArrowDown,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react'

export interface AgentSpec {
  id: string
  loopIndex: number
  name: string
  shortTitle: string
  icon: React.ComponentType<{ className?: string }>
  metric: string
  description: string
  inputs: string[]
  analysis: string[]
  outputs: string[]
  downstreamTargets: {
    hub: boolean
    strategies: string[]
    portfolio: boolean
    risk: boolean
    execution: boolean
    memory: boolean
  }
}

export const RESEARCH_AGENTS: AgentSpec[] = [
  {
    id: 'news',
    loopIndex: 1,
    name: 'News Agent',
    shortTitle: 'News & Filing Stream',
    icon: FileText,
    metric: '1.4k feeds/min',
    description:
      'Monitors relevant financial news, company developments, filings, macro events and geopolitical developments to identify potentially market-relevant information.',
    inputs: [
      'Financial news',
      'Company announcements',
      'Regulatory filings',
      'Earnings information',
      'Relevant global events',
      'Geopolitical developments',
    ],
    analysis: [
      'Event classification',
      'Entity recognition',
      'Relevance scoring',
      'Sentiment/context extraction',
      'Impact mapping',
      'Cross-source validation',
    ],
    outputs: [
      'Structured events',
      'Relevant companies/assets',
      'Research signals',
      'Event priority',
      'Context for other Dhanvi agents',
    ],
    downstreamTargets: {
      hub: true,
      strategies: ['Strategy 01 (Momentum)', 'Strategy 03 (Macro Event)'],
      portfolio: false,
      risk: false,
      execution: false,
      memory: true,
    },
  },
  {
    id: 'market',
    loopIndex: 2,
    name: 'Market Agent',
    shortTitle: 'Microstructure & Price',
    icon: BarChart3,
    metric: 'Tick microstructure',
    description:
      'Analyzes price data, volume, volatility surfaces, liquidity dynamics, and market structure to construct unified market-state representations and detect anomalies.',
    inputs: [
      'Price data',
      'Volume',
      'Volatility',
      'Liquidity',
      'Market structure',
      'Cross-asset relationships',
    ],
    analysis: [
      'Trend analysis',
      'Regime identification',
      'Volatility analysis',
      'Correlation changes',
      'Liquidity analysis',
      'Market anomaly detection',
    ],
    outputs: [
      'Market-state representation',
      'Regime signals',
      'Risk conditions',
      'Market features',
      'Inputs for strategy agents',
    ],
    downstreamTargets: {
      hub: true,
      strategies: ['Strategy 01', 'Strategy 02', 'Strategy 03', 'Strategy N'],
      portfolio: true,
      risk: true,
      execution: true,
      memory: true,
    },
  },
  {
    id: 'company',
    loopIndex: 3,
    name: 'Company Agent',
    shortTitle: 'Corporate Fundamentals',
    icon: Activity,
    metric: '10-K & earnings parsed',
    description:
      'Deeply evaluates corporate disclosures, income statements, balance sheet health, earnings surprises, and forward guidance across global equities.',
    inputs: [
      'Financial statements',
      'Earnings',
      'Company filings',
      'Guidance',
      'Business metrics',
      'Industry information',
    ],
    analysis: [
      'Fundamental analysis',
      'Growth trends',
      'Margin analysis',
      'Balance-sheet analysis',
      'Earnings changes',
      'Business/industry context',
    ],
    outputs: [
      'Company intelligence',
      'Fundamental signals',
      'Company risk factors',
      'Research summaries',
      'Strategy inputs',
    ],
    downstreamTargets: {
      hub: true,
      strategies: ['Strategy 01 (Momentum)', 'Strategy 02 (Mean Reversion)'],
      portfolio: true,
      risk: false,
      execution: false,
      memory: true,
    },
  },
  {
    id: 'macro',
    loopIndex: 4,
    name: 'Macro Agent',
    shortTitle: 'Sovereign & Central Bank',
    icon: Globe,
    metric: 'Yields & policy signals',
    description:
      'Tracks monetary policy shifts, sovereign yield curves, inflation dynamics, currency pairs, and commodity pressures across global economies.',
    inputs: [
      'Interest rates',
      'Inflation',
      'Employment',
      'GDP/economic indicators',
      'Currencies',
      'Commodities',
      'Central-bank information',
    ],
    analysis: [
      'Macro regime analysis',
      'Rate sensitivity',
      'Inflation trends',
      'Policy interpretation',
      'Cross-asset implications',
    ],
    outputs: [
      'Macro context',
      'Regime indicators',
      'Sector implications',
      'Asset-class relationships',
      'Strategy context',
    ],
    downstreamTargets: {
      hub: true,
      strategies: ['Strategy 03 (Macro Event Driven)'],
      portfolio: true,
      risk: true,
      execution: false,
      memory: true,
    },
  },
  {
    id: 'sentiment',
    loopIndex: 5,
    name: 'Sentiment Agent',
    shortTitle: 'Narrative & Consensus',
    icon: Radio,
    metric: 'Cross-asset narrative',
    description:
      'Quantifies narrative consensus, media tone, thematic shifts, and institutional sentiment divergence from unstructured commentary.',
    inputs: [
      'News narratives',
      'Market commentary',
      'Analyst/research sentiment where available',
      'Relevant public information',
      'Cross-asset behavior',
    ],
    analysis: [
      'Narrative clustering',
      'Sentiment direction',
      'Sentiment changes',
      'Consensus detection',
      'Narrative divergence',
    ],
    outputs: [
      'Sentiment indicators',
      'Narrative changes',
      'Consensus/divergence information',
      'Research context',
    ],
    downstreamTargets: {
      hub: true,
      strategies: ['Strategy 01 (Momentum)'],
      portfolio: false,
      risk: true,
      execution: false,
      memory: true,
    },
  },
  {
    id: 'events',
    loopIndex: 6,
    name: 'Events Agent',
    shortTitle: 'Catalyst Impact Trees',
    icon: Zap,
    metric: 'Catalyst mapping',
    description:
      'Maps scheduled earnings, economic releases, regulatory filings, corporate actions, and geopolitical catalysts into scenario impact models.',
    inputs: [
      'Earnings',
      'Economic releases',
      'Corporate actions',
      'Policy decisions',
      'Regulatory developments',
      'Relevant geopolitical events',
    ],
    analysis: [
      'Event classification',
      'Timing',
      'Expected impact',
      'Affected entities',
      'Scenario mapping',
    ],
    outputs: [
      'Event map',
      'Potentially affected assets',
      'Event priority',
      'Scenario inputs',
      'Strategy context',
    ],
    downstreamTargets: {
      hub: true,
      strategies: ['Strategy 03 (Macro Event Driven)'],
      portfolio: false,
      risk: false,
      execution: true,
      memory: true,
    },
  },
]

const STRATEGIES = [
  { id: 's1', name: 'Strategy 01', type: 'Cross-Asset Momentum', status: 'Active', matchTag: 'Strategy 01' },
  { id: 's2', name: 'Strategy 02', type: 'Statistical Mean Reversion', status: 'Debating', matchTag: 'Strategy 02' },
  { id: 's3', name: 'Strategy 03', type: 'Macro Event Driven', status: 'Optimizing', matchTag: 'Strategy 03' },
  { id: 'sN', name: 'Strategy N', type: 'Volatility Dispersion', status: 'Simulated', matchTag: 'Strategy N' },
]

export function NetworkVisualization() {
  const [activeCycleIndex, setActiveCycleIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(false)
  const [manualSelectedAgent, setManualSelectedAgent] = useState<AgentSpec | null>(null)
  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const panelId = useId()

  // Currently active agent: manual selection takes strict precedence
  const effectiveAgent: AgentSpec = manualSelectedAgent || RESEARCH_AGENTS[activeCycleIndex]

  // Automated cycling: News (0) -> Market (1) -> Company (2) -> Macro (3) -> Sentiment (4) -> Events (5)
  useEffect(() => {
    if (isPaused || manualSelectedAgent !== null) {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current)
      return
    }

    autoCycleTimerRef.current = setInterval(() => {
      setActiveCycleIndex((prev) => (prev >= 5 ? 0 : prev + 1))
    }, 3500)

    return () => {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current)
    }
  }, [isPaused, manualSelectedAgent])

  // Keyboard accessibility: Escape collapses open detail panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && manualSelectedAgent) {
        setManualSelectedAgent(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [manualSelectedAgent])

  const handleAgentClick = (agent: AgentSpec) => {
    if (manualSelectedAgent?.id === agent.id) {
      // Clicking selected card again collapses it
      setManualSelectedAgent(null)
    } else {
      // Smoothly transition panel to newly clicked agent
      setManualSelectedAgent(agent)
      setActiveCycleIndex(RESEARCH_AGENTS.findIndex((a) => a.id === agent.id))
      // Scroll panel into view smoothly if needed on smaller screens
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const handleClosePanel = () => {
    setManualSelectedAgent(null)
  }

  const isLayerActive = (layerKey: keyof AgentSpec['downstreamTargets']) => {
    if (layerKey === 'strategies') {
      return effectiveAgent.downstreamTargets.strategies.length > 0
    }
    return Boolean(effectiveAgent.downstreamTargets[layerKey])
  }

  return (
    <section
      aria-label="Interactive Multi-Agent Topology"
      className="relative w-full rounded-2xl border border-neutral-800 bg-neutral-950 p-4 sm:p-7 md:p-8 text-white shadow-2xl overflow-hidden font-sans"
    >
      {/* Background ambient network glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none"
      />

      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-850 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold tracking-wide shadow-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${
                !isPaused ? 'animate-pulse' : 'opacity-50'
              }`}
            />
            <span>LIVE MULTI-AGENT TOPOLOGY</span>
          </div>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Autonomous Collaborative Architecture
          </span>
        </div>

        {/* Controls: Pause / Resume & Loop Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleTogglePause}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-850 active:scale-95 transition-all text-[11px] font-mono cursor-pointer flex items-center gap-1.5 shadow-xs"
            aria-label={isPaused ? 'Resume automatic animation' : 'Pause automatic animation'}
          >
            {isPaused ? (
              <>
                <span className="text-emerald-400">▶</span>
                <span>Resume Flow</span>
              </>
            ) : (
              <>
                <span className="text-neutral-400">⏸</span>
                <span>Pause</span>
              </>
            )}
          </button>

          <div
            className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-1.5"
            aria-live="polite"
          >
            <span className="text-neutral-500">Loop:</span>
            <span className="text-emerald-400 font-bold">
              #{effectiveAgent.loopIndex} of 6
            </span>
          </div>
        </div>
      </div>

      {/* Main Architecture Flow Canvas */}
      <div className="space-y-6">
        {/* Layer 1: Specialized Research Agents */}
        <div>
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            <div className="flex items-center gap-2">
              <span>01. Multi-Agent Research Perception</span>
              <span className="hidden sm:inline-block text-neutral-600">•</span>
              <span className="hidden sm:inline-block text-neutral-500 font-normal">
                Click any agent to inspect telemetry & intelligence specs
              </span>
            </div>
            <span className="text-emerald-400 font-semibold">Independent Sensing</span>
          </div>

          {/* 6 Interactive Agent Cards */}
          <div
            role="tablist"
            aria-label="Research Agents"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5"
          >
            {RESEARCH_AGENTS.map((agent) => {
              const Icon = agent.icon
              const isSelected = manualSelectedAgent?.id === agent.id
              const isAutoActive = !manualSelectedAgent && activeCycleIndex === agent.loopIndex - 1

              return (
                <button
                  key={agent.id}
                  role="tab"
                  id={`agent-tab-${agent.id}`}
                  aria-controls={panelId}
                  aria-selected={isSelected}
                  aria-expanded={isSelected}
                  tabIndex={0}
                  type="button"
                  onClick={() => handleAgentClick(agent)}
                  className={`group relative p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 select-none ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.22)] ring-1 ring-emerald-400/50 -translate-y-0.5'
                      : isAutoActive
                      ? 'border-emerald-500/60 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/30'
                      : 'border-neutral-800 bg-neutral-900/40 hover:border-emerald-500/40 hover:bg-neutral-900/80 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Status indicator + Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSelected || isAutoActive
                          ? 'border-emerald-400/50 bg-emerald-900/40 text-emerald-300'
                          : 'border-neutral-750 bg-neutral-850 text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isSelected
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                          : isAutoActive && !isPaused
                          ? 'bg-emerald-400 animate-pulse'
                          : 'bg-neutral-600 group-hover:bg-emerald-400/70'
                      }`}
                    />
                  </div>

                  <div className="text-xs font-bold text-neutral-100 truncate group-hover:text-white">
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                    {agent.metric}
                  </div>

                  {/* Visual selection notch pointing down to detail panel */}
                  {isSelected && (
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-5 border-x-transparent border-t-5 border-t-emerald-400 z-10"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Expandable Agent Intelligence Detail Panel */}
        {manualSelectedAgent && (
          <div
            ref={panelRef}
            id={panelId}
            role="tabpanel"
            aria-labelledby={`agent-tab-${manualSelectedAgent.id}`}
            className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 via-neutral-900/90 to-neutral-950 p-5 sm:p-6 shadow-2xl relative animate-fade-up"
          >
            {/* Ambient detail glow */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-72 h-32 bg-emerald-500/10 blur-3xl pointer-events-none"
            />

            {/* Header with Title, Badge, and Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xs">
                  {React.createElement(manualSelectedAgent.icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {manualSelectedAgent.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                      Active Telemetry
                    </span>
                    <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                      ({manualSelectedAgent.metric})
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5">
                    ARCHITECTURAL SPECIFICATION • DHANVI PRODUCT VISION
                  </div>
                </div>
              </div>

              {/* Close Panel Button */}
              <button
                type="button"
                onClick={handleClosePanel}
                className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close agent intelligence panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section 1: WHAT THIS AGENT DOES */}
            <div className="mb-5 bg-neutral-950/60 rounded-xl border border-neutral-800/80 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT THIS AGENT DOES</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {manualSelectedAgent.description}
              </p>
            </div>

            {/* Section 2: INPUTS → ANALYSIS → OUTPUT Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {/* INPUTS */}
              <div className="rounded-xl border border-neutral-800/90 bg-neutral-950/70 p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    INPUTS
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Perception Feeds</span>
                </div>
                <ul className="space-y-1.5">
                  {manualSelectedAgent.inputs.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-neutral-300 flex items-start gap-2 leading-tight"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ANALYSIS */}
              <div className="rounded-xl border border-neutral-800/90 bg-neutral-950/70 p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    ANALYSIS
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Reasoning Engine</span>
                </div>
                <ul className="space-y-1.5">
                  {manualSelectedAgent.analysis.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-neutral-300 flex items-start gap-2 leading-tight"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OUTPUT */}
              <div className="rounded-xl border border-neutral-800/90 bg-neutral-950/70 p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    OUTPUT
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Structured Signals</span>
                </div>
                <ul className="space-y-1.5">
                  {manualSelectedAgent.outputs.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-neutral-300 flex items-start gap-2 leading-tight"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3: Downstream Collaboration Flow */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">Signals Dispatched To:</span>
                <span className="text-neutral-300">
                  Dhanvi Intelligence Layer → Strategy Network → Risk & Allocation
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                <span>Scroll down to see illuminated downstream consumer nodes</span>
              </div>
            </div>
          </div>
        )}

        {/* Connecting Conduit: Research Agents → Intelligence Hub with Data Pulses */}
        <div className="relative flex justify-center items-center py-2">
          <div
            className={`w-full h-px transition-all duration-500 ${
              manualSelectedAgent
                ? 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10b981]'
                : 'bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent'
            }`}
          />
          <div className="absolute px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300 flex items-center gap-2 shadow-md">
            <span className="text-emerald-400 font-semibold">{effectiveAgent.name}</span>
            <span className="text-neutral-500">→</span>
            <span>Cross-Modal Synthesis Pulse</span>
            <span
              className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${
                !isPaused ? 'animate-ping' : 'opacity-40'
              }`}
            />
          </div>
        </div>

        {/* Layer 2: Central Intelligence Hub */}
        <div
          className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
            isLayerActive('hub')
              ? 'border-emerald-500/70 bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-950 ring-1 ring-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
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
                  {isLayerActive('hub') && (
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      Consuming {effectiveAgent.name}
                    </span>
                  )}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Reconciles conflicting signals, extracts consensus, and generates testable market hypotheses.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
              <span className="px-2 py-1 rounded bg-neutral-800/80">Debate: Active</span>
              <span className="px-2 py-1 rounded bg-neutral-800/80 text-emerald-400">
                Confidence: 87.4%
              </span>
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
            {STRATEGIES.map((strat, idx) => {
              const isTargeted = effectiveAgent.downstreamTargets.strategies.some((s) =>
                s.includes(strat.matchTag)
              )

              return (
                <div
                  key={strat.id}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    isTargeted
                      ? 'border-cyan-400/60 bg-cyan-950/30 ring-1 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'border-neutral-800/80 bg-neutral-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span>{strat.name}</span>
                    <span className="text-cyan-400 font-semibold">{strat.status}</span>
                  </div>
                  <div className="text-xs font-bold text-neutral-200 truncate">{strat.type}</div>
                  {isTargeted && (
                    <div className="mt-1 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span>{effectiveAgent.name} Active</span>
                    </div>
                  )}
                  <div className="mt-2 w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${(idx + 1) * 22 + 10}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Layer 4: Governance & Hard Safety Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Allocation */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-300 ${
              isLayerActive('portfolio')
                ? 'border-emerald-500/70 bg-emerald-950/30 ring-1 ring-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : 'border-neutral-800 bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-100">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Capital & Portfolio Allocation</span>
              </div>
              {isLayerActive('portfolio') && (
                <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                  Targeted
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400">
              Evaluates cross-strategy correlation, liquidity, regime fit, and drawdown budget.
            </div>
          </div>

          {/* Hard Risk Controls */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-300 ${
              isLayerActive('risk')
                ? 'border-amber-500/70 bg-amber-950/30 ring-1 ring-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'border-neutral-800 bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Independent Risk Controls</span>
              </div>
              {isLayerActive('risk') && (
                <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/30">
                  Hard Guardrails
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400">
              Hard limits outside agent reasoning: VaR caps, gross exposure ceilings, kill switches.
            </div>
          </div>

          {/* Execution Intelligence */}
          <div
            className={`p-3.5 rounded-xl border transition-all duration-300 ${
              isLayerActive('execution')
                ? 'border-cyan-400/70 bg-cyan-950/30 ring-1 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'border-neutral-800 bg-neutral-900/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Execution Intelligence</span>
              </div>
              {isLayerActive('execution') && (
                <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                  Routing Active
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400">
              Simulated routing, market impact analysis, and order slicing algorithms.
            </div>
          </div>
        </div>

        {/* Layer 5: Institutional Memory Feedback Loop */}
        <div
          className={`p-4 rounded-xl border transition-all duration-300 ${
            isLayerActive('memory')
              ? 'border-emerald-500/70 bg-gradient-to-r from-emerald-950/40 to-neutral-900 ring-1 ring-emerald-500/30'
              : 'border-neutral-800/90 bg-neutral-900/50'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <RotateCcw className={`w-4 h-4 ${!isPaused ? 'animate-spin-reverse' : ''}`} />
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
              <span>Indexing {effectiveAgent.name} Outputs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info / Disclaimer */}
      <div className="mt-6 pt-3 border-t border-neutral-900 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-mono">
        <div>Architecture status: Active multi-agent research topology</div>
        <div className="text-neutral-400">Illustrative system architecture • Conceptual demonstration</div>
      </div>
    </section>
  )
}
