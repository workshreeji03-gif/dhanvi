'use client'

import { useState } from 'react'
import { Store, Truck, Factory, UtensilsCrossed, Wrench, ShoppingBag } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const INDUSTRIES = [
  {
    key: 'retail',
    label: 'Retail',
    icon: Store,
    focus: 'Store-level margins & fast-moving stock',
    metrics: [
      { label: 'Best seller', value: 'SKU-204' },
      { label: 'Dead stock', value: '₹82K' },
      { label: 'Daily footfall value', value: '₹1.4L' },
    ],
    insight: 'Aisle-3 products drive 60% of profit — reorder before the weekend rush.',
  },
  {
    key: 'wholesale',
    label: 'Wholesale',
    icon: Truck,
    focus: 'Credit cycles & bulk-order receivables',
    metrics: [
      { label: 'Outstanding', value: '₹12.4L' },
      { label: 'Avg. credit period', value: '32 days' },
      { label: 'Top debtor', value: 'Sharma Ent.' },
    ],
    insight: '3 dealers are stretching payment terms — tighten credit before extending more stock.',
  },
  {
    key: 'manufacturing',
    label: 'Manufacturing',
    icon: Factory,
    focus: 'Raw-material costs & per-unit margins',
    metrics: [
      { label: 'COGS', value: '₹4.82L' },
      { label: 'Input cost change', value: '+13%' },
      { label: 'Weakest line', value: 'Product X' },
    ],
    insight: 'Rising metal prices cut Product X margin to 11% — revisit pricing or supplier.',
  },
  {
    key: 'restaurant',
    label: 'Restaurant',
    icon: UtensilsCrossed,
    focus: 'Food cost %, wastage & daily cash',
    metrics: [
      { label: 'Food cost', value: '34%' },
      { label: 'Wastage', value: '₹9,800' },
      { label: 'Avg. bill', value: '₹640' },
    ],
    insight: 'Weekday food cost is 6 pts higher than weekends — trim prep on slow days.',
  },
  {
    key: 'services',
    label: 'Services',
    icon: Wrench,
    focus: 'Billable utilization & project profit',
    metrics: [
      { label: 'Utilization', value: '72%' },
      { label: 'Unbilled hours', value: '116' },
      { label: 'Best client', value: 'Acme Co.' },
    ],
    insight: '₹1.9L of delivered work is still unbilled — invoice it to lift this month’s cash.',
  },
  {
    key: 'd2c',
    label: 'D2C',
    icon: ShoppingBag,
    focus: 'CAC, contribution margin & returns',
    metrics: [
      { label: 'CAC', value: '₹410' },
      { label: 'Return rate', value: '8.2%' },
      { label: 'Contribution', value: '31%' },
    ],
    insight: 'One campaign’s CAC is 2× the rest — reallocate spend to keep contribution healthy.',
  },
]

export function IndustrySelector() {
  const [active, setActive] = useState(INDUSTRIES[0])

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Made For Your Business"
          title="Not generic accounting. Insights that fit how you actually run."
          description="Pick your kind of business to see the metrics and insights Dhanvi puts front and center."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon
            const isActive = ind.key === active.key
            return (
              <button
                key={ind.key}
                onClick={() => setActive(ind)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {ind.label}
              </button>
            )
          })}
        </div>

        <Reveal key={active.key} className="mt-8">
          <div className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.05]">
            <div className="flex items-center gap-3 border-b border-border bg-muted/30 p-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <active.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">{active.label}</h3>
                <p className="text-sm text-muted-foreground">{active.focus}</p>
              </div>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              {active.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-background p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</p>
                  <p className="tabular mt-1 text-xl font-semibold tracking-tight text-foreground">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-6 mb-6 rounded-xl bg-info/[0.07] p-4">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-info">Dhanvi spots: </span>
                {active.insight}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
