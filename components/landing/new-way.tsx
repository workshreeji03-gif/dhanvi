'use client'

import {
  Receipt,
  ScanLine,
  Database,
  BrainCircuit,
  Activity,
  AlertTriangle,
  BellRing,
} from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const STEPS = [
  { icon: Receipt, label: 'Transaction happens' },
  { icon: ScanLine, label: 'Dhanvi captures it' },
  { icon: Database, label: 'Financial records update' },
  { icon: BrainCircuit, label: 'AI understands the context' },
  { icon: Activity, label: 'Business health updates' },
  { icon: AlertTriangle, label: 'Problems are detected' },
  { icon: BellRing, label: 'Owner + accountant notified' },
]

export function NewWay() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="The New Way"
          title={
            <>
              From recording what happened to understanding what&apos;s{' '}
              <span className="text-info">happening</span>.
            </>
          }
          description="Dhanvi turns a slow, backward-looking process into a continuous, intelligent loop that runs in real time."
        />

        <ol className="mt-14 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          {STEPS.map((step, i) => (
            <li key={step.label} className="flex flex-1 items-center gap-3 lg:flex-col lg:gap-0">
              <Reveal
                delay={i * 90}
                className="flex w-full flex-1 flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-info/10 text-info">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-tight text-foreground text-balance">
                  {step.label}
                </span>
              </Reveal>

              {i < STEPS.length - 1 && (
                <Reveal
                  delay={i * 90 + 45}
                  className="flex shrink-0 items-center justify-center lg:h-8 lg:w-full"
                  aria-hidden="true"
                >
                  {/* down on mobile, right on desktop */}
                  <svg
                    className="h-6 w-6 text-info/50 lg:hidden"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 4v16m0 0 5-5m-5 5-5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-full text-info/40 lg:block"
                    viewBox="0 0 40 24"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 12h30m0 0-6-5m6 5-6 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 4"
                      style={{ animation: 'flow-dash 1s linear infinite' }}
                    />
                  </svg>
                </Reveal>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
