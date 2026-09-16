'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import { X, ArrowRight } from 'lucide-react'

export interface AgentSpec {
  id: string
  loopIndex: number
  name: string
  label: string
  metric: string
  description: string
  observes: string
  analyzes: string
  contributes: string
  inputs: string[]
  analysis: string[]
  outputs: string[]
  downstreamTargets: string[]
}

export const RESEARCH_AGENTS: AgentSpec[] = [
  {
    id: 'news',
    loopIndex: 1,
    name: 'News Agent',
    label: 'News',
    metric: '1.4k feeds/min',
    description:
      'Monitors relevant financial news, company developments, filings, macro events and geopolitical developments to identify potentially market-relevant information.',
    observes: 'Financial news, company announcements, regulatory filings, earnings disclosures, geopolitical events',
    analyzes: 'Event classification, entity recognition, relevance scoring, context extraction, impact mapping',
    contributes: 'Structured events, entity linkages, and research signals for strategy agents',
    inputs: ['Financial news', 'Company announcements', 'Regulatory filings', 'Earnings information', 'Relevant global events', 'Geopolitical developments'],
    analysis: ['Event classification', 'Entity recognition', 'Relevance scoring', 'Sentiment/context extraction', 'Impact mapping', 'Cross-source validation'],
    outputs: ['Structured events', 'Relevant companies/assets', 'Research signals', 'Event priority', 'Context for other Dhanvi agents'],
    downstreamTargets: ['Intelligence Synthesis', 'Strategy 01 (Momentum)', 'Strategy 03 (Macro Event)', 'Institutional Memory'],
  },
  {
    id: 'market',
    loopIndex: 2,
    name: 'Market Agent',
    label: 'Markets',
    metric: 'Tick microstructure',
    description:
      'Analyzes price data, volume, volatility surfaces, liquidity dynamics, and market structure to construct unified market-state representations and detect anomalies.',
    observes: 'Tick prices, order book depth, implied volatility surfaces, liquidity distribution, cross-asset pairs',
    analyzes: 'Trend dynamics, regime classification, volatility skew, correlation matrix shifts, liquidity exhaustion',
    contributes: 'Market-state representations, regime signals, and risk features for strategy execution',
    inputs: ['Price data', 'Volume', 'Volatility', 'Liquidity', 'Market structure', 'Cross-asset relationships'],
    analysis: ['Trend analysis', 'Regime identification', 'Volatility analysis', 'Correlation changes', 'Liquidity analysis', 'Market anomaly detection'],
    outputs: ['Market-state representation', 'Regime signals', 'Risk conditions', 'Market features', 'Inputs for strategy agents'],
    downstreamTargets: ['Intelligence Synthesis', 'All Strategy Models', 'Independent Risk Engine', 'Execution Intelligence'],
  },
  {
    id: 'company',
    loopIndex: 3,
    name: 'Company Agent',
    label: 'Companies',
    metric: '10-K & earnings parsed',
    description:
      'Deeply evaluates corporate disclosures, income statements, balance sheet health, earnings surprises, and forward guidance across global equities.',
    observes: 'SEC 10-K and 10-Q filings, earnings transcripts, segment revenue breakdowns, capex guidance',
    analyzes: 'Fundamental unit economics, growth trajectory, margin durability, balance sheet resilience',
    contributes: 'Company intelligence dossiers, fundamental health scorecards, and equity alpha features',
    inputs: ['Financial statements', 'Earnings', 'Company filings', 'Guidance', 'Business metrics', 'Industry information'],
    analysis: ['Fundamental analysis', 'Growth trends', 'Margin analysis', 'Balance-sheet analysis', 'Earnings changes', 'Business/industry context'],
    outputs: ['Company intelligence', 'Fundamental signals', 'Company risk factors', 'Research summaries', 'Strategy inputs'],
    downstreamTargets: ['Intelligence Synthesis', 'Strategy 01 & 02', 'Portfolio Construction', 'Institutional Memory'],
  },
  {
    id: 'macro',
    loopIndex: 4,
    name: 'Macro Agent',
    label: 'Macro',
    metric: 'Yields & policy signals',
    description:
      'Tracks monetary policy shifts, sovereign yield curves, inflation dynamics, currency pairs, and commodity pressures across global economies.',
    observes: 'Sovereign yield curves, central-bank statements, inflation metrics (CPI/PCE), currency pairs, commodities',
    analyzes: 'Macro regime shifts, rate sensitivity across asset classes, policy path divergence, term premia',
    contributes: 'Macro regime indicators, sector rate sensitivities, and global cross-asset context',
    inputs: ['Interest rates', 'Inflation', 'Employment', 'GDP/economic indicators', 'Currencies', 'Commodities', 'Central-bank information'],
    analysis: ['Macro regime analysis', 'Rate sensitivity', 'Inflation trends', 'Policy interpretation', 'Cross-asset implications'],
    outputs: ['Macro context', 'Regime indicators', 'Sector implications', 'Asset-class relationships', 'Strategy context'],
    downstreamTargets: ['Intelligence Synthesis', 'Strategy 03 (Macro Event)', 'Capital Allocation', 'Independent Risk Engine'],
  },
  {
    id: 'sentiment',
    loopIndex: 5,
    name: 'Sentiment Agent',
    label: 'Sentiment',
    metric: 'Cross-asset narrative',
    description:
      'Quantifies narrative consensus, media tone, thematic shifts, and institutional sentiment divergence from unstructured commentary.',
    observes: 'Financial commentary, institutional positioning disclosures, research note revisions, market narratives',
    analyzes: 'Narrative clustering, sentiment momentum, consensus crowding, narrative divergence anomalies',
    contributes: 'Sentiment indicators, consensus inflection flags, and crowded-trade risk factors',
    inputs: ['News narratives', 'Market commentary', 'Analyst/research sentiment where available', 'Relevant public information', 'Cross-asset behavior'],
    analysis: ['Narrative clustering', 'Sentiment direction', 'Sentiment changes', 'Consensus detection', 'Narrative divergence'],
    outputs: ['Sentiment indicators', 'Narrative changes', 'Consensus/divergence information', 'Research context'],
    downstreamTargets: ['Intelligence Synthesis', 'Strategy 01 (Momentum)', 'Independent Risk Engine'],
  },
  {
    id: 'events',
    loopIndex: 6,
    name: 'Events Agent',
    label: 'Events',
    metric: 'Catalyst mapping',
    description:
      'Maps scheduled earnings, economic releases, regulatory filings, corporate actions, and geopolitical catalysts into scenario impact models.',
    observes: 'Scheduled earnings dates, economic release calendars, regulatory milestones, corporate filings',
    analyzes: 'Event timing, expected impact magnitude, scenario tree probabilities, historical analogue volatility',
    contributes: 'Event risk matrices, affected asset linkages, and scenario playbooks for strategy execution',
    inputs: ['Earnings', 'Economic releases', 'Corporate actions', 'Policy decisions', 'Regulatory developments', 'Relevant geopolitical events'],
    analysis: ['Event classification', 'Timing', 'Expected impact', 'Affected entities', 'Scenario mapping'],
    outputs: ['Event map', 'Potentially affected assets', 'Event priority', 'Scenario inputs', 'Strategy context'],
    downstreamTargets: ['Intelligence Synthesis', 'Strategy 03 (Macro Event)', 'Execution Intelligence', 'Institutional Memory'],
  },
]

export function NetworkVisualization() {
  const [activeCycleIndex, setActiveCycleIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AgentSpec | null>(null)
  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const panelId = useId()

  const currentAgent = selectedAgent || RESEARCH_AGENTS[activeCycleIndex]

  // Auto-cycle through the 6 agents when not paused and when user hasn't selected one
  useEffect(() => {
    if (isPaused || selectedAgent !== null) {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current)
      return
    }

    autoCycleTimerRef.current = setInterval(() => {
      setActiveCycleIndex((prev) => (prev >= 5 ? 0 : prev + 1))
    }, 4000)

    return () => {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current)
    }
  }, [isPaused, selectedAgent])

  // Escape key collapses selected detail
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedAgent) {
        setSelectedAgent(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAgent])

  const handleAgentClick = (agent: AgentSpec) => {
    if (selectedAgent?.id === agent.id) {
      setSelectedAgent(null)
    } else {
      setSelectedAgent(agent)
      setActiveCycleIndex(agent.loopIndex - 1)
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }

  return (
    <section id="architecture" className="py-24 sm:py-32 border-t border-white/[0.06] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-[#9A9F9B] mb-3">
              Multi-agent architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-tight">
              Specialized intelligence.
              <br />
              One shared understanding.
            </h2>
            <p className="mt-4 text-base text-[#9A9F9B] leading-relaxed">
              Dhanvi approaches markets through specialized research agents, each responsible for a
              different dimension of the investment environment.
            </p>
          </div>

          {/* Restrained Controls */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#9A9F9B]">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="py-1 px-2.5 rounded border border-white/[0.08] hover:border-white/[0.2] hover:text-[#F1F3EF] transition-colors cursor-pointer text-[11px]"
            >
              {isPaused ? 'Resume cycle' : 'Pause'}
            </button>
            <span className="text-[#7A807B]">
              Cycle {String(currentAgent.loopIndex).padStart(2, '0')} / 06
            </span>
          </div>
        </div>

        {/* 6 Minimal Cells Separated by Subtle 1px Dividers */}
        <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#111412]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-white/[0.08]">
            {RESEARCH_AGENTS.map((agent) => {
              const isSelected = selectedAgent?.id === agent.id
              const isAutoActive = !selectedAgent && activeCycleIndex === agent.loopIndex - 1

              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => handleAgentClick(agent)}
                  className={`p-5 text-left transition-colors cursor-pointer relative group outline-none ${
                    isSelected
                      ? 'bg-[#151816]'
                      : isAutoActive
                      ? 'bg-[#131614]'
                      : 'hover:bg-[#141715]'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`absolute top-0 inset-x-0 h-[2px] transition-colors ${
                      isSelected
                        ? 'bg-[#10B981]'
                        : isAutoActive && !isPaused
                        ? 'bg-[#10B981]/50'
                        : 'bg-transparent group-hover:bg-white/[0.15]'
                    }`}
                  />

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#7A807B] mb-2">
                    <span>0{agent.loopIndex}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected
                          ? 'bg-[#10B981]'
                          : isAutoActive && !isPaused
                          ? 'bg-[#10B981]/80'
                          : 'bg-transparent'
                      }`}
                    />
                  </div>

                  <div className="text-sm font-medium text-[#F1F3EF] mb-1">
                    {agent.label}
                  </div>
                  <div className="text-[11px] text-[#9A9F9B] truncate">
                    {agent.metric}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Editorial Detail Expansion (No boxes within boxes!) */}
          {selectedAgent && (
            <div
              ref={panelRef}
              id={panelId}
              className="p-6 sm:p-10 border-t border-white/[0.08] bg-[#0E110F] animate-fade-in"
            >
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
                <div>
                  <div className="text-xs font-mono text-[#10B981] mb-1">
                    RESEARCH AGENT 0{selectedAgent.loopIndex}
                  </div>
                  <h3 className="text-2xl font-medium text-[#F1F3EF] tracking-tight">
                    {selectedAgent.name}
                  </h3>
                  <p className="text-sm text-[#9A9F9B] mt-2 max-w-3xl leading-relaxed">
                    {selectedAgent.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedAgent(null)}
                  className="p-2 text-[#9A9F9B] hover:text-[#F1F3EF] transition-colors cursor-pointer"
                  aria-label="Close detail"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Editorial Columns: Observes, Analyzes, Contributes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pb-8 border-b border-white/[0.06]">
                <div>
                  <div className="text-xs font-medium text-[#F1F3EF] mb-2">
                    Observes
                  </div>
                  <p className="text-xs sm:text-sm text-[#9A9F9B] leading-relaxed">
                    {selectedAgent.observes}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-medium text-[#F1F3EF] mb-2">
                    Analyzes
                  </div>
                  <p className="text-xs sm:text-sm text-[#9A9F9B] leading-relaxed">
                    {selectedAgent.analyzes}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-medium text-[#F1F3EF] mb-2">
                    Contributes
                  </div>
                  <p className="text-xs sm:text-sm text-[#9A9F9B] leading-relaxed">
                    {selectedAgent.contributes}
                  </p>
                </div>
              </div>

              {/* Downstream Connection Path: Thin, elegant data relationships */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#9A9F9B]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#F1F3EF] font-medium">Information pathway:</span>
                  <span className="font-mono text-[11px] text-[#7A807B]">
                    Research → Strategy → Portfolio → Risk → Memory
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#7A807B]">
                  Architectural specification • Dhanvi research vision
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Downstream Collaborative Architecture Stepper */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
            <div className="text-[10px] font-mono text-[#7A807B]">LAYER 01</div>
            <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Synthesis Core</div>
            <div className="text-[11px] text-[#9A9F9B] mt-1 leading-normal">
              Resolves conflicting signals and extracts consensus.
            </div>
          </div>

          <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
            <div className="text-[10px] font-mono text-[#7A807B]">LAYER 02</div>
            <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Strategy Network</div>
            <div className="text-[11px] text-[#9A9F9B] mt-1 leading-normal">
              Multiple competing alphas challenge assumptions.
            </div>
          </div>

          <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
            <div className="text-[10px] font-mono text-[#7A807B]">LAYER 03</div>
            <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Capital Allocation</div>
            <div className="text-[11px] text-[#9A9F9B] mt-1 leading-normal">
              Weights exposures by correlation, regime, and liquidity.
            </div>
          </div>

          <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
            <div className="text-[10px] font-mono text-[#7A807B]">LAYER 04</div>
            <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Independent Risk</div>
            <div className="text-[11px] text-[#9A9F9B] mt-1 leading-normal">
              Hard constraints operate outside agent reasoning.
            </div>
          </div>

          <div className="p-4 rounded-lg border border-white/[0.06] bg-[#111412]">
            <div className="text-[10px] font-mono text-[#7A807B]">LAYER 05</div>
            <div className="text-xs font-medium text-[#F1F3EF] mt-0.5">Decision Memory</div>
            <div className="text-[11px] text-[#9A9F9B] mt-1 leading-normal">
              Codifies every rationale for retrospective learning.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
