'use client'

import React from 'react'
import {
  Building,
  Terminal,
  User,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

const PRODUCTS = [
  {
    id: 'institutional',
    badge: 'Enterprise Infrastructure',
    status: 'Private Research Preview',
    name: 'Dhanvi Institutional',
    headline: 'AI-Native Investment Infrastructure for Professional Funds',
    desc: 'Modular multi-agent deployment designed for quantitative asset managers, family offices, and proprietary trading teams.',
    features: [
      'Multi-agent market research pipelines',
      'Strategy hypothesis generation & cross-validation',
      'Portfolio risk & correlation stress-testing',
      'Forensic decision memory indexing engine',
      'Low-latency institutional execution APIs',
    ],
    ctaText: 'Inquire for Institutional Preview',
  },
  {
    id: 'intelligence',
    badge: 'Conversational Layer',
    status: 'Early Access Waitlist',
    name: 'Dhanvi Intelligence',
    headline: 'Conversational Synthesis Over Global Market Telemetry',
    desc: 'An intelligent query interface allowing analysts to interrogate multi-agent findings, cross-asset regimes, and company filings instantly.',
    queries: [
      '“What changed across semiconductor supply chains this week?”',
      '“What historical periods resemble the current yield curve steepening?”',
      '“Deconstruct the factor drivers behind our 72-hour drawdown.”',
    ],
    features: [
      'Natural-language semantic market query',
      'Instant 10-K & filing delta diffing',
      'Real-time factor sensitivity breakdowns',
    ],
    ctaText: 'Request API Early Access',
  },
  {
    id: 'personal',
    badge: 'Future Personal Tier',
    status: 'Research Roadmap',
    name: 'Dhanvi Personal',
    headline: 'Constrained Financial Research Co-Pilot for Individuals',
    desc: 'A future, strictly non-custodial research assistant helping self-directed investors evaluate portfolio health and market regime shifts.',
    features: [
      'Personal portfolio factor risk inspection',
      'Scenario stress-testing & regime alerts',
      'Simulated paper-trading laboratory',
      'Educational intelligence insights',
    ],
    ctaText: 'Join Consumer Waitlist',
    disclaimer: 'Non-custodial research only. Does not manage client funds or provide automated execution.',
  },
]

export function ProductDirections() {
  return (
    <section id="products" className="py-20 sm:py-28 bg-neutral-50/50 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-3">
            <span>PRODUCT ROADMAP & ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Three Product Directions.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Dhanvi is designing software-native financial intelligence for different scales of deployment
            — from institutional quantitative desks to conversational research APIs and future personal tools.
          </p>
        </div>

        {/* 3 Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header status badge */}
                <div className="flex items-center justify-between mb-4 text-xs font-mono">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                    {prod.badge}
                  </span>
                  <span className="text-neutral-500">{prod.status}</span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {prod.name}
                </h3>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">
                  {prod.headline}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                  {prod.desc}
                </p>

                {/* Optional sample queries */}
                {prod.queries && (
                  <div className="my-5 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                      Sample Conceptual Queries:
                    </div>
                    {prod.queries.map((q) => (
                      <div key={q} className="text-xs font-mono text-neutral-700 dark:text-neutral-300 italic">
                        {q}
                      </div>
                    ))}
                  </div>
                )}

                {/* Features list */}
                <ul className="mt-5 space-y-2.5 border-t border-neutral-100 dark:border-neutral-850 pt-4 text-xs text-neutral-700 dark:text-neutral-300">
                  {prod.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {prod.disclaimer && (
                  <div className="mt-4 text-[11px] text-neutral-400 dark:text-neutral-400 italic">
                    *{prod.disclaimer}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-850">
                <EarlyAccessButton
                  source={`product_${prod.id}`}
                  className="w-full justify-center flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>{prod.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </EarlyAccessButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
