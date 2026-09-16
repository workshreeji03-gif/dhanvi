'use client'

import React, { useState } from 'react'
import {
  FileSearch,
  Building2,
  TrendingUp,
  Globe2,
  Zap,
  Radio,
  Sliders,
  ShieldAlert,
  Database,
  X,
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react'

interface AgentDetail {
  id: string
  name: string
  role: string
  icon: any
  summary: string
  inputs: string[]
  analysis: string[]
  output: string[]
}

const AGENTS: AgentDetail[] = [
  {
    id: 'research',
    name: 'Research Agent',
    role: 'Market Information Synthesis',
    icon: FileSearch,
    summary: 'Processes continuous unstructured financial documents, filings, news feeds, and disclosures.',
    inputs: ['Global news wires', 'Regulatory disclosures & EDGAR filings', 'Earnings press releases', 'Broker research notes'],
    analysis: ['Entity resolution & cross-filing diffing', 'Semantic fact extraction', 'Key assertion verification'],
    output: ['Structured event dossiers', 'Entity relationship updates', 'Chronological fact log'],
  },
  {
    id: 'company',
    name: 'Company Intelligence Agent',
    role: 'Fundamental & Corporate Diagnostics',
    icon: Building2,
    summary: 'Studies corporate fundamentals, capital expenditure cycles, competitive moats, and financial statements.',
    inputs: ['10-K / 10-Q statements', 'Earnings call transcripts', 'Segment revenue breakdowns', 'Supply chain mapping'],
    analysis: ['Unit economics & margin trajectory', 'Management guidance vs. delivery drift', 'Supplier/customer concentration'],
    output: ['Normalized financial metrics', 'Moat degradation alerts', 'Fundamental scorecards'],
  },
  {
    id: 'market',
    name: 'Market Intelligence Agent',
    role: 'Microstructure & Price Dynamics',
    icon: TrendingUp,
    summary: 'Analyzes cross-asset price action, order book liquidity, volatility surfaces, and correlation regimes.',
    inputs: ['Order book depth & tick streams', 'Options implied volatility surfaces', 'Cross-asset pair prices', 'Volume distribution'],
    analysis: ['Regime change classification', 'Liquidity exhaustion detection', 'Cross-asset correlation matrix shifts'],
    output: ['Volatility regime tags', 'Microstructure anomaly flags', 'Beta & factor sensitivity maps'],
  },
  {
    id: 'macro',
    name: 'Macro Agent',
    role: 'Global Rates & Systemic Policy',
    icon: Globe2,
    summary: 'Studies sovereign bond yields, inflation curves, central bank rhetoric, FX rates, and commodities.',
    inputs: ['Central bank meeting statements & dot plots', 'Sovereign yield curves', 'Inflation prints (CPI/PCE)', 'Global trade balance data'],
    analysis: ['Monetary policy impulse modeling', 'Yield curve inversion & term premia', 'Currency debasement pressures'],
    output: ['Macro regime scorecard', 'Rate expectations matrix', 'Commodity shock sensitivities'],
  },
  {
    id: 'events',
    name: 'Event Intelligence Agent',
    role: 'Catalyst & Anomaly Detection',
    icon: Zap,
    summary: 'Tracks potentially market-moving scheduled and unscheduled catalysts across sectors and supply chains.',
    inputs: ['Economic calendars & earnings dates', 'Geopolitical development feeds', 'FDA approval calendars', 'Merger & antitrust filings'],
    analysis: ['Historical event distribution modeling', 'Implied vs. realized event volatility', 'Spillover network contagion analysis'],
    output: ['Event risk ratings', 'First-order and second-order impact graphs', 'Pre/post-event playbooks'],
  },
  {
    id: 'sentiment',
    name: 'Sentiment Agent',
    role: 'Narrative Drift & Crowding',
    icon: Radio,
    summary: 'Evaluates changes in institutional positioning, retail sentiment, and consensus narrative shifts.',
    inputs: ['Institutional 13F filings', 'Options put/call skew', 'Financial media narrative volume', 'Analyst estimate revisions'],
    analysis: ['Consensus crowding metrics', 'Narrative velocity & exhaustion', 'Expectation gap analysis'],
    output: ['Narrative inflection signals', 'Crowding risk indices', 'Contrarian sentiment alerts'],
  },
  {
    id: 'strategy',
    name: 'Strategy Agents',
    role: 'Autonomous Hypothesis Formulation',
    icon: Sliders,
    summary: 'Transforms synthesized intelligence into testable quantitative hypotheses and discrete strategy candidates.',
    inputs: ['Multi-agent research synthesis', 'Factor exposure requirements', 'Historical feature datasets'],
    analysis: ['Hypothesis formalization', 'Out-of-sample statistical validation', 'Expected return vs. drawdown simulation'],
    output: ['Actionable strategy proposals', 'Confidence intervals & parameter bounds', 'Pre-trade thesis documents'],
  },
  {
    id: 'risk',
    name: 'Risk Agent',
    role: 'Independent Exposure Governance',
    icon: ShieldAlert,
    summary: 'Evaluates portfolio factor concentration, tail-risk drawdowns, and enforces unconditional safety limits.',
    inputs: ['Proposed strategy allocations', 'Portfolio asset exposure', 'Historical stress-test scenarios', 'Liquidity profiles'],
    analysis: ['Value at Risk (VaR) & Expected Shortfall', 'Correlated drawdown simulation', 'Max leverage & sector concentration checks'],
    output: ['Hard approval / sizing modification / veto', 'Margin buffer reservations', 'Dynamic hedge instructions'],
  },
  {
    id: 'memory',
    name: 'Memory Agent',
    role: 'Institutional Decision Retrospectives',
    icon: Database,
    summary: 'Indexes decisions, rationale, market regimes, and outcomes into a perpetual institutional memory core.',
    inputs: ['Original agent hypotheses', 'Pre-decision state snapshot', 'Post-decision market outcomes', 'Execution slippage data'],
    analysis: ['Attribution deconstruction (Skill vs. Luck)', 'Regime matching to historical analogues', 'Failure mode classification'],
    output: ['Perpetual decision index', 'Prior-case retrieval for new events', 'Feedback updates to agent prompt weights'],
  },
]

export function IntelligenceLayer() {
  const [activeModal, setActiveModal] = useState<AgentDetail | null>(null)

  return (
    <section id="intelligence" className="py-20 sm:py-28 bg-white dark:bg-neutral-950 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>SPECIALIZED AGENT ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Meet the Intelligence Layer.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Rather than relying on a single monolithic model, Dhanvi orchestrates specialized AI agents.
            Each agent focuses on a distinct dimension of the global financial matrix, collaborating
            and debating in real time. Click any card to inspect its analytical pipeline.
          </p>
        </div>

        {/* 9 Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {AGENTS.map((agent) => {
            const Icon = agent.icon
            return (
              <div
                key={agent.id}
                onClick={() => setActiveModal(agent)}
                className="group relative p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-neutral-900 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded-full">
                      INSPECT ↗
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {agent.role}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {agent.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active Node
                  </span>
                  <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-semibold flex items-center gap-1 transition-colors">
                    Inputs → Output <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Detailed Modal / Panel for Selected Agent */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 text-white p-6 sm:p-8 shadow-2xl overflow-hidden font-sans">
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <activeModal.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      {activeModal.role}
                    </div>
                    <h3 className="text-xl font-bold text-white mt-0.5">{activeModal.name}</h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pipeline: INPUTS → ANALYSIS → OUTPUT */}
              <div className="space-y-5">
                {/* Inputs */}
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>01. INPUT DATA STREAMS</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {activeModal.inputs.map((inp) => (
                      <li key={inp} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400/80" />
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Analysis */}
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>02. SPECIALIZED REASONING & ANALYSIS</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {activeModal.analysis.map((ana) => (
                      <li key={ana} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
                        <span>{ana}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Output */}
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>03. DOWNSTREAM DELIVERABLES & ARTIFACTS</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200">
                    {activeModal.output.map((out) => (
                      <li key={out} className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Close Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-850 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
