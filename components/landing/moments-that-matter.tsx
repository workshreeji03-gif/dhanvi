'use client'

import React, { useState } from 'react'
import {
  TrendingDown,
  AlertTriangle,
  Clock,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldAlert,
  Bot,
  MessageSquareText,
  X,
} from 'lucide-react'
import { SectionHeading } from './section-heading'

export interface SignalCardData {
  id: string
  category: string
  title: string
  badge: string
  badgeColor: string
  icon: any
  theSignal: string
  dhanviAction: string
  metric: string
  impactValue: string
  analysisHeader: string
  primaryCauses: { label: string; value: string; color?: string }[]
  findings: string[]
  recommendedAction: string
  actionButtonText: string
  askPrompt: string
}

const SIGNAL_CARDS: SignalCardData[] = [
  {
    id: 'margin-leak',
    category: 'Margin Leak',
    title: 'Product X gross margin fell 13%',
    badge: 'Margin Leak',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: TrendingDown,
    theSignal: 'Raw material procurement cost increased ₹45/unit without sales price adjustment.',
    dhanviAction: 'Dhanvi recommends adjusting wholesale tier prices by 6% or renegotiating MOQ.',
    metric: 'Saved ₹1.8L / Qtr',
    impactValue: '₹1.8L Quarterly Leakage',
    analysisHeader: 'Margin dropped from 24% → 11%',
    primaryCauses: [
      { label: 'Raw material cost', value: '+13.2%', color: 'text-rose-700' },
      { label: 'Packaging cost', value: '+31.0%', color: 'text-rose-700' },
      { label: 'Selling price', value: '+0.8%', color: 'text-neutral-900' },
    ],
    findings: [
      'Raw material supplier invoice posted at +13.2% higher unit cost.',
      'Selling price on Wholesale Tier 1 remained unchanged at ₹450/unit.',
      'Gross margin eroded from baseline 24% down to 11%.',
      'Current purchase volume will compound to ₹1,80,000 loss over 90 days if unaddressed.',
    ],
    recommendedAction: 'Renegotiate packaging supplier pricing OR adjust wholesale pricing by approximately 6%.',
    actionButtonText: 'Review Supplier Pricing & Margin',
    askPrompt: 'Why did profit fall this month?',
  },
  {
    id: 'cost-spike',
    category: 'Cost Spike',
    title: 'Packaging spend is 31% above 6-month baseline',
    badge: 'Cost Spike',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: AlertTriangle,
    theSignal: '3 separate invoices posted with surge logistics rates across standard parcel shipments.',
    dhanviAction: 'Dhanvi flagged carrier rates for supplier contract renegotiation.',
    metric: '₹85,000 Recovered',
    impactValue: '₹85,000 Overcharge',
    analysisHeader: 'Packaging spend surge: 31% above baseline',
    primaryCauses: [
      { label: 'Peak surcharge', value: '+₹28/kg', color: 'text-rose-700' },
      { label: 'Spend baseline', value: '₹1.95L → ₹2.55L', color: 'text-rose-700' },
      { label: 'SLA contract rate', value: 'Guaranteed Fixed', color: 'text-emerald-700' },
    ],
    findings: [
      '3 consecutive logistics bills posted with unannounced ₹28/kg peak surcharge.',
      'Trailing 6-month logistics spend baseline was ₹1.95L vs current ₹2.55L.',
      'Carrier contract SLA guarantees fixed freight rate through end of fiscal year.',
      'Surge surcharge was applied in error by carrier automated billing system.',
    ],
    recommendedAction: 'Issue formal billing dispute notice to freight carrier citing contracted SLA rate card.',
    actionButtonText: 'Generate SLA Dispute Notice',
    askPrompt: 'Where are we spending too much?',
  },
  {
    id: 'debtor-aging',
    category: 'Debtor Aging',
    title: '₹4.82L receivables overdue past 45 days',
    badge: 'Debtor Aging',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: Clock,
    theSignal: '2 wholesale clients delayed payment, threatening next week’s vendor disbursement.',
    dhanviAction: 'Triggered 1-click WhatsApp payment reminders with UPI QR links.',
    metric: '72% Collected in 48h',
    impactValue: '₹4.82L Overdue Cash',
    analysisHeader: 'Receivables aging past credit threshold',
    primaryCauses: [
      { label: 'Overdue >45 Days', value: '₹4.82L', color: 'text-rose-700' },
      { label: 'UPI QR Collection', value: '72% in 48h', color: 'text-emerald-700' },
      { label: 'Vendor Payroll Due', value: '₹3.14L in 6d', color: 'text-amber-700' },
    ],
    findings: [
      'Apex Retailers (₹1.40L) and Metro Traders (₹72,000) exceeded 45-day credit terms.',
      'Committed vendor disbursement of ₹3.14L scheduled for execution in 6 days.',
      'Historical debtor behavior shows 82% payment within 48h when UPI QR link is sent via WhatsApp.',
      'Proactive reminder prevents need to draw on high-interest working capital credit line.',
    ],
    recommendedAction: 'Dispatch automated WhatsApp payment reminders with integrated 1-click UPI quick-pay QR links.',
    actionButtonText: 'Send 1-Click WhatsApp Reminders',
    askPrompt: 'Who owes us money?',
  },
  {
    id: 'cash-forecast',
    category: 'Cash Forecast',
    title: '₹10L inventory purchase may tighten 30-day runway',
    badge: 'Cash Forecast',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: ShoppingCart,
    theSignal: 'Unplanned bulk PO would reduce liquid bank buffer below the 2-month threshold.',
    dhanviAction: 'Dhanvi suggested 50/50 phased delivery terms over 30 days.',
    metric: 'Zero Cash Strain',
    impactValue: '₹10.0L Bulk Order',
    analysisHeader: 'Working capital runway impact projection',
    primaryCauses: [
      { label: 'Upfront PO', value: '₹10.0L', color: 'text-neutral-900' },
      { label: 'Liquid Bank Balance', value: '₹9.24L', color: 'text-emerald-700' },
      { label: 'Buffer Preserved', value: '₹5.0L Buffer', color: 'text-emerald-700' },
    ],
    findings: [
      'Pending draft Purchase Order #PO-941 totals ₹10,00,000 in raw stock inventory.',
      'Liquid bank balance is ₹9.24L with upcoming scheduled payables of ₹3.14L.',
      'Executing 100% upfront PO payment reduces liquid cash buffer to ₹2.14L (below safety floor).',
      'Supplier has accepted 50/50 split delivery terms on previous 3 bulk orders.',
    ],
    recommendedAction: 'Split procurement into two ₹5L tranches spaced 15 days apart to preserve liquid runway.',
    actionButtonText: 'Split Purchase Order Terms',
    askPrompt: 'Can we afford to purchase ₹10 lakh of inventory?',
  },
]

export function MomentsThatMatter() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null)

  const activeCard = SIGNAL_CARDS[activeIndex]
  const ActiveIcon = activeCard.icon

  const handleSelectCard = (index: number) => {
    if (index === activeIndex && isOpen && !isAnalyzing) return
    setActiveIndex(index)
    setIsOpen(true)
    setIsAnalyzing(true)
    setActionDoneMsg(null)

    setTimeout(() => {
      setIsAnalyzing(false)
    }, 550)
  }

  const handlePrev = () => {
    const newIdx = (activeIndex - 1 + SIGNAL_CARDS.length) % SIGNAL_CARDS.length
    handleSelectCard(newIdx)
  }

  const handleNext = () => {
    const newIdx = (activeIndex + 1) % SIGNAL_CARDS.length
    handleSelectCard(newIdx)
  }

  const handleExecuteAction = () => {
    setActionDoneMsg(`Executed: "${activeCard.actionButtonText}"`)
    setTimeout(() => setActionDoneMsg(null), 4000)
  }

  const handleAskDhanvi = () => {
    const element = document.getElementById('ai-assistant')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="signals-demo" className="relative py-24 sm:py-28 bg-background border-b border-border font-sans">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Proactive Intelligence Demo"
          title="Moments that matter: catching financial leaks before they compound."
          description="Dhanvi doesn't just show historical charts. It continuously monitors margins, vendor rate cards, debtor aging, and cash buffer. Click any signal card to open the live Dhanvi analysis."
        />

        {/* 4 Interactive Financial Signal Cards Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNAL_CARDS.map((card, idx) => {
            const Icon = card.icon
            const isSelected = activeIndex === idx && isOpen
            return (
              <div
                key={card.id}
                onClick={() => handleSelectCard(idx)}
                className={`group h-full rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md shadow-emerald-500/[0.08] ring-2 ring-emerald-500/30 scale-[1.01]'
                    : 'border-border bg-card hover:border-neutral-300 hover:bg-neutral-50/60 shadow-xs'
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectCard(idx)
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-emerald-100 text-emerald-900' : 'bg-neutral-100 text-neutral-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-bold text-sm sm:text-base text-neutral-950 leading-snug">
                    {card.title}
                  </h3>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-card border border-border/80">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                        The Signal
                      </p>
                      <p className="text-neutral-700 mt-0.5 leading-relaxed font-medium">
                        {card.theSignal}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                        Dhanvi Action
                      </p>
                      <p className="mt-0.5 leading-relaxed font-semibold">
                        {card.dhanviAction}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-700">{card.metric}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectCard(idx)
                    }}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected ? 'text-emerald-800 underline' : 'text-neutral-600 group-hover:text-neutral-950'
                    }`}
                  >
                    Live Signal <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Detailed Expanded Dhanvi Analysis Panel */}
        {isOpen && (
          <div className="mt-8 overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-card shadow-2xl shadow-foreground/[0.04] animate-fade-up">
            {/* Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  ● LIVE SIGNAL
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  Detected 2 minutes ago
                </span>
              </div>

              {/* Prev / Next & Card Counter */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 mr-2">
                  {activeIndex + 1} / {SIGNAL_CARDS.length}
                </span>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-muted transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-muted transition-colors cursor-pointer"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-neutral-100 hover:text-neutral-950 transition-colors ml-1 cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Analysis Loading or Content */}
            {isAnalyzing ? (
              <div className="py-16 px-6 text-center animate-fade-up">
                <Sparkles className="w-7 h-7 text-emerald-600 animate-spin mx-auto mb-3" />
                <p className="text-sm font-bold text-neutral-950">Dhanvi is analyzing journal ledgers & vendor history...</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">Evaluating {activeCard.badge} telemetry & price variance</p>
              </div>
            ) : (
              <div className="p-6 sm:p-8 space-y-6 animate-fade-up">
                {/* Title & Badge */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-100/70 text-emerald-900 shrink-0">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                          DHANVI ANALYSIS
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${activeCard.badgeColor}`}>
                          {activeCard.badge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mt-1">
                        {activeCard.analysisHeader}
                      </h4>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-3 text-left sm:text-right shrink-0">
                    <p className="text-[10px] font-mono uppercase font-bold text-emerald-800">Estimated Impact</p>
                    <p className="font-mono text-2xl font-extrabold text-emerald-950 mt-0.5">{activeCard.metric}</p>
                  </div>
                </div>

                {/* Primary Causes Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {activeCard.primaryCauses.map((cause, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-muted/40 border border-border text-center">
                      <p className="text-[11px] text-muted-foreground font-semibold truncate">{cause.label}</p>
                      <p className={`font-mono text-sm sm:text-base font-extrabold mt-0.5 ${cause.color || 'text-neutral-950'}`}>
                        {cause.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* What Dhanvi Found (Bullet List) */}
                <div className="rounded-2xl bg-neutral-50/80 p-5 border border-neutral-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-950 font-mono">
                      What Dhanvi Found
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-800 font-medium">
                    {activeCard.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Action Card & Action Buttons */}
                <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                      Recommended Action
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
                      {activeCard.recommendedAction}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleExecuteAction}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-850 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span>{activeCard.actionButtonText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>

                    <button
                      type="button"
                      onClick={handleAskDhanvi}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-all cursor-pointer"
                    >
                      <MessageSquareText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ask Dhanvi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center justify-center rounded-full border border-border bg-card px-3 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {actionDoneMsg && (
                  <div className="rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-fade-up">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{actionDoneMsg}</span>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Telemetry Footer */}
            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-5 py-3 sm:px-8 text-xs text-muted-foreground font-mono">
              <span>● Continuous Accounting Telemetry</span>
              <span>Zero Decision Lag</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
