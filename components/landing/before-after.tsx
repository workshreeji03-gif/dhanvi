'use client'

import React, { useState } from 'react'
import { ArrowDown, X, Check, Zap, Sparkles, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const TRADITIONAL_STEPS = [
  'UPI / QR Payment',
  'Paper & PDF Invoices',
  'Scattered WhatsApp Receipts',
  'Manual Excel Re-entry',
  'Disconnected Tally Ledger',
  'Accountant Month-End Scramble',
  'Delayed 30-Day P&L Report',
]

const TRADITIONAL_FRICTION = [
  'Manual data re-entry',
  '30-day decision blindspot',
  'Constant reconciliation headaches',
  'Scattered siloed records',
  'Late discovery of margin leaks',
]

const DHANVI_STEPS = [
  { step: 'Transaction posted', desc: 'Instant capture from bank feed, invoice, or POS' },
  { step: 'Automated Ledger Sync', desc: 'Debits & credits balanced in real-time General Ledger' },
  { step: 'AI Contextual Understanding', desc: 'Categorized to proper chart of accounts & GST codes' },
  { step: 'Live Dashboard Recalculation', desc: 'Cash runway, margins, and P&L update instantly' },
  { step: 'Continuous Anomaly Watch', desc: 'AI flags price hikes, duplicate bills, and debtor aging' },
  { step: 'Unified Founder & CA View', desc: 'Audit-ready statements always open for advisory' },
]

export function BeforeAfter() {
  // Slider value from 0 (Traditional) to 100 (Dhanvi)
  const [sliderVal, setSliderVal] = useState<number>(75)

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Workflow Transformation"
          title="From financial chaos to continuous clarity."
          description="Drag the slider below to see how Dhanvi eliminates the fragmented 30-day month-end scramble."
        />

        {/* Interactive Transformation Slider Control */}
        <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
            <span className={sliderVal < 50 ? 'text-rose-600 font-bold' : 'text-muted-foreground'}>
              Traditional (Fragmented)
            </span>
            <span className="font-mono text-positive font-bold text-sm">
              {sliderVal === 100 ? '100% Dhanvi' : sliderVal === 0 ? 'Traditional' : `${sliderVal}% Transformed`}
            </span>
            <span className={sliderVal >= 50 ? 'text-positive font-bold' : 'text-muted-foreground'}>
              Dhanvi (Continuous)
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              aria-label="Workflow transformation slider"
              className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Slow & reactive</span>
            <span className="text-positive font-medium">Drag to compare</span>
            <span>Real-time & proactive</span>
          </div>
        </div>

        {/* Dynamic Dual Comparison Cards based on slider */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Traditional Workflow Column */}
          <div
            className="rounded-2xl border border-rose-200/80 bg-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs"
            style={{
              opacity: sliderVal >= 90 ? 0.35 : 1 - (sliderVal / 100) * 0.5,
              transform: `scale(${1 - (sliderVal / 100) * 0.03})`,
            }}
          >
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold">
                    <X className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950">Traditional Accounting</h3>
                    <p className="text-xs text-muted-foreground">Disconnected tools & delayed reporting</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200/60">
                  Month-End Batch
                </span>
              </div>

              <ol className="space-y-2 mt-4">
                {TRADITIONAL_STEPS.map((node, i) => (
                  <li key={node}>
                    <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs font-semibold text-neutral-700 flex items-center justify-between">
                      <span>{node}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Step {i + 1}</span>
                    </div>
                    {i < TRADITIONAL_STEPS.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowDown className="h-3 w-3 text-neutral-400" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-xl bg-rose-50/70 p-4 border border-rose-200/60">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Hidden Business Costs
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {TRADITIONAL_FRICTION.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-medium text-rose-900 shadow-2xs"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dhanvi Continuous Intelligence Column */}
          <div
            className="relative rounded-2xl border-2 border-emerald-500/80 bg-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg shadow-emerald-500/[0.04]"
            style={{
              opacity: sliderVal <= 10 ? 0.35 : 0.5 + (sliderVal / 100) * 0.5,
              transform: `scale(${0.97 + (sliderVal / 100) * 0.03})`,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"
            />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950">With Dhanvi</h3>
                    <p className="text-xs text-positive font-medium">Continuous double-entry intelligence</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" /> Real-Time
                </span>
              </div>

              <ol className="space-y-2 mt-4">
                {DHANVI_STEPS.map((item, i) => (
                  <li key={item.step}>
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/40 p-3 text-xs transition-colors hover:bg-emerald-50/70">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white mt-0.5">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-neutral-950">{item.step}</p>
                        <p className="text-[11px] text-neutral-600 leading-snug mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    {i < DHANVI_STEPS.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowDown className="h-3 w-3 text-emerald-500/60" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-xl bg-emerald-50 p-4 border border-emerald-200/80">
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                  One continuous flow. Financial records stay balanced, margin leaks surface immediately, and both business owner and CA work from the same live source of truth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
