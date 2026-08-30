'use client'

import React from 'react'
import { TrendingUp, CheckCircle2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react'

const SIGNALS = [
  { icon: TrendingUp, text: 'Revenue ↑ 12.4% MTD (₹18.42L)', color: 'text-positive' },
  { icon: Activity, text: 'Gross Margin 35.8% (↑ 4.2% QoQ)', color: 'text-positive' },
  { icon: ShieldCheck, text: 'General Ledger Balanced (Δ ₹0.00)', color: 'text-positive' },
  { icon: CheckCircle2, text: 'Liquid Cash Runway: 7.8 Months', color: 'text-info' },
  { icon: AlertTriangle, text: '3 Overdue Debtor Invoices Flagged (₹2.4L)', color: 'text-amber-600' },
  { icon: Activity, text: 'Automated Bank Reconciliation Active', color: 'text-positive' },
  { icon: TrendingUp, text: 'Supplier Price Anomaly Detected & Flagged', color: 'text-amber-600' },
]

export function LiveSignals() {
  return (
    <section className="relative border-y border-border/80 bg-card/60 backdrop-blur-md py-3.5 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        {/* Left fixed badge */}
        <div className="flex items-center gap-2 shrink-0 pr-4 sm:border-r border-border">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-positive" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-900 font-mono">
            Live Signals
          </span>
        </div>

        {/* Scrolling horizontal ticker */}
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            {[...SIGNALS, ...SIGNALS].map((signal, i) => {
              const Icon = signal.icon
              return (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3.5 py-1 text-xs font-medium text-neutral-900 shadow-2xs shrink-0 hover:border-foreground/20 transition-colors"
                >
                  <Icon className={`h-3.5 w-3.5 ${signal.color} shrink-0`} />
                  <span className="font-mono text-[11px] font-semibold">{signal.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
