'use client'

import { TrendingDown, Wallet, Boxes, Copy, AlertTriangle } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const ALERTS = [
  {
    icon: AlertTriangle,
    tone: 'warning',
    title: 'Expense anomaly',
    body: 'Office expenses are 43% higher than your 6-month average.',
  },
  {
    icon: TrendingDown,
    tone: 'destructive',
    title: 'Margin warning',
    body: 'Product X margin dropped from 24% to 11%.',
  },
  {
    icon: Wallet,
    tone: 'info',
    title: 'Cash-flow warning',
    body: '₹2.1L in supplier payments are due within 7 days.',
  },
  {
    icon: Boxes,
    tone: 'warning',
    title: 'Inventory warning',
    body: "12 products haven't sold in 45 days.",
  },
  {
    icon: Copy,
    tone: 'info',
    title: 'Duplicate transaction',
    body: 'A possible duplicate invoice was detected.',
  },
]

const TONE: Record<string, string> = {
  warning: 'bg-warning/12 text-warning',
  destructive: 'bg-destructive/12 text-destructive',
  info: 'bg-info/12 text-info',
}

export function Proactive() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Proactive AI"
        title={
          <>
            Don&apos;t wait for the report to find the <span className="text-warning">problem</span>.
          </>
        }
        description="Dhanvi continuously monitors your financial activity and alerts you the moment something needs attention — not weeks later."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALERTS.map((alert, i) => (
          <Reveal
            key={alert.title}
            delay={i * 90}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/[0.04]"
          >
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TONE[alert.tone]}`}
            >
              <alert.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{alert.body}</p>
            </div>
          </Reveal>
        ))}

        {/* summary tile */}
        <Reveal
          delay={ALERTS.length * 90}
          className="flex flex-col justify-center gap-2 rounded-2xl border border-positive/25 bg-positive/[0.06] p-5"
        >
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-positive" />
          <h3 className="text-sm font-semibold text-foreground">Always watching</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every transaction is checked in real time, so issues surface while you can still act on
            them.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
