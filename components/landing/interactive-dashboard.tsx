'use client'

import { useState } from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Reveal } from './reveal'
import { AreaChart, BarChart } from './charts'

type Range = 'Today' | '7 Days' | '30 Days' | '12 Months'
const RANGES: Range[] = ['Today', '7 Days', '30 Days', '12 Months']

type Metric = { value: string; change: number }
type Snapshot = {
  revenue: Metric
  expenses: Metric
  profit: Metric
  cash: string
  receivables: string
  payables: string
  trend: number[]
  bars: number[]
}

const DATA: Record<Range, Snapshot> = {
  Today: {
    revenue: { value: '₹1,24,000', change: 4.2 },
    expenses: { value: '₹38,000', change: 2.1 },
    profit: { value: '₹86,000', change: 6.8 },
    cash: '₹9,24,000',
    receivables: '₹4,82,000',
    payables: '₹3,14,000',
    trend: [8, 10, 9, 14, 12, 18, 22],
    bars: [6, 9, 7, 12, 10, 15, 18],
  },
  '7 Days': {
    revenue: { value: '₹6,18,400', change: 7.9 },
    expenses: { value: '₹3,42,100', change: 5.2 },
    profit: { value: '₹2,76,300', change: 11.4 },
    cash: '₹9,24,000',
    receivables: '₹4,58,000',
    payables: '₹3,02,000',
    trend: [12, 14, 11, 16, 20, 18, 24],
    bars: [10, 12, 9, 14, 17, 15, 20],
  },
  '30 Days': {
    revenue: { value: '₹18,42,500', change: 12.4 },
    expenses: { value: '₹11,83,200', change: 8.1 },
    profit: { value: '₹6,59,300', change: 21.2 },
    cash: '₹9,24,000',
    receivables: '₹4,82,000',
    payables: '₹3,14,000',
    trend: [14, 18, 16, 22, 20, 28, 32],
    bars: [12, 16, 14, 20, 18, 24, 29],
  },
  '12 Months': {
    revenue: { value: '₹2,08,40,000', change: 34.6 },
    expenses: { value: '₹1,36,20,000', change: 19.3 },
    profit: { value: '₹72,20,000', change: 42.8 },
    cash: '₹9,24,000',
    receivables: '₹5,10,000',
    payables: '₹3,38,000',
    trend: [10, 14, 18, 16, 22, 26, 24, 30, 34, 32, 40, 46],
    bars: [8, 12, 15, 13, 19, 22, 20, 26, 30, 28, 36, 42],
  },
}

export function InteractiveDashboard() {
  const [range, setRange] = useState<Range>('30 Days')
  const d = DATA[range]

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/[0.06]">
          {/* toolbar */}
          <div className="flex flex-col gap-4 border-b border-border bg-muted/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2.5">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-positive" />
              <span className="text-sm font-semibold text-foreground">Business overview</span>
              <span className="text-xs text-muted-foreground">Live · Updated just now</span>
            </div>
            <div
              role="tablist"
              aria-label="Timeframe"
              className="inline-flex rounded-full border border-border bg-background p-1"
            >
              {RANGES.map((r) => (
                <button
                  key={r}
                  role="tab"
                  aria-selected={range === r}
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    range === r
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.1fr_1fr]">
            {/* left: KPIs */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <BigMetric label="Revenue" value={d.revenue.value} change={d.revenue.change} emphasis />
              <BigMetric label="Expenses" value={d.expenses.value} change={d.expenses.change} invert />
              <BigMetric label="Net Profit" value={d.profit.value} change={d.profit.change} />
              <SmallMetric label="Cash" value={d.cash} />
              <SmallMetric label="Receivables" value={d.receivables} />
              <SmallMetric label="Payables" value={d.payables} />
            </div>

            {/* right: charts */}
            <div className="grid gap-4">
              <div className="rounded-xl border border-border bg-background p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Revenue trend
                  </span>
                  <span className="text-xs font-medium text-positive">{range}</span>
                </div>
                <AreaChart data={d.trend} height={110} className="h-28 w-full" />
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Cash flow
                </span>
                <BarChart data={d.bars} height={80} className="mt-3 h-20 w-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function BigMetric({
  label,
  value,
  change,
  emphasis,
  invert,
}: {
  label: string
  value: string
  change: number
  emphasis?: boolean
  invert?: boolean
}) {
  // for expenses, a rise is not "good" — show it neutral/amber
  const positive = invert ? false : true
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border p-4 ${
        emphasis ? 'border-positive/25 bg-positive/[0.06]' : 'border-border bg-background'
      }`}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="tabular mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        {value}
      </span>
      <span
        className={`mt-1 inline-flex items-center gap-0.5 text-xs font-semibold ${
          positive ? 'text-positive' : 'text-warning'
        }`}
      >
        {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        {change}%
      </span>
    </div>
  )
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-background p-4">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="tabular mt-2 text-base font-semibold tracking-tight text-foreground">
        {value}
      </span>
    </div>
  )
}
