'use client'

import { Check, Minus } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const LESS = [
  'Manual data entry',
  'Endless reconciliation',
  'Data cleanup',
  'Chasing documents',
  'Copy-pasting between tools',
]

const MORE = [
  'Advisory & planning',
  'Growth strategy',
  'Tax optimization',
  'Deeper client relationships',
  'Higher-value work',
]

export function ForAccountants() {
  return (
    <section id="for-accountants" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="For Accountants"
        title="Built to work alongside you, not replace you."
        description="Dhanvi automates the repetitive groundwork so accountants can spend their time where it actually matters."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Less of this
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {LESS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Minus className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-muted-foreground line-through decoration-border">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={100}
          className="rounded-2xl border border-positive/25 bg-positive/[0.05] p-6 sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-positive">
            More of this
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {MORE.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-positive text-positive-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
