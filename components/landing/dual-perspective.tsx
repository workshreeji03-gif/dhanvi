'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Calculator, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { EarlyAccessButton } from './ui-context'

export function DualPerspective() {
  return (
    <section id="dual-perspective" className="relative py-24 sm:py-32 bg-muted/20 border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Two Perspectives, One Ledger"
          title="Built for the two minds behind every successful business."
          description="Dhanvi delivers immediate plain-English cash clarity for business owners while maintaining mathematically rigorous, audit-ready double-entry journals for Chartered Accountants."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 items-stretch">
          {/* For Business Owners */}
          <Reveal>
            <div id="for-businesses" className="h-full rounded-3xl border border-border bg-card p-7 sm:p-9 shadow-xl shadow-foreground/[0.03] flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 font-bold">
                    <Briefcase className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700">
                      Operational Co-Pilot
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                      For Business Owners
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed mb-6">
                  Know what is happening in your business every single day without waiting for month-end close or deciphering confusing accounting journals.
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-800">
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Live Cash & Runway Visibility:</strong> Liquid bank balances and projected cash flow updated with every transaction.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Continuous Margin Protection:</strong> Real-time alerts when supplier price hikes or freight surcharges erode gross margins.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Conversational AI Assistant:</strong> Ask questions like <em>“Who owes us money?”</em> or <em>“Can we afford this PO?”</em> and get instant numbers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>1-Click WhatsApp Reminders:</strong> Collect receivables faster with automated polite reminders and direct UPI QR links.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-950 hover:text-emerald-700 transition-colors"
                >
                  Explore Founder Experience <ArrowRight className="w-4 h-4" />
                </Link>
                <EarlyAccessButton className="px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-850 cursor-pointer">
                  Join Early Access
                </EarlyAccessButton>
              </div>
            </div>
          </Reveal>

          {/* For Accountants & CAs */}
          <Reveal delay={100}>
            <div id="for-accountants" className="h-full rounded-3xl border border-emerald-500/40 bg-emerald-50/[0.15] p-7 sm:p-9 shadow-xl shadow-foreground/[0.03] flex flex-col justify-between hover:border-emerald-500/60 transition-all">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 font-bold">
                    <Calculator className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-800">
                      Advisory Command Center
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                      For Accountants & CAs
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed mb-6">
                  Spend less time chasing missing receipts, entering vouchers, and manually reconciling bank feeds. Spend more time providing high-value strategic advisory.
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-800">
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Strict Double-Entry Invariants:</strong> Real-time validation ensures debits equal credits for every posted journal entry.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Automated Bank Reconciliation:</strong> AI matches bank feeds with open invoices and identifies unreconciled discrepancies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Instant Audit-Ready Statements:</strong> Generate GAAP-compliant Balance Sheets, Trial Balances, P&L, and Cash Flow in one click.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span><strong>Accountant Review Queue:</strong> Flag and inspect unverified transactions with full audit trails before final tax closing.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-200/80 flex items-center justify-between">
                <Link
                  href="/accountant"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  View Accountant Portal <ArrowRight className="w-4 h-4" />
                </Link>
                <EarlyAccessButton className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer">
                  Join CA Network
                </EarlyAccessButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
