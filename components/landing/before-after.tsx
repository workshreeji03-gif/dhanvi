'use client'

import { useState } from 'react'
import { ArrowDown, X, Check } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const WITHOUT = ['UPI', 'Bank', 'Invoice', 'WhatsApp', 'Excel', 'Tally', 'Accountant', 'Month-end report']
const WITHOUT_PROBLEMS = [
  'Manual entry',
  'Delayed updates',
  'Constant reconciliation',
  'Scattered information',
  'Late discovery of problems',
]
const WITH = [
  'Transaction happens',
  'AI captures it',
  'Financial records update',
  'AI understands it',
  'Business dashboard updates',
  'AI monitors for problems',
  'Owner + accountant notified',
]

export function BeforeAfter() {
  const [side, setSide] = useState<'without' | 'with'>('with')

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Before / After"
          title="From financial chaos to continuous clarity."
          description="The same transaction, two very different journeys. Toggle to feel the difference."
        />

        {/* mobile toggle */}
        <div className="mt-8 flex justify-center lg:hidden">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setSide('without')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                side === 'without' ? 'bg-destructive text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Without Dhanvi
            </button>
            <button
              onClick={() => setSide('with')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                side === 'with' ? 'bg-positive text-positive-foreground' : 'text-muted-foreground'
              }`}
            >
              With Dhanvi
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Without */}
          <Reveal
            className={`${side === 'without' ? 'block' : 'hidden'} lg:block`}
          >
            <div className="h-full rounded-2xl border border-destructive/20 bg-card p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <X className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">Without Dhanvi</h3>
              </div>
              <ol className="space-y-1.5">
                {WITHOUT.map((node, i) => (
                  <li key={node}>
                    <div className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2 text-sm font-medium text-muted-foreground">
                      {node}
                    </div>
                    {i < WITHOUT.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowDown className="h-3.5 w-3.5 text-border" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-xl bg-destructive/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
                  What it costs you
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {WITHOUT_PROBLEMS.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-destructive/20 bg-card px-2.5 py-1 text-xs text-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* With */}
          <Reveal
            delay={80}
            className={`${side === 'with' ? 'block' : 'hidden'} lg:block`}
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-positive/25 bg-card p-6">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-positive/10 blur-2xl"
              />
              <div className="relative mb-5 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-positive/15 text-positive">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">With Dhanvi</h3>
              </div>
              <ol className="relative space-y-1.5">
                {WITH.map((node, i) => (
                  <li key={node}>
                    <div className="flex items-center gap-2.5 rounded-lg border border-positive/20 bg-positive/[0.05] px-3 py-2.5 text-sm font-medium text-foreground">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-positive/15 text-[11px] font-bold text-positive">
                        {i + 1}
                      </span>
                      {node}
                    </div>
                    {i < WITH.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowDown className="h-3.5 w-3.5 text-positive/50" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-xl bg-positive/[0.07] p-4">
                <p className="text-sm font-medium text-foreground">
                  One continuous flow. Records stay current, problems surface early, and everyone
                  works from the same financial truth.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
