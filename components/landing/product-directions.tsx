'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'

const PRODUCTS = [
  {
    num: '01',
    id: 'institutional',
    name: 'Dhanvi Institutional',
    status: 'Private Preview',
    headline: 'Investment intelligence infrastructure for professional organizations.',
    description:
      'Modular multi-agent deployment designed for quantitative desks, family offices, and institutional asset managers requiring autonomous research with deterministic risk governance.',
    capabilities: [
      'Research intelligence pipelines',
      'Strategy hypothesis generation & backtesting',
      'Portfolio covariance analytics',
      'Deterministic risk intelligence',
      'Immutable decision memory engine',
    ],
    actionText: 'Inquire for Institutional Preview',
  },
  {
    num: '02',
    id: 'intelligence',
    name: 'Dhanvi Intelligence',
    status: 'Early Access',
    headline: "A conversational interface over Dhanvi's accumulated research intelligence.",
    description:
      'A structured query interface allowing analysts to interrogate multi-agent findings, cross-asset regimes, and corporate disclosures in real time.',
    capabilities: [
      'Natural-language research queries',
      'Historical context & analog retrieval',
      'Cross-asset market relationships',
      'Decision intelligence breakdowns',
    ],
    actionText: 'Request API Early Access',
  },
  {
    num: '03',
    id: 'personal',
    name: 'Dhanvi Personal',
    status: 'Research Roadmap',
    headline: "A future constrained experience designed to bring parts of Dhanvi's research intelligence to individual investors.",
    description:
      'A strictly non-custodial research assistant helping self-directed investors evaluate portfolio factor health and market regime shifts.',
    capabilities: [
      'Personal portfolio factor research',
      'Portfolio health & regime insights',
      'Scenario stress-testing',
      'Simulated paper-research laboratory',
    ],
    actionText: 'Join Waitlist',
    disclaimer: 'Non-custodial research only. Does not manage client capital or provide automated execution.',
  },
]

export function ProductDirections() {
  return (
    <section id="products" className="py-24 sm:py-32 border-t border-[#E5E8E5] bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs font-normal text-[#606660] mb-3">
            Product directions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#101310] leading-tight">
            Three product directions.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#606660] leading-relaxed">
            Dhanvi is designing software-native financial intelligence for different scales of deployment
            — from institutional quantitative infrastructure to conversational research APIs and future personal tools.
          </p>
        </div>

        {/* Editorial Layout: Large Numbering + Horizontal Dividers (No Generic SaaS Cards) */}
        <div className="divide-y divide-[#E5E8E5] border-t border-b border-[#E5E8E5]">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Large Display Number & Status */}
              <div className="lg:col-span-3 flex lg:flex-col justify-between items-baseline lg:items-start gap-4">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#101310] font-mono tracking-tight">
                  {prod.num}
                </span>
                <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded">
                  {prod.status}
                </span>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-medium text-[#101310]">
                  {prod.name}
                </h3>
                <div className="text-sm font-medium text-[#606660]">
                  {prod.headline}
                </div>
                <p className="text-xs text-[#606660] leading-relaxed pt-1">
                  {prod.description}
                </p>
                {prod.disclaimer && (
                  <div className="text-[11px] text-[#929892] italic pt-2">
                    *{prod.disclaimer}
                  </div>
                )}
              </div>

              {/* Capabilities & CTA */}
              <div className="lg:col-span-4 space-y-5 lg:pl-6">
                <div className="text-xs font-medium text-[#101310]">
                  Key capabilities:
                </div>
                <ul className="space-y-2 text-xs text-[#606660]">
                  {prod.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <span className="text-[#10B981] select-none">—</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <EarlyAccessButton
                    source={`product_${prod.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#E5E8E5] hover:border-[#D8DDD8] bg-white px-4 py-2 text-xs font-medium text-[#101310] transition-colors cursor-pointer"
                  >
                    <span>{prod.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#606660]" />
                  </EarlyAccessButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
