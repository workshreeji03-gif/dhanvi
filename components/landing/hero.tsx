'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Lightbulb,
  PlayCircle,
  X,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
} from 'lucide-react'
import { MetricCard } from './metric-card'
import { Reveal } from './reveal'
import { EarlyAccessButton, TourButton } from './ui-context'

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden pt-28 sm:pt-32 pb-12">
      {/* Subtle atmospheric glow & grain texture */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-positive/10 via-info/5 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Copy */}
          <div className="max-w-xl">
            <Reveal
              as="span"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-2xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-positive" />
              The AI Finance Operating System
            </Reveal>

            <Reveal
              as="h1"
              delay={60}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Your business finances.{' '}
              <span className="text-positive font-bold">Always up to date.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={120}
              className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Dhanvi continuously captures, organizes, and understands your business finances —
              giving you a live view of cash flow, profit, expenses, inventory, and financial
              health.
            </Reveal>

            <Reveal delay={180} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:bg-neutral-850 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Launch App
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <EarlyAccessButton source="hero" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                Join Early Access
              </EarlyAccessButton>
              <TourButton className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                <PlayCircle className="h-4 w-4 text-positive" />
                Watch a 60-second tour
              </TourButton>
            </Reveal>

            <Reveal
              as="p"
              delay={220}
              className="mt-5 text-xs sm:text-sm text-muted-foreground font-medium"
            >
              Works alongside your accountant. Automates the repetitive work.
            </Reveal>
          </div>

          {/* Interactive Living Dashboard */}
          <Reveal delay={120} className="relative">
            <HeroDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const ROTATING_INSIGHTS = [
  {
    id: 'packaging',
    badgeText: 'Packaging expenses are 31% higher than your 6-month average.',
    badgeIcon: TrendingUp,
    badgeColor: 'bg-warning/10 text-warning',
    why: 'Revenue increased 8%, but packaging unit costs jumped 31% across 3 suppliers.',
    action: 'Review current supplier pricing and consolidate purchase volume.',
    source: 'Calculated from 142 posted invoices & vendor ledgers.',
  },
  {
    id: 'cash-cycle',
    badgeText: 'Cash conversion cycle slowed by 8% this week.',
    badgeIcon: AlertTriangle,
    badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    why: '3 customer invoices (₹2.4L total) reached 45+ days overdue from Wholesale clients.',
    action: 'Trigger automated WhatsApp statement & offer 2% prompt payment discount.',
    source: 'Calculated from debtor aging schedules.',
  },
  {
    id: 'margin-shift',
    badgeText: 'Product X gross margin dropped from 24% to 18%.',
    badgeIcon: Scale,
    badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    why: 'Supplier component cost increased ₹45/unit without selling price adjustment.',
    action: 'Update retail price list or renegotiate minimum bulk order discount.',
    source: 'Calculated from multi-location SKU stock movements.',
  },
]

function HeroDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [insightIndex, setInsightIndex] = useState(0)
  const [aiExpanded, setAiExpanded] = useState(false)
  const [actionDone, setActionDone] = useState(false)

  // Rotating realistic AI insights every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % ROTATING_INSIGHTS.length)
      setActionDone(false)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const currentInsight = ROTATING_INSIGHTS[insightIndex]
  const BadgeIcon = currentInsight.badgeIcon

  const metricDetails: Record<
    string,
    { title: string; subtitle: string; breakdown: { name: string; amount: string; share: string }[] }
  > = {
    Revenue: {
      title: 'Operating Revenue Breakdown',
      subtitle: 'Trailing 30 Days (12.4% vs last month)',
      breakdown: [
        { name: 'Wholesale Electronics Sales', amount: '₹14.20L', share: '77%' },
        { name: 'Direct B2B Orders', amount: '₹3.42L', share: '19%' },
        { name: 'Maintenance & Service Fees', amount: '₹80,000', share: '4%' },
      ],
    },
    Expenses: {
      title: 'Operating Expenses Breakdown',
      subtitle: 'Primary Cost Drivers (8.1% vs last month)',
      breakdown: [
        { name: 'Raw Materials / Inventory COGS', amount: '₹7.20L', share: '61%' },
        { name: 'Logistics & Packaging', amount: '₹2.45L', share: '21%' },
        { name: 'Rent, Power & Salaries', amount: '₹2.18L', share: '18%' },
      ],
    },
    'Net Profit': {
      title: 'Net Profit Margin Analysis',
      subtitle: '35.8% Net Margin (Expanded 21.2% QoQ)',
      breakdown: [
        { name: 'Gross Profit', amount: '₹11.22L', share: '60.9%' },
        { name: 'Operating Margin', amount: '₹7.40L', share: '40.2%' },
        { name: 'Net Bottom Line', amount: '₹6.59L', share: '35.8%' },
      ],
    },
    'Cash Balance': {
      title: 'Liquid Cash & Bank Headroom',
      subtitle: 'Synchronized with General Ledger',
      breakdown: [
        { name: 'HDFC Current Account', amount: '₹6.40L', share: '69%' },
        { name: 'ICICI Operating Account', amount: '₹2.14L', share: '23%' },
        { name: 'Liquid Cash on Hand', amount: '₹70,000', share: '8%' },
      ],
    },
    Receivables: {
      title: 'Accounts Receivable (Debtors)',
      subtitle: '₹4.82L Total Invoiced / Pending',
      breakdown: [
        { name: '0–30 Days (Current)', amount: '₹3.90L', share: '81%' },
        { name: '31–60 Days (Follow up)', amount: '₹72,000', share: '15%' },
        { name: '60+ Days (At Risk)', amount: '₹20,000', share: '4%' },
      ],
    },
    Payables: {
      title: 'Accounts Payable (Vendors)',
      subtitle: '₹3.14L Due to Suppliers',
      breakdown: [
        { name: 'Apex Logistics Ltd', amount: '₹1.40L', share: '45%' },
        { name: 'National Polymers & Boxes', amount: '₹1.14L', share: '36%' },
        { name: 'Local Utility / Power', amount: '₹60,000', share: '19%' },
      ],
    },
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-positive/15 to-info/10 blur-2xl opacity-70"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/[0.06] transition-all">
        {/* Window Chrome */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-positive" />
            Live · Updated just now
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* 6 KPI Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MetricCard
              label="Revenue"
              value={18.42}
              change="12.4%"
              emphasis
              isSelected={selectedMetric === 'Revenue'}
              onClick={() => setSelectedMetric(selectedMetric === 'Revenue' ? null : 'Revenue')}
              tooltip="Click to view revenue breakdown"
            />
            <MetricCard
              label="Expenses"
              value={11.83}
              change="8.1%"
              isSelected={selectedMetric === 'Expenses'}
              onClick={() => setSelectedMetric(selectedMetric === 'Expenses' ? null : 'Expenses')}
              tooltip="Click to view expense categories"
            />
            <MetricCard
              label="Net Profit"
              value={6.59}
              change="21.2%"
              isSelected={selectedMetric === 'Net Profit'}
              onClick={() => setSelectedMetric(selectedMetric === 'Net Profit' ? null : 'Net Profit')}
              tooltip="Click to view profit margins"
            />
            <MetricCard
              label="Cash Balance"
              value={9.24}
              isSelected={selectedMetric === 'Cash Balance'}
              onClick={() => setSelectedMetric(selectedMetric === 'Cash Balance' ? null : 'Cash Balance')}
              tooltip="Click to view liquid accounts"
            />
            <MetricCard
              label="Receivables"
              value={4.82}
              isSelected={selectedMetric === 'Receivables'}
              onClick={() => setSelectedMetric(selectedMetric === 'Receivables' ? null : 'Receivables')}
              tooltip="Click to view pending invoices"
            />
            <MetricCard
              label="Payables"
              value={3.14}
              isSelected={selectedMetric === 'Payables'}
              onClick={() => setSelectedMetric(selectedMetric === 'Payables' ? null : 'Payables')}
              tooltip="Click to view supplier bills"
            />
          </div>

          {/* Interactive Metric Drilldown Drawer */}
          {selectedMetric && metricDetails[selectedMetric] && (
            <div className="animate-fade-up rounded-xl border border-border bg-muted/40 p-3.5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-950">{metricDetails[selectedMetric].title}</p>
                  <p className="text-[11px] text-muted-foreground">{metricDetails[selectedMetric].subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 divide-y divide-border/60 text-xs">
                {metricDetails[selectedMetric].breakdown.map((item, idx) => (
                  <div key={idx} className="pt-1.5 first:pt-0 flex items-center justify-between font-mono">
                    <span className="text-muted-foreground font-sans">{item.name}</span>
                    <span className="font-bold text-neutral-950">
                      {item.amount} <span className="text-[10px] text-muted-foreground font-normal">({item.share})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Living AI insight panel with rotating signals */}
          <div
            onClick={() => setAiExpanded(!aiExpanded)}
            className="rounded-xl border border-info/25 bg-info/[0.05] p-4 transition-all hover:bg-info/[0.08] cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-info/15 text-info">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold text-neutral-950">
                  Dhanvi noticed something
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {ROTATING_INSIGHTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      setInsightIndex(i)
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      insightIndex === i ? 'w-4 bg-info' : 'w-1.5 bg-info/30 hover:bg-info/60'
                    }`}
                    title={`View signal ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-warning/10 p-2.5 transition-all">
              <BadgeIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <p className="text-xs sm:text-sm font-medium text-neutral-950 leading-snug">
                {currentInsight.badgeText}
              </p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Why it matters
                </p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
                  {currentInsight.why}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Lightbulb className="h-3 w-3" /> Recommended action
                </p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
                  {currentInsight.action}
                </p>
              </div>
            </div>

            {aiExpanded && (
              <div className="mt-3 pt-3 border-t border-info/20 animate-fade-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-xs text-info font-medium">
                    {currentInsight.source}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setActionDone(true)
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-all inline-flex items-center gap-1 w-fit cursor-pointer"
                  >
                    {actionDone ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-positive" />
                        Action Queued for Review
                      </>
                    ) : (
                      <>
                        Execute Action <ChevronRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
