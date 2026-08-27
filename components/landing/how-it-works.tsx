'use client'

import { Boxes, Layers, Radar, Zap } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const FEATURES = [
  {
    num: '01',
    title: 'Capture',
    icon: Boxes,
    body: 'Automatically bring financial information from every source your business already uses.',
    items: ['Bank accounts', 'UPI', 'Invoices', 'POS', 'Receipts', 'Spreadsheets', 'Accounting software'],
  },
  {
    num: '02',
    title: 'Understand',
    icon: Layers,
    body: 'Dhanvi intelligently categorizes transactions and keeps your financial records organized and reconciled.',
    items: ['Smart categorization', 'Auto-reconciliation', 'Organized records', 'Context tagging'],
  },
  {
    num: '03',
    title: 'Monitor',
    icon: Radar,
    body: 'AI continuously watches the metrics that decide whether your business is healthy.',
    items: ['Revenue', 'Expenses', 'Profit margins', 'Cash flow', 'Receivables', 'Payables', 'Inventory', 'Unusual transactions'],
  },
  {
    num: '04',
    title: 'Act',
    icon: Zap,
    body: 'Get clear recommendations and act before small financial problems become expensive ones.',
    items: ['Actionable recommendations', 'Early warnings', 'Prioritized issues', 'Approval-based actions'],
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="How It Works"
        title="One financial layer for your entire business."
        description="Four capabilities working together as a single, continuous system — not another disconnected tool."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <Reveal
            key={feature.num}
            delay={i * 80}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lg hover:shadow-foreground/[0.04]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </span>
              <span className="tabular text-sm font-semibold text-muted-foreground/60">
                {feature.num}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
              {feature.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1 w-1 rounded-full bg-positive" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
