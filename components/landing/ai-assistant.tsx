'use client'

import React, { useState } from 'react'
import {
  ArrowRight,
  Sparkles,
  Send,
  Bot,
  User,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Clock,
  DollarSign,
  Package,
} from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

type QAPair = {
  question: string
  answer: string
  metrics: { label: string; value: string; change?: 'positive' | 'negative' | 'neutral' }[]
  insight: string
  action: string
}

const DEMO_QUESTIONS: Record<string, QAPair> = {
  'Why did profit fall this month?': {
    question: 'Why did profit fall this month?',
    answer:
      'Operating profit declined 8.4%, primarily because raw-material costs increased 13.2% while average selling prices remained almost unchanged across wholesale channels.',
    metrics: [
      { label: 'Revenue Growth', value: '+8.1%', change: 'positive' },
      { label: 'COGS Increase', value: '+13.2%', change: 'negative' },
      { label: 'Net Profit', value: '₹6.59L', change: 'negative' },
    ],
    insight: 'Product X gross margin fell from 24% to 11% due to packaging and supplier cost inflation.',
    action: 'Re-negotiate bulk procurement pricing with your top packaging suppliers or review wholesale pricing.',
  },
  'Who owes us money?': {
    question: 'Who owes us money?',
    answer:
      'You have ₹4.82 Lakh in outstanding receivables across 14 active debtor accounts. ₹2.40 Lakh is currently overdue past 30 days.',
    metrics: [
      { label: 'Total Receivables', value: '₹4.82L', change: 'neutral' },
      { label: 'Current (0-30d)', value: '₹2.42L', change: 'positive' },
      { label: 'Overdue (30d+)', value: '₹2.40L', change: 'negative' },
    ],
    insight: 'Apex Retailers (₹1.40L) and Metro Traders (₹72,000) account for 88% of aging receivables.',
    action: 'Send 1-click automated payment reminders via WhatsApp with instant UPI quick-pay links.',
  },
  'Which products have the lowest margins?': {
    question: 'Which products have the lowest margins?',
    answer:
      'Across your 48 inventory items, 3 SKUs are performing substantially below your target 30% gross margin threshold.',
    metrics: [
      { label: 'Lowest SKU Margin', value: '8.4%', change: 'negative' },
      { label: 'Catalog Average', value: '35.8%', change: 'positive' },
      { label: 'Top Margin SKU', value: '52.1%', change: 'positive' },
    ],
    insight: 'Standard Corrugated Boxes (8.4% margin) and Bulk Adhesive Tape (11.2% margin) are currently eroding net profitability.',
    action: 'Bundle low-margin packing consumables with premium items or establish a minimum order quantity (MOQ).',
  },
  'Can we afford to purchase ₹10 lakh of inventory?': {
    question: 'Can we afford to purchase ₹10 lakh of inventory?',
    answer:
      'Purchasing ₹10 Lakh in inventory today will temporarily tighten your 30-day liquid cash buffer from ₹9.24L to ₹2.14L after accounting for committed vendor payables.',
    metrics: [
      { label: 'Liquid Cash Now', value: '₹9.24L', change: 'positive' },
      { label: 'Committed Payables', value: '₹3.14L', change: 'neutral' },
      { label: 'Projected Buffer', value: '₹2.14L', change: 'negative' },
    ],
    insight: 'Your current liquid cash is ₹9.24L, but scheduled payables of ₹3.14L are due within 14 days.',
    action: 'Request a 30-day supplier credit term or split the order into two ₹5L tranches across 2 weeks.',
  },
  'Where are we spending too much?': {
    question: 'Where are we spending too much?',
    answer:
      'Operating expenses are ₹11.83 Lakh MTD. Packaging supplies and outbound logistics have exceeded normal 6-month budget allocations by 31%.',
    metrics: [
      { label: 'Total Expenses', value: '₹11.83L', change: 'neutral' },
      { label: 'Packaging Over-spend', value: '+31.0%', change: 'negative' },
      { label: 'Admin Overhead', value: 'Normal (12%)', change: 'positive' },
    ],
    insight: 'Freight handling expenses rose ₹85,000 this month due to expedited shipping surcharges.',
    action: 'Consolidate freight shipments to standard dispatch schedules and review vendor rate cards.',
  },
  'How much profit did we make this month?': {
    question: 'How much profit did we make this month?',
    answer:
      'Your net profit MTD stands at ₹6.59 Lakh on ₹18.42 Lakh of revenue, delivering an overall net profit margin of 35.8%.',
    metrics: [
      { label: 'Revenue (MTD)', value: '₹18.42L', change: 'positive' },
      { label: 'Total Costs', value: '₹11.83L', change: 'neutral' },
      { label: 'Net Margin', value: '35.8%', change: 'positive' },
    ],
    insight: 'Net margin is up 4.2% quarter-over-quarter due to improved pricing discipline on direct B2B contracts.',
    action: 'Maintain current pricing structures while monitoring supplier raw material shifts.',
  },
}

const QUESTION_KEYS = Object.keys(DEMO_QUESTIONS)

export function AiAssistant() {
  const [activeQuestion, setActiveQuestion] = useState<string>(QUESTION_KEYS[0])
  const [currentQA, setCurrentQA] = useState<QAPair>(DEMO_QUESTIONS[QUESTION_KEYS[0]])
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [customInput, setCustomInput] = useState<string>('')

  const handleSelectQuestion = (qKey: string) => {
    if (isThinking) return
    setActiveQuestion(qKey)
    setIsThinking(true)

    // Simulate fast 600ms deterministic calculation
    setTimeout(() => {
      const match = DEMO_QUESTIONS[qKey] || DEMO_QUESTIONS[QUESTION_KEYS[0]]
      setCurrentQA(match)
      setIsThinking(false)
    }, 600)
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customInput.trim() || isThinking) return

    const trimmed = customInput.trim()
    const matchKey =
      QUESTION_KEYS.find((k) => k.toLowerCase().includes(trimmed.toLowerCase())) || QUESTION_KEYS[0]

    setActiveQuestion(matchKey)
    setIsThinking(true)
    setCustomInput('')

    setTimeout(() => {
      setCurrentQA(DEMO_QUESTIONS[matchKey])
      setIsThinking(false)
    }, 600)
  }

  return (
    <section id="ai-assistant" className="relative border-y border-border bg-muted/20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="AI Finance Assistant"
          title="Ask your business anything."
          description="No dashboards to memorize, no manual pivot tables. Ask in plain English and get immediate answers grounded in live double-entry accounting."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 items-start">
          {/* Question Selector Column (Left) */}
          <Reveal className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Click any real financial prompt to test:
              </p>
              <p className="text-sm text-neutral-900 mt-1 font-medium">
                Dhanvi queries live journals, customer ledgers, and SKU margins instantly:
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {QUESTION_KEYS.map((qKey) => {
                const isSelected = activeQuestion === qKey
                return (
                  <button
                    key={qKey}
                    type="button"
                    onClick={() => handleSelectQuestion(qKey)}
                    className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-xs font-bold ring-1 ring-emerald-500/30'
                        : 'border-border bg-card text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 shadow-2xs'
                    }`}
                  >
                    <span className={isSelected ? 'text-emerald-950 font-bold' : 'group-hover:text-neutral-950'}>
                      {qKey}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ml-2 transition-all ${
                        isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-neutral-400 group-hover:text-neutral-950'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Living Chat Preview Column (Right) */}
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/[0.04]">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-neutral-950">Dhanvi AI Assistant</span>
                    <span className="text-[10px] text-muted-foreground ml-2 font-mono">● Connected to General Ledger</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Deterministic Math
                </span>
              </div>

              {/* Chat Conversation View */}
              <div className="flex min-h-[380px] flex-col gap-4 p-5 sm:p-6">
                {/* 1. User Message */}
                <div className="flex justify-end animate-fade-up">
                  <div className="max-w-[88%] rounded-2xl rounded-br-xs bg-neutral-950 px-4 py-3 text-xs sm:text-sm text-white font-medium shadow-xs">
                    <div className="flex items-center gap-1.5 opacity-75 text-[10px] uppercase font-bold tracking-wider mb-1">
                      <User className="h-3 w-3" />
                      <span>Business Owner</span>
                    </div>
                    <p className="leading-snug font-semibold">{currentQA.question}</p>
                  </div>
                </div>

                {/* 2. Dhanvi Thinking State or Response */}
                {isThinking ? (
                  <div className="flex justify-start animate-fade-up">
                    <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-xs border border-border bg-muted/50 px-4 py-3.5 text-xs text-neutral-700">
                      <Sparkles className="h-4 w-4 text-emerald-600 animate-spin" />
                      <span className="font-medium">Analyzing General Ledger data & journal balances...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start animate-fade-up">
                    <div className="max-w-[92%] rounded-2xl rounded-bl-xs border border-border bg-muted/30 p-4 sm:p-5 text-neutral-950 shadow-2xs space-y-3.5">
                      {/* Dhanvi Tag */}
                      <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] uppercase font-bold tracking-wider">
                        <Bot className="h-3.5 w-3.5" />
                        <span>Dhanvi</span>
                      </div>

                      {/* Main Answer Paragraph */}
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-neutral-900">
                        {currentQA.answer}
                      </p>

                      {/* Financial KPI Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {currentQA.metrics.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-card border border-border text-center shadow-2xs">
                            <p className="text-[10px] text-muted-foreground font-semibold truncate">{m.label}</p>
                            <p
                              className={`font-mono font-bold text-xs sm:text-sm mt-0.5 ${
                                m.change === 'positive'
                                  ? 'text-emerald-700'
                                  : m.change === 'negative'
                                  ? 'text-rose-700'
                                  : 'text-neutral-950'
                              }`}
                            >
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Specific Highlight Alert */}
                      <div className="rounded-xl bg-amber-50/90 p-3 border border-amber-200/80 text-xs text-amber-950 font-medium flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{currentQA.insight}</span>
                      </div>

                      {/* Recommended Action Card */}
                      <div className="rounded-xl bg-emerald-50/80 p-3 border border-emerald-200 text-xs text-emerald-950">
                        <p className="font-bold text-[10px] uppercase tracking-wider text-emerald-800">
                          Recommended Action:
                        </p>
                        <p className="mt-0.5 leading-snug font-semibold">{currentQA.action}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="border-t border-border bg-card p-3 sm:p-4">
                <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Ask about profit, debtors, expenses, cash runway..."
                    className="flex-1 bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!customInput.trim() || isThinking}
                    className="p-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer shrink-0"
                    aria-label="Send Query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
