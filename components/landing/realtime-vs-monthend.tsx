'use client'

import { useState } from 'react'
import { Clock, Zap } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const DAYS = 31

export function RealtimeVsMonthend() {
  const [day, setDay] = useState(9)

  // a problem starts on day 6; month-end only reveals it on day 31
  const problemDay = 6
  const realtimeKnows = day >= problemDay
  const lossPerDay = 18000
  const accumulatedLoss = realtimeKnows ? (day - problemDay + 1) * lossPerDay : 0
  const monthEndLoss = (DAYS - problemDay + 1) * lossPerDay

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Real-Time vs. Month-End"
          title="Every day of delay is a decision you couldn't make."
          description="Drag through the month. See what real-time financials know that a month-end report won't tell you until it's too late."
        />

        <Reveal className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-xl shadow-foreground/[0.05] sm:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">Day 1</span>
              <span className="tabular rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Day {day}
              </span>
              <span className="font-medium text-muted-foreground">Day {DAYS}</span>
            </div>
            <input
              type="range"
              min={1}
              max={DAYS}
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              aria-label="Day of month"
              className="mt-3 w-full accent-[var(--primary)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Real-time */}
            <div className="rounded-xl border border-positive/25 bg-positive/[0.05] p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-positive/15 text-positive">
                  <Zap className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">With Dhanvi (Real-time)</h3>
              </div>
              {realtimeKnows ? (
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground">
                    Margin drop detected on day {problemDay}.
                  </p>
                  <p className="tabular mt-2 text-2xl font-semibold text-warning">
                    ₹{accumulatedLoss.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground">exposed so far — flagged immediately</p>
                  <p className="mt-3 rounded-lg bg-card p-3 text-sm text-foreground">
                    You can act today and stop the bleed.
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  All clear. Financials are current as of day {day}. Dhanvi is watching every
                  transaction.
                </p>
              )}
            </div>

            {/* Month-end */}
            <div className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Clock className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">Traditional (Month-end)</h3>
              </div>
              {day < DAYS ? (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Books close on day {DAYS}. Right now you&apos;re flying blind — the problem is
                    already growing, unseen.
                  </p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-destructive/60 transition-all"
                      style={{ width: `${(day / DAYS) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {DAYS - day} days until you find out.
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground">Report finally arrives.</p>
                  <p className="tabular mt-2 text-2xl font-semibold text-destructive">
                    ₹{monthEndLoss.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground">already lost — discovered too late</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
