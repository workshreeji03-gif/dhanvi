'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

const PRODUCTS = [
  {
    id: 'institutional',
    tier: '01 / Infrastructure',
    name: 'Dhanvi Institutional',
    headline: 'AI-native investment infrastructure for professional funds',
    description:
      'Modular multi-agent deployment designed for quantitative desks, family offices, and institutional managers requiring autonomous research with deterministic risk governance.',
    capabilities: [
      'Multi-agent market research pipelines',
      'Strategy hypothesis generation & cross-validation',
      'Deterministic risk & factor stress-testing',
      'Forensic decision memory indexing ledger',
      'Low-latency institutional execution connectivity',
    ],
    actionText: 'Inquire for Institutional Preview',
  },
  {
    id: 'intelligence',
    tier: '02 / Query API',
    name: 'Dhanvi Intelligence',
    headline: 'Conversational synthesis over global market telemetry',
    description:
      'A structured query interface allowing analysts to interrogate multi-agent findings, cross-asset regimes, and filing delta diffs in real time.',
    sampleQueries: [
      '“What changed across semiconductor supply chains this week?”',
      '“What historical episodes resemble the current yield curve steepening?”',
      '“Deconstruct the factor drivers behind our 72-hour drawdown.”',
    ],
    capabilities: [
      'Natural-language semantic market query',
      'Filing delta extraction & entity mapping',
      'Factor sensitivity and attribution breakdowns',
    ],
    actionText: 'Request API Early Access',
  },
  {
    id: 'personal',
    tier: '03 / Research Roadmap',
    name: 'Dhanvi Personal',
    headline: 'Constrained financial research co-pilot for individuals',
    description:
      'A future, non-custodial research assistant helping self-directed investors evaluate portfolio factor exposures and market regime shifts.',
    capabilities: [
      'Personal portfolio factor risk inspection',
      'Scenario stress-testing & regime notifications',
      'Simulated paper-research laboratory',
      'Educational intelligence insights',
    ],
    actionText: 'Join Waitlist',
    disclaimer: 'Non-custodial research only. Does not manage client capital.',
  },
]

export function ProductDirections() {
  return (
    <section id="products" className="py-28 sm:py-36 border-t border-white/[0.06] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs font-medium text-[#9A9F9B] mb-3">
            Product architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F1F3EF] leading-[1.12]">
            Three product directions.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9A9F9B] leading-relaxed">
            Dhanvi is designing software-native financial intelligence for different scales of deployment
            — from institutional quantitative infrastructure to conversational research APIs and future personal tools.
          </p>
        </div>

        {/* 3 Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="border border-white/[0.08] rounded-xl bg-[#111412] p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Tier Metadata */}
                <div className="text-xs font-mono text-[#7A807B] mb-4">{prod.tier}</div>

                {/* Product Name & Headline */}
                <h3 className="text-xl font-medium text-[#F1F3EF]">{prod.name}</h3>
                <div className="text-xs text-[#9A9F9B] mt-1.5 font-normal leading-normal">
                  {prod.headline}
                </div>

                <p className="mt-4 text-xs text-[#7A807B] leading-relaxed">
                  {prod.description}
                </p>

                {/* Sample Queries for Intelligence Tier */}
                {prod.sampleQueries && (
                  <div className="my-5 p-3.5 rounded-lg bg-[#0C0F0D] border border-white/[0.04] space-y-2">
                    <div className="text-[10px] font-mono text-[#7A807B] uppercase tracking-wider">
                      Sample Queries
                    </div>
                    {prod.sampleQueries.map((q) => (
                      <div key={q} className="text-xs text-[#9A9F9B] italic">
                        {q}
                      </div>
                    ))}
                  </div>
                )}

                {/* Capabilities list */}
                <ul className="mt-6 pt-5 border-t border-white/[0.06] space-y-2.5 text-xs text-[#9A9F9B]">
                  {prod.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <span className="text-[#10B981] leading-tight select-none">—</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                {prod.disclaimer && (
                  <div className="mt-5 text-[11px] text-[#7A807B] italic">
                    *{prod.disclaimer}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-5 border-t border-white/[0.06]">
                <EarlyAccessButton
                  source={`product_${prod.id}`}
                  className="w-full inline-flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#151816] px-4 py-2.5 text-xs font-medium text-[#F1F3EF] hover:border-white/[0.2] transition-colors cursor-pointer"
                >
                  <span>{prod.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9A9F9B]" />
                </EarlyAccessButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
