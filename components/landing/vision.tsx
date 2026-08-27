'use client'

import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const PHASES = [
  {
    tag: 'Today',
    title: 'Understand',
    body: 'Continuous capture, organization, and real-time understanding of your financial position.',
    items: ['Live financials', 'AI monitoring', 'Plain-language answers'],
    active: true,
  },
  {
    tag: 'Next',
    title: 'Anticipate',
    body: 'Forecasting and scenario planning so you can see around corners before decisions are made.',
    items: ['Cash-flow forecasts', 'Scenario planning', 'What-if modeling'],
    active: false,
  },
  {
    tag: 'Future',
    title: 'Act autonomously',
    body: 'An agentic finance layer that can take approved actions on your behalf, end to end.',
    items: ['Auto-reconciliation', 'Payment scheduling', 'Approval-based actions'],
    active: false,
  },
]

export function Vision() {
  return (
    <section id="vision" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="The Vision"
        title="From understanding your finances to running them."
        description="Dhanvi is building toward a future where finance operations run themselves — intelligently, transparently, and always under your control."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {PHASES.map((phase, i) => (
          <Reveal
            key={phase.tag}
            delay={i * 100}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
              phase.active
                ? 'border-info/30 bg-info/[0.05]'
                : 'border-border bg-card'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  phase.active
                    ? 'bg-info text-info-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {phase.tag}
              </span>
              {phase.active && (
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-info" />
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
              {phase.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>
            <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
              {phase.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${phase.active ? 'bg-info' : 'bg-positive'}`}
                  />
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
