'use client'

import { ArrowDown, Clock, FileSpreadsheet, PenLine, RefreshCw, AlertTriangle, Repeat } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const SOURCES = ['UPI', 'Bank', 'Invoices', 'WhatsApp', 'Excel / Sheets', 'Tally', 'Accountant', 'Monthly Reports']

const PAINS = [
  { icon: Clock, label: 'Delayed financial visibility' },
  { icon: PenLine, label: 'Manual data entry' },
  { icon: RefreshCw, label: 'Reconciliation work' },
  { icon: FileSpreadsheet, label: 'Spreadsheet dependency' },
  { icon: AlertTriangle, label: 'Late discovery of problems' },
  { icon: Repeat, label: 'Repetitive accountant work' },
]

export function Problem() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="The Problem"
        align="left"
        title={
          <>
            Your business moves every day. Your financial picture shouldn&apos;t wait until
            month-end.
          </>
        }
        description="Business owners often have financial information scattered across multiple systems. Transactions happen every day, but the complete picture may only become clear after reconciliation and reporting."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Scattered workflow chain */}
        <Reveal className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Today&apos;s workflow
          </p>
          <ol className="flex flex-col items-center gap-0">
            {SOURCES.map((source, i) => (
              <li key={source} className="flex w-full flex-col items-center">
                <span
                  className={`w-full max-w-xs rounded-lg border px-4 py-2.5 text-center text-sm font-medium ${
                    i === SOURCES.length - 1
                      ? 'border-warning/40 bg-warning/10 text-foreground'
                      : 'border-border bg-muted/50 text-foreground'
                  }`}
                >
                  {source}
                </span>
                {i < SOURCES.length - 1 && (
                  <ArrowDown className="my-1.5 h-4 w-4 text-muted-foreground/60" />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Pain points */}
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-sm font-medium text-foreground">This creates:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAINS.map((pain, i) => (
              <Reveal
                key={pain.label}
                delay={i * 60}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <pain.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{pain.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
