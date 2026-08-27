'use client'

import { useState } from 'react'
import { Lightbulb } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { ScoreRing } from './charts'

type Category = {
  key: string
  label: string
  score: number
  stats: { label: string; value: string }[]
  rec: string
}

const CATEGORIES: Category[] = [
  {
    key: 'cash',
    label: 'Cash Flow',
    score: 82,
    stats: [
      { label: 'Cash on hand', value: '₹9.24L' },
      { label: 'Due in 7 days', value: '₹2.1L' },
      { label: 'Net weekly flow', value: '+₹86K' },
      { label: 'Runway', value: '5.2 months' },
    ],
    rec: 'Healthy buffer. Stagger the ₹2.1L supplier payment to keep it that way.',
  },
  {
    key: 'profit',
    label: 'Profitability',
    score: 74,
    stats: [
      { label: 'Net margin', value: '15.8%' },
      { label: 'Gross margin', value: '38%' },
      { label: 'MoM profit', value: '-8.4%' },
      { label: 'Weakest product', value: 'Product X' },
    ],
    rec: 'Profit dipped on rising input costs. Revisit Product X pricing.',
  },
  {
    key: 'inventory',
    label: 'Inventory',
    score: 69,
    stats: [
      { label: 'Inventory value', value: '₹18.4L' },
      { label: 'Slow-moving stock', value: '₹3.1L' },
      { label: 'Dead stock', value: '₹82K' },
      { label: 'Inventory turnover', value: '4.8×' },
    ],
    rec: 'Reduce your next purchase of Product X by approximately 20%.',
  },
  {
    key: 'receivables',
    label: 'Receivables',
    score: 81,
    stats: [
      { label: 'Outstanding', value: '₹4.82L' },
      { label: 'Overdue > 30d', value: '₹1.2L' },
      { label: 'Avg. collection', value: '24 days' },
      { label: 'Customers owing', value: '14' },
    ],
    rec: 'Chase the 2 accounts overdue beyond 30 days to free up ₹1.2L.',
  },
  {
    key: 'expenses',
    label: 'Expenses',
    score: 76,
    stats: [
      { label: 'Monthly expenses', value: '₹11.83L' },
      { label: 'Above average', value: 'Packaging +31%' },
      { label: 'Largest category', value: 'Raw materials' },
      { label: 'MoM change', value: '+8.1%' },
    ],
    rec: 'Packaging is your biggest outlier — renegotiate supplier terms.',
  },
]

export function BusinessHealth() {
  const [active, setActive] = useState(CATEGORIES[2]) // Inventory, per brief example

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Live Business Health"
          title="A live financial pulse for your business."
          description="One score that tells you how the business is really doing — click any driver to see what's behind it."
        />

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.05]">
          <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
            {/* score */}
            <div className="flex flex-col items-center justify-center gap-4 border-b border-border bg-muted/30 p-8 lg:border-b-0 lg:border-r">
              <div className="relative flex items-center justify-center">
                <ScoreRing score={78} />
                <div className="absolute flex flex-col items-center">
                  <span className="tabular text-4xl font-semibold tracking-tight text-foreground">
                    78
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Healthy, but attention needed</p>
                <p className="mt-1 text-xs text-muted-foreground">Updated continuously</p>
              </div>
            </div>

            {/* drivers + detail */}
            <div className="p-5 sm:p-6">
              <div className="grid gap-2 sm:grid-cols-5">
                {CATEGORIES.map((c) => {
                  const isActive = c.key === active.key
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActive(c)}
                      className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all ${
                        isActive
                          ? 'border-primary bg-primary/[0.04]'
                          : 'border-border bg-background hover:border-foreground/20'
                      }`}
                    >
                      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="tabular text-lg font-semibold text-foreground">{c.score}</span>
                      <span className="h-1 w-full overflow-hidden rounded-full bg-border">
                        <span
                          className="block h-full rounded-full bg-positive transition-all duration-700"
                          style={{ width: `${c.score}%` }}
                        />
                      </span>
                    </button>
                  )
                })}
              </div>

              <div key={active.key} className="animate-fade-up mt-5 rounded-xl border border-border bg-background p-5">
                <h3 className="text-base font-semibold text-foreground">{active.label}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {active.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="tabular mt-0.5 text-sm font-semibold text-foreground">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-positive/[0.07] p-3">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">AI recommendation: </span>
                    {active.rec}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
