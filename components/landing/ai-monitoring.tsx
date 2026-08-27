'use client'

import { AlertTriangle, TrendingDown, Receipt, Wallet, Package } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const ALERTS = [
  {
    icon: Wallet,
    tone: 'destructive',
    tag: 'Cash Flow Alert',
    body: '₹2.1L in supplier payments are due within 7 days.',
  },
  {
    icon: TrendingDown,
    tone: 'warning',
    tag: 'Margin Alert',
    body: 'Product X margin dropped from 24% → 11%.',
  },
  {
    icon: Receipt,
    tone: 'warning',
    tag: 'Expense Alert',
    body: 'Packaging expenses are 31% above your historical average.',
  },
  {
    icon: AlertTriangle,
    tone: 'info',
    tag: 'Receivables Alert',
    body: '₹4.82L is currently outstanding.',
  },
  {
    icon: Package,
    tone: 'positive',
    tag: 'Inventory Alert',
    body: "12 products haven't sold in 45 days.",
  },
] as const

const TONE: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  destructive: {
    text: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/25',
    dot: 'bg-destructive',
  },
  warning: {
    text: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    dot: 'bg-warning',
  },
  info: { text: 'text-info', bg: 'bg-info/10', border: 'border-info/25', dot: 'bg-info' },
  positive: {
    text: 'text-positive',
    bg: 'bg-positive/10',
    border: 'border-positive/25',
    dot: 'bg-positive',
  },
}

export function AiMonitoring() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Always Watching"
          title="You don't have to look for problems. Dhanvi looks for them."
          description="Dhanvi continuously monitors your finances and surfaces what needs your attention — before it becomes a month-end surprise."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {ALERTS.map((a, i) => {
            const t = TONE[a.tone]
            const Icon = a.icon
            const wide = i === ALERTS.length - 1
            return (
              <Reveal
                key={a.tag}
                delay={i * 70}
                className={wide ? 'sm:col-span-2' : undefined}
              >
                <div
                  className={`flex items-start gap-3 rounded-xl border ${t.border} bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.bg} ${t.text}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                      <span className={`text-xs font-semibold uppercase tracking-wide ${t.text}`}>
                        {a.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
