'use client'

import { useState } from 'react'
import { Calculator, Briefcase, Check } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const MODES = {
  owner: {
    icon: Briefcase,
    label: 'Business Owner',
    tagline: 'Understand your business without an accounting degree.',
    points: [
      'Plain-English answers, not ledgers and journals',
      'Know your cash, profit and problems at a glance',
      'Proactive alerts before small issues become big ones',
      'Ask questions in your own words, any time',
    ],
    quote:
      '“I finally understand my own numbers — without calling my accountant first.”',
    author: 'Retail business owner',
  },
  accountant: {
    icon: Calculator,
    label: 'Accountant',
    tagline: 'Skip the data entry. Spend your time on judgment.',
    points: [
      'Clean, categorized, always-current books',
      'Automated reconciliation and anomaly flags',
      'Audit-ready trails for every transaction',
      'Handle more clients without more grunt work',
    ],
    quote:
      '“Dhanvi does the data entry. I do the advising — which is what clients actually pay for.”',
    author: 'Practicing CA',
  },
} as const

type ModeKey = keyof typeof MODES

export function DualPerspective() {
  const [mode, setMode] = useState<ModeKey>('owner')
  const m = MODES[mode]
  const Icon = m.icon

  return (
    <section id="who" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Built For Both Sides"
          title="One platform. Two very different jobs, both easier."
          description="Dhanvi speaks plainly to owners and works precisely for accountants. Switch the view."
        />

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {(Object.keys(MODES) as ModeKey[]).map((k) => {
              const MIcon = MODES[k].icon
              return (
                <button
                  key={k}
                  onClick={() => setMode(k)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    mode === k
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <MIcon className="h-4 w-4" />
                  {MODES[k].label}
                </button>
              )
            })}
          </div>
        </div>

        <Reveal key={mode} className="mt-8">
          <div className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.05]">
            <div className="flex items-center gap-3 border-b border-border bg-muted/30 p-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">{m.label}</h3>
                <p className="text-sm text-muted-foreground">{m.tagline}</p>
              </div>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <ul className="space-y-2.5">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                    {p}
                  </li>
                ))}
              </ul>
              <figure className="flex flex-col justify-center rounded-xl bg-primary/[0.04] p-5">
                <blockquote className="text-pretty text-base font-medium leading-relaxed text-foreground">
                  {m.quote}
                </blockquote>
                <figcaption className="mt-3 text-sm text-muted-foreground">— {m.author}</figcaption>
              </figure>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
