'use client'

import { ArrowRight, Sparkles, TrendingUp, Lightbulb, PlayCircle } from 'lucide-react'
import { MetricCard } from './metric-card'
import { Reveal } from './reveal'
import { EarlyAccessButton, TourButton } from './ui-context'

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* subtle dotted texture */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Copy */}
          <div className="max-w-xl">
            <Reveal
              as="span"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-positive" />
              The AI Finance Operating System
            </Reveal>

            <Reveal
              as="h1"
              delay={60}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Your business finances.{' '}
              <span className="text-positive">Always up to date.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={120}
              className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Dhanvi continuously captures, organizes, and understands your business finances —
              giving you a live view of cash flow, profit, expenses, inventory, and financial
              health.
            </Reveal>

            <Reveal delay={180} className="mt-8 flex flex-wrap items-center gap-3">
              <EarlyAccessButton className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md">
                Join Early Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </EarlyAccessButton>
              <TourButton className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                <PlayCircle className="h-4 w-4 text-positive" />
                Watch a 60-second tour
              </TourButton>
            </Reveal>

            <Reveal
              as="p"
              delay={220}
              className="mt-5 text-sm text-muted-foreground"
            >
              Works alongside your accountant. Automates the repetitive work.
            </Reveal>
          </div>

          {/* Dashboard mockup */}
          <Reveal delay={120} className="relative">
            <HeroDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HeroDashboard() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-positive/10 to-info/5 blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/[0.06]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-positive" />
            Live · Updated just now
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MetricCard label="Revenue" value={18.42} change="12.4%" emphasis />
            <MetricCard label="Expenses" value={11.83} change="8.1%" />
            <MetricCard label="Net Profit" value={6.59} change="21.2%" />
            <MetricCard label="Cash Balance" value={9.24} />
            <MetricCard label="Receivables" value={4.82} />
            <MetricCard label="Payables" value={3.14} />
          </div>

          {/* AI insight panel */}
          <div className="rounded-xl border border-info/25 bg-info/[0.05] p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-info/15 text-info">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Dhanvi noticed something
              </span>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-warning/10 p-2.5">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <p className="text-sm text-foreground">
                Packaging expenses are{' '}
                <span className="font-semibold">31% higher</span> than your 6-month average.
              </p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Why it matters
                </p>
                <p className="mt-1 text-sm text-foreground">
                  Revenue increased 8%, but packaging costs increased 31%.
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Lightbulb className="h-3 w-3" /> Recommended action
                </p>
                <p className="mt-1 text-sm text-foreground">
                  Review current supplier pricing and purchase volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
