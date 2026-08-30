'use client'

import React from 'react'
import { ShieldCheck, Lock, UserCheck, Scale, FileCode, CheckCircle2 } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const PRINCIPLES = [
  {
    icon: Lock,
    title: 'Privacy & Tenant Isolation',
    body: 'Financial records are encrypted in transit (TLS 1.3) and at rest (AES-256). Your private financial data is never used to train public models.',
  },
  {
    icon: UserCheck,
    title: 'Human-in-the-Loop Control',
    body: 'Dhanvi provides proactive intelligence and recommendations. Reversals, payments, and major journal entries always require explicit human authorization.',
  },
  {
    icon: Scale,
    title: 'Deterministic Accounting Math',
    body: 'Every balance is grounded in strict double-entry General Ledger balancing. Invariants ensure debits equal credits at all times — zero hallucinated numbers.',
  },
  {
    icon: ShieldCheck,
    title: 'Granular Role-Based Access',
    body: 'Separate workspace roles for Business Owners, Chartered Accountants, and Staff ensure sensitive payroll and margin data remain protected.',
  },
]

export function Trust() {
  return (
    <section id="trust" className="relative border-y border-border bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Security & Governance"
          title="Designed with financial clarity, control, and security in mind."
          description="Built on strict double-entry principles and enterprise-grade security standards. No black-box guesses, no unverified claims."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-background p-6 transition-all hover:border-neutral-300 hover:shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 mb-4">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-bold text-neutral-950">{p.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600 font-medium">
                      {p.body}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Strictly Enforced
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
