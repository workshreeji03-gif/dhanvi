'use client'

import React from 'react'
import {
  QrCode,
  Building,
  Receipt,
  FileSpreadsheet,
  Package,
  ArrowRightLeft,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const WORKFLOW_NODES = [
  {
    icon: QrCode,
    title: 'UPI & Instant Settlements',
    desc: 'High-frequency collections and QR vendor transfers captured with zero voucher delays.',
  },
  {
    icon: Building,
    title: 'Current Accounts & NEFT/RTGS',
    desc: 'Direct reconciliation with HDFC, ICICI, SBI, and Axis business banking statements.',
  },
  {
    icon: Receipt,
    title: 'GST-Compliant B2B Invoices',
    desc: 'Automated extraction of GSTIN, HSN codes, and taxable values from PDF & photo receipts.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel & Tally Interoperability',
    desc: 'Export audit-ready CSVs and double-entry trial balances directly for your CA’s closing software.',
  },
  {
    icon: Package,
    title: 'Multi-Location Stock & Inventory',
    desc: 'Track SKU cost changes, minimum re-order thresholds, and warehouse valuation.',
  },
  {
    icon: Users,
    title: 'Debtor & Creditor Ledgers',
    desc: 'Clear aging buckets (0–30, 31–60, 60+ days) with automated WhatsApp follow-ups.',
  },
]

export function BuiltForBusiness() {
  return (
    <section id="built-for-business" className="relative py-24 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Real-World Workflow"
          title="Built for the way modern businesses actually operate."
          description="From fast UPI payments to formal GST tax invoices and multi-location inventory, Dhanvi unifies fragmented Indian business operations into one balanced General Ledger."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW_NODES.map((node, i) => {
            const Icon = node.icon
            return (
              <Reveal key={node.title} delay={i * 50}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-7 transition-all duration-200 hover:border-neutral-300 hover:shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 mb-4">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-bold text-neutral-950">{node.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                      {node.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Native Support
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
