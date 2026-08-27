'use client'

import { CheckCircle2, FileText } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import { useCountUp } from './use-count-up'

const REPORTS = [
  { label: 'Profit & Loss', value: '₹6.59L', hint: 'Net profit' },
  { label: 'Balance Sheet', value: '₹42.1L', hint: 'Total assets' },
  { label: 'Cash Flow', value: '+₹3.8L', hint: 'This month' },
  { label: 'Revenue', value: '₹18.42L', hint: 'MTD' },
  { label: 'Expenses', value: '₹11.83L', hint: 'MTD' },
  { label: 'Receivables', value: '₹4.82L', hint: 'Outstanding' },
  { label: 'Payables', value: '₹3.14L', hint: 'Due' },
  { label: 'Inventory', value: '₹7.9L', hint: 'On hand' },
]

const TIMELINE = [
  { time: '2 min ago', text: 'UPI payment ₹24,500 received — categorized to Sales' },
  { time: '18 min ago', text: 'Supplier invoice ₹1.2L recorded — Payables updated' },
  { time: '1 hr ago', text: 'POS batch synced — 43 transactions reconciled' },
  { time: '3 hrs ago', text: 'Bank statement imported — cash balance refreshed' },
]

export function AlwaysUpdated() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Always-Updated Financials"
          title={
            <>
              Your books shouldn&apos;t have an <span className="text-info">end-of-month</span>{' '}
              mode.
            </>
          }
          description="Every report stays continuously current as transactions flow in — no closing period, no waiting."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {/* Reports grid */}
          <Reveal className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-positive" />
                <span className="text-sm font-medium text-foreground">Live financial reports</span>
              </div>
              <HealthScore />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {REPORTS.map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl border border-border bg-background/60 p-3.5"
                >
                  <p className="text-xs font-medium text-muted-foreground">{r.label}</p>
                  <p className="tabular mt-1.5 text-base font-semibold tracking-tight text-foreground">
                    {r.value}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/70">{r.hint}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Timeline */}
          <Reveal delay={120} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="mb-5 text-sm font-medium text-foreground">Continuous updates</p>
            <ol className="relative flex flex-col gap-5 border-l border-border pl-5">
              {TIMELINE.map((item, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-background ${
                      i === 0 ? 'bg-positive' : 'bg-border'
                    }`}
                  />
                  <p className="text-xs font-medium text-muted-foreground">{item.time}</p>
                  <p className="mt-0.5 text-sm leading-snug text-foreground">{item.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-positive/[0.07] px-4 py-3 text-sm font-medium text-foreground">
              <CheckCircle2 className="h-4 w-4 text-positive" />
              Know where your business stands today — not three weeks from now.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HealthScore() {
  const { ref, value } = useCountUp(87, 1600)
  const rounded = Math.round(value)
  const circumference = 2 * Math.PI * 15.5

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-10 w-10">
        <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-border" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            className="stroke-positive"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (rounded / 100) * circumference}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <span
          ref={ref}
          className="tabular absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground"
        >
          {rounded}
        </span>
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-foreground">Health score</p>
        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <FileText className="h-3 w-3" /> Strong
        </p>
      </div>
    </div>
  )
}
