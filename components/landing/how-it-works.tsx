'use client'

import React, { useState } from 'react'
import {
  Inbox,
  Layers,
  Activity,
  MessageSquareText,
  BellRing,
  Zap,
  ArrowUpRight,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

type Capability = {
  num: string
  title: string
  subtitle: string
  icon: any
  body: string
  signal: string
  deepDive: {
    headline: string
    overview: string
    bulletPoints: string[]
    technicalTag: string
  }
}

const PILLARS: Capability[] = [
  {
    num: '01',
    title: '1. Capture',
    subtitle: 'Bring transactions & financial documents together',
    icon: Inbox,
    body: 'Captures bank statements, UPI credits, GST invoices, and POS transactions the instant they occur — with zero manual voucher typing.',
    signal: 'Auto-OCR & Statement Ingest',
    deepDive: {
      headline: 'Multi-Stream Automated Ingestion',
      overview: 'Connects directly to bank statements, email invoices, and mobile UPI feeds. Parses PDF receipts, extracts GSTIN, and structures raw transaction data in milliseconds.',
      bulletPoints: [
        'Automated OCR extraction of GSTIN, HSN codes, and line items',
        'Direct CSV/Excel statement reconciliation',
        'UPI & QR settlement notification parsing',
        'Duplicate transaction filtering & hash deduplication',
      ],
      technicalTag: 'Stream Ingest Protocol',
    },
  },
  {
    num: '02',
    title: '2. Understand',
    subtitle: 'Categorize & maintain balanced books',
    icon: Layers,
    body: 'Maps every transaction to its proper Chart of Accounts, validates double-entry ledger balance, and maintains unbroken audit trails.',
    signal: 'Double-Entry Invariants',
    deepDive: {
      headline: 'Strict Double-Entry Invariants & Classification',
      overview: 'Dhanvi continuously validates transaction relationships and maintains balanced accounting records (Debits = Credits) while preserving an immutable, audit-ready trail.',
      bulletPoints: [
        'Automatic transaction classification to Chart of Accounts',
        'Deterministic double-entry validation (Δ ₹0.00 balancing)',
        'Ledger consistency checks & unbroken audit trail',
        'Real-time tax liability & GST input credit allocation',
        'Automated exception and discrepancy detection',
      ],
      technicalTag: 'GAAP & ICAI Accounting Kernel',
    },
  },
  {
    num: '03',
    title: '3. Monitor',
    subtitle: 'Continuously watch cash, margins & expenses',
    icon: Activity,
    body: 'Tracks liquid bank headroom, gross margins per product SKU, operating burn, and debtor payment cycles in real time.',
    signal: 'Live Ledger Recalculation',
    deepDive: {
      headline: 'Real-Time Financial Metrics & Margin Watch',
      overview: 'Eliminates 30-day reporting blindspots. P&L, balance sheets, and liquid cash headroom update immediately as transactions post.',
      bulletPoints: [
        'Real-time product SKU gross margin recalculation',
        'Debtor aging schedule categorization (0–30, 31–60, 60+ days)',
        'Operating burn and runway forecasting',
        'Multi-location stock valuation updates',
      ],
      technicalTag: 'Continuous KPI Engine',
    },
  },
  {
    num: '04',
    title: '4. Explain',
    subtitle: 'Ask questions in plain conversational language',
    icon: MessageSquareText,
    body: 'Query financial health, cash runway, or customer aging without building pivot tables or waiting for custom accounting reports.',
    signal: 'Deterministic AI Math',
    deepDive: {
      headline: 'Conversational Natural Language Interface',
      overview: 'Ask natural business questions and receive mathematically grounded answers derived directly from live journal entries — zero hallucinated numbers.',
      bulletPoints: [
        'Plain-English and conversational Indian context queries',
        'Instant answers for cash runway, debtor balances, and profit drops',
        'Direct links to underlying source transactions and invoices',
        'Exportable executive summaries for board and partner reviews',
      ],
      technicalTag: 'Deterministic Query Router',
    },
  },
  {
    num: '05',
    title: '5. Alert',
    subtitle: 'Know the moment something needs attention',
    icon: BellRing,
    body: 'Surfaces supplier cost increases, duplicate payments, margin leaks, and overdue customer invoices weeks before month-end.',
    signal: 'Proactive Signal Engine',
    deepDive: {
      headline: 'Proactive Early-Warning Signal Engine',
      overview: 'Identifies micro-trends before they compound into major losses. Alerts founders and accountants simultaneously on pricing shifts and aging receivables.',
      bulletPoints: [
        'Supplier unit price hike detection across consecutive bills',
        'Debtor delay alerts prior to committed payroll disbursements',
        'Unusual expense spike detection vs 6-month trailing baselines',
        'Inventory low-stock and deadweight alerts',
      ],
      technicalTag: 'Automated Anomaly Watch',
    },
  },
  {
    num: '06',
    title: '6. Act',
    subtitle: 'Get actionable next steps instead of another report',
    icon: Zap,
    body: 'Execute 1-click WhatsApp debtor reminders, trigger supplier price reviews, and share audit-ready packs with your CA.',
    signal: 'Human-Approved Execution',
    deepDive: {
      headline: 'Decision Support with Human-in-the-Loop',
      overview: 'Turns financial analysis into immediate action. Proposes concrete next steps while ensuring all major financial decisions remain under explicit founder approval.',
      bulletPoints: [
        '1-click WhatsApp payment reminders with instant UPI QR links',
        'Draft supplier renegotiation briefs with exact cost impact',
        '1-click export of Trial Balance, P&L, and Ledger to Tally/Excel',
        'Seamless CA review and tax filing queue',
      ],
      technicalTag: 'Action Orchestration Protocol',
    },
  },
]

export function HowItWorks() {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null)

  return (
    <section id="how-it-works" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 bg-background">
      <SectionHeading
        eyebrow="Core Capabilities"
        title="Your finance team shouldn't spend its time moving numbers."
        description="Six continuous capabilities working together as a single unified financial intelligence system. Click any capability to inspect details."
      />

      {/* Grid of 6 Process Cards */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon
          return (
            <Reveal key={pillar.num} delay={i * 60}>
              <div
                onClick={() => setSelectedCapability(pillar)}
                className="group h-full rounded-2xl border border-border bg-card p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-foreground/[0.03] flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-neutral-950 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-700 font-medium">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                    {pillar.signal}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCapability(pillar)
                    }}
                    className="text-emerald-700 hover:text-emerald-900 font-bold inline-flex items-center gap-0.5 text-xs group-hover:underline cursor-pointer"
                  >
                    Active <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Interactive Detail Modal / Drawer */}
      {selectedCapability && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCapability.title}
        >
          <div
            className="absolute inset-0 bg-neutral-950/75 backdrop-blur-sm"
            onClick={() => setSelectedCapability(null)}
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-fade-up">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-neutral-950">{selectedCapability.title}</h3>
                  <p className="text-[10px] font-mono text-muted-foreground">{selectedCapability.deepDive.technicalTag}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCapability(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-neutral-950 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-7 space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="text-base font-bold text-neutral-950">
                  {selectedCapability.deepDive.headline}
                </h4>
                <p className="mt-2 text-neutral-700 leading-relaxed font-medium">
                  {selectedCapability.deepDive.overview}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-200 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                  Key Capabilities & Architecture:
                </p>
                <ul className="space-y-2 text-xs text-neutral-800">
                  {selectedCapability.deepDive.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-3.5 text-xs">
              <span className="font-mono text-muted-foreground">Deterministic Accounting Engine</span>
              <button
                type="button"
                onClick={() => setSelectedCapability(null)}
                className="px-4 py-1.5 rounded-full bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-850 transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
