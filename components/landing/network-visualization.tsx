'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface AgentSpec {
  id: string
  loopIndex: number
  name: string
  label: string
  metric: string
  description: string
  observes: string[]
  analyzes: string[]
  contributes: string[]
  inputs: string[]
  analysis: string[]
  outputs: string[]
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
    observes: [
      'Financial news & wires',
      'Company filings (8-K, 10-Q)',
      'Earnings releases & transcripts',
      'Global policy & geopolitical events',
    ],
    analyzes: [
      'Relevance scoring & tagging',
      'Entity recognition & linkage',
      'Context extraction',
      'Potential market impact evaluation',
    ],
    contributes: [
      'Structured events',
      'Research context dossier',
      'Downstream strategy signals',
    ],
    inputs: [
      'Financial news',
      'Company announcements',
      'Regulatory filings',
      'Earnings releases',
      'Global policy events',
    ],
    analysis: [
      'Event classification',
      'Entity recognition',
      'Relevance scoring',
      'Context extraction',
      'Potential market impact',
    ],
    outputs: [
      'Structured events',
      'Relevant companies/assets',
      'Research signals',
      'Event priority',
    ],
  },
  {
    id: 'market',
    loopIndex: 2,
    name: 'Market Agent',
    label: 'Markets',
    metric: 'Tick microstructure',
    description:
      'Analyzes tick-level price data, order book depth, volatility surfaces, and cross-asset correlation to identify microstructure anomalies and regime shifts.',
    observes: [
      'Tick prices & depth',
      'Implied volatility surfaces',
      'Liquidity distribution',
      'Cross-asset spreads',
    ],
    analyzes: [
      'Trend dynamics',
      'Regime classification',
      'Volatility skew shifts',
      'Liquidity exhaustion',
    ],
    contributes: [
      'Market-state representation',
      'Regime indicators',
      'Execution risk boundaries',
    ],
    inputs: [
      'Price data',
      'Liquidity',
      'Volume',
      'Volatility',
      'Cross-asset relationships',
    ],
    analysis: [
      'Trend analysis',
      'Regime identification',
      'Volatility analysis',
      'Correlation changes',
    ],
    outputs: [
      'Market-state representation',
      'Regime signals',
      'Risk conditions',
    ],
  },
  {
    id: 'company',
    loopIndex: 3,
    name: 'Company Agent',
    label: 'Companies',
    metric: '10-K & earnings parsed',
    description:
      'Evaluates corporate balance sheet durability, cash flow trajectories, segment guidance, and supply-chain linkages across global equities.',
    observes: [
      'SEC 10-K / 10-Q disclosures',
      'Earnings call transcripts',
      'Segment revenue breakdowns',
      'CapEx guidance',
    ],
    analyzes: [
      'Unit economics',
      'Growth sustainability',
      'Margin trajectory',
      'Balance sheet health',
    ],
    contributes: [
      'Company intelligence dossiers',
      'Fundamental quality metrics',
      'Long-horizon alpha features',
    ],
    inputs: [
      'Financial statements',
      'SEC disclosures',
      'Earnings calls',
    ],
    analysis: [
      'Fundamental analysis',
      'Unit economics',
      'Growth sustainability',
    ],
    outputs: [
      'Company intelligence',
      'Fundamental metrics',
    ],
  },
  {
    id: 'macro',
    loopIndex: 4,
    name: 'Macro Agent',
    label: 'Macro',
    metric: 'Yields & policy signals',
    description:
      'Tracks sovereign yield curve dynamics, central-bank statements, inflation indicators, and currency pairs to establish cross-asset economic context.',
    observes: [
      'Sovereign yield curves',
      'Central-bank speeches & policy',
      'Inflation indicators (CPI/PCE)',
      'Currency & commodity pairs',
    ],
    analyzes: [
      'Macro regime calibration',
      'Interest-rate sensitivities',
      'Monetary impulse paths',
      'Term premia shifts',
    ],
    contributes: [
      'Macro regime indicators',
      'Rate-sensitivity matrices',
      'Cross-asset factor context',
    ],
    inputs: [
      'Interest rates',
      'Yield curves',
      'Inflation data',
    ],
    analysis: [
      'Macro regime analysis',
      'Interest-rate sensitivities',
    ],
    outputs: [
      'Macro context',
      'Factor matrices',
    ],
  },
  {
    id: 'sentiment',
    loopIndex: 5,
    name: 'Sentiment Agent',
    label: 'Sentiment',
    metric: 'Cross-asset narrative',
    description:
      'Evaluates shifts in institutional positioning, consensus narrative drift, and crowding patterns across public and private research commentary.',
    observes: [
      'Institutional positioning reports',
      'Research note revisions',
      'Narrative volume streams',
      'Crowding skew metrics',
    ],
    analyzes: [
      'Narrative clustering',
      'Consensus exhaustion',
      'Expectation gap analysis',
      'Sentiment divergence',
    ],
    contributes: [
      'Crowding indicators',
      'Consensus inflection alerts',
      'Contrarian risk features',
    ],
    inputs: [
      'News narratives',
      'Institutional positioning',
    ],
    analysis: [
      'Narrative clustering',
      'Consensus tracking',
    ],
    outputs: [
      'Sentiment indicators',
      'Crowding metrics',
    ],
  },
  {
    id: 'events',
    loopIndex: 6,
    name: 'Events Agent',
    label: 'Events',
    metric: 'Catalyst tracking',
    description:
      'Tracks scheduled and unscheduled corporate, economic, and regulatory catalysts to model scenario outcomes and volatility spillovers.',
    observes: [
      'Economic calendars',
      'Antitrust & regulatory filings',
      'FDA & clinical dates',
      'Index rebalancing notices',
    ],
    analyzes: [
      'Event distribution modeling',
      'Scenario probability trees',
      'Implied vs realized moves',
      'Second-order spillover',
    ],
    contributes: [
      'Catalyst playbooks',
      'Scenario payoff distributions',
      'Event risk ratings',
    ],
    inputs: [
      'Earnings',
      'Regulatory announcements',
      'Economic calendars',
    ],
    analysis: [
      'Event classification',
      'Scenario probability modeling',
    ],
    outputs: [
      'Event map',
      'Catalyst playbooks',
    ],
  },
]

const PIPELINE_STEPS = [
  'Shared Intelligence',
  'Strategy Network',
  'Portfolio Allocation',
  'Independent Risk',
  'Institutional Memory',
]

export function NetworkVisualization() {
  const [activeCycleIndex, setActiveCycleIndex] = useState<number>(0)
  const [selectedAgent, setSelectedAgent] = useState<AgentSpec | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentAgent = selectedAgent || RESEARCH_AGENTS[activeCycleIndex]

  // Auto-cycle through agents when not paused and not manually locked
  useEffect(() => {
    if (isPaused || selectedAgent) return

    autoCycleTimerRef.current = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % RESEARCH_AGENTS.length)
    }, 4500)

    return () => {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current)
    }
  }, [isPaused, selectedAgent])

  const handleSelectAgent = (agent: AgentSpec) => {
    setSelectedAgent(agent)
    setActiveCycleIndex(agent.loopIndex - 1)
  }

  return (
    <section id="architecture" className="py-24 sm:py-32 border-t border-[#E5E8E5] bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-normal text-[#606660] mb-3">
              Dhanvi Intelligence Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#101310] leading-tight">
              Specialized intelligence.
              <br />
              One shared understanding.
            </h2>
            <p className="mt-4 text-base text-[#606660] leading-relaxed">
              Dhanvi approaches markets through specialized research agents, each focused on a
              different dimension of the investment environment.
            </p>
          </div>

          {/* Restrained Controls */}
          <div className="flex items-center gap-4 text-xs text-[#606660]">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="py-1 px-3 rounded-lg border border-[#E5E8E5] hover:border-[#D8DDD8] hover:text-[#101310] transition-colors cursor-pointer text-xs font-medium"
            >
              {isPaused ? 'Resume cycle' : 'Pause'}
            </button>
            <span className="font-mono text-[#929892]">
              {String(currentAgent.loopIndex).padStart(2, '0')} / 06
            </span>
          </div>
        </div>

        {/* Elegant Horizontal Agent Selector (No green boxes) */}
        <div className="border-b border-[#E5E8E5] mb-8 overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max pb-3">
            {RESEARCH_AGENTS.map((agent) => {
              const isSelected = currentAgent.id === agent.id
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => handleSelectAgent(agent)}
                  className={`relative text-sm font-medium transition-colors cursor-pointer pb-2 outline-none ${
                    isSelected
                      ? 'text-[#101310]'
                      : 'text-[#606660] hover:text-[#101310]'
                  }`}
                >
                  <span>{agent.label}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Agent Detail Area */}
        <div className="border border-[#E5E8E5] rounded-xl bg-[#F7F8F6] p-6 sm:p-8 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT 40%: Agent Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-[#10B981]">
                AGENT {String(currentAgent.loopIndex).padStart(2, '0')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#101310]">
                {currentAgent.label} Intelligence
              </h3>
              <p className="text-sm text-[#606660] leading-relaxed">
                {currentAgent.description}
              </p>
              <div className="pt-2 text-xs text-[#929892]">
                Telemetry benchmark: <span className="text-[#101310] font-medium">{currentAgent.metric}</span>
              </div>
            </div>

            {/* RIGHT 60%: 3 Columns (Observes, Analyzes, Contributes) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 sm:divide-x sm:divide-[#E5E8E5]">
              {/* Observes */}
              <div className="sm:pr-4">
                <div className="text-xs font-medium text-[#101310] mb-3">
                  Observes
                </div>
                <ul className="space-y-2 text-xs text-[#606660]">
                  {currentAgent.observes.map((item) => (
                    <li key={item} className="leading-snug">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Analyzes */}
              <div className="sm:px-4">
                <div className="text-xs font-medium text-[#101310] mb-3">
                  Analyzes
                </div>
                <ul className="space-y-2 text-xs text-[#606660]">
                  {currentAgent.analyzes.map((item) => (
                    <li key={item} className="leading-snug">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contributes */}
              <div className="sm:pl-4">
                <div className="text-xs font-medium text-[#101310] mb-3">
                  Contributes
                </div>
                <ul className="space-y-2 text-xs text-[#606660]">
                  {currentAgent.contributes.map((item) => (
                    <li key={item} className="leading-snug">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Downstream Architecture Flow Path */}
        <div className="p-6 rounded-xl border border-[#E5E8E5] bg-white">
          <div className="text-xs text-[#929892] mb-3 font-normal">
            Information path from {currentAgent.label} Intelligence:
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <span className="px-3 py-1 rounded border border-[#10B981] bg-[#10B981]/5 text-[#101310] font-medium">
              {currentAgent.label} Intelligence
            </span>
            <span className="text-[#929892] font-mono">→</span>

            {PIPELINE_STEPS.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="px-3 py-1 rounded border border-[#E5E8E5] bg-[#F7F8F6] text-[#606660]">
                  {step}
                </span>
                {idx < PIPELINE_STEPS.length - 1 && (
                  <span className="text-[#D8DDD8] font-mono">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
