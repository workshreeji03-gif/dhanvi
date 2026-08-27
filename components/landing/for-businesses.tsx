'use client'

import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const TRANSLATIONS = [
  {
    jargon: 'Working capital is ₹6.4L',
    plain: 'You have ₹6.4L available to run day-to-day operations right now.',
  },
  {
    jargon: 'Gross margin compressed 5%',
    plain: 'You keep ₹5 less on every ₹100 of sales than you did last quarter.',
  },
  {
    jargon: 'DSO increased to 47 days',
    plain: 'Customers are taking about 47 days to pay you — up from last month.',
  },
  {
    jargon: 'Negative cash flow projected',
    plain: "You'll be short on cash in ~3 weeks unless payments come in.",
  },
]

export function ForBusinesses() {
  return (
    <section id="for-businesses" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="For Business Owners"
          title="Finance, in a language you actually speak."
          description="You don't need an accounting degree to understand your own business. Dhanvi translates the numbers into plain, decision-ready answers."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {TRANSLATIONS.map((t, i) => (
            <Reveal
              key={t.jargon}
              delay={i * 80}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  The jargon
                </p>
                <p className="tabular mt-1 text-sm font-medium text-foreground">{t.jargon}</p>
              </div>
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-positive sm:block" />
              <div className="flex-1 rounded-xl bg-positive/[0.07] p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-positive">
                  What it means
                </p>
                <p className="mt-1 text-sm text-foreground">{t.plain}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
