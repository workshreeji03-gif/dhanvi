'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  QrCode,
  Building2,
  Receipt,
  CreditCard,
  Package,
  ShoppingCart,
  Users,
  FileSpreadsheet,
  UserCheck,
  Briefcase,
  LayoutDashboard,
  BellRing,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const INPUT_NODES = [
  { id: 'upi', label: 'UPI & Instant QR', icon: QrCode, sub: 'Real-time settle' },
  { id: 'bank', label: 'Bank Feeds', icon: Building2, sub: 'Direct statement sync' },
  { id: 'invoices', label: 'GST Invoices', icon: Receipt, sub: 'Automated OCR capture' },
  { id: 'expenses', label: 'Operating Expenses', icon: CreditCard, sub: 'Live debit tracking' },
  { id: 'inventory', label: 'Multi-Location Stock', icon: Package, sub: 'SKU margin & re-order' },
  { id: 'sales', label: 'B2B Sales Orders', icon: ShoppingCart, sub: 'Customer invoices' },
  { id: 'receivables', label: 'Debtors & Creditors', icon: Users, sub: 'Aging schedules' },
  { id: 'accounting', label: 'Tally & ERP Books', icon: FileSpreadsheet, sub: 'Continuous ledger' },
]

const OUTPUT_NODES = [
  { id: 'owner', label: 'Business Founder', icon: UserCheck, desc: 'Live cash & margin visibility' },
  { id: 'ca', label: 'Chartered Accountant', icon: Briefcase, desc: 'Audit-ready balanced journals' },
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, desc: '6 live KPIs, zero blindspots' },
  { id: 'alerts', label: 'Proactive Alert Engine', icon: BellRing, desc: 'Instant anomaly detection' },
  { id: 'insights', label: 'Dhanvi AI Insights', icon: Lightbulb, desc: 'Actionable financial strategy' },
  { id: 'decisions', label: 'Informed Decisions', icon: CheckCircle2, desc: 'Confident inventory & cash planning' },
]

export function FinancialNervousSystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <section className="relative py-24 sm:py-32 bg-muted/20 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Architecture"
          title="Dhanvi becomes the financial nervous system of your business."
          description="Every payment, invoice, and journal entry flows through Dhanvi's continuous intelligence core — keeping founders, accountants, and decision-makers synchronized in real time."
        />

        <Reveal className="mt-14">
          <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl shadow-foreground/[0.03]">
            {/* Atmospheric Background glow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
              {/* Left Column: Data Ingestion Feeds */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    1. Continuous Data Inputs
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {INPUT_NODES.map((node) => {
                    const Icon = node.icon
                    const isHovered = hoveredNode === node.id
                    return (
                      <div
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isHovered
                            ? 'border-emerald-500 bg-emerald-50/70 shadow-xs scale-[1.02]'
                            : 'border-border bg-muted/30 hover:border-emerald-300 hover:bg-emerald-50/30'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-card border border-border/80 text-emerald-700 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-neutral-950 truncate">{node.label}</p>
                          <p className="text-[10px] text-muted-foreground truncate font-mono">{node.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Central Core: Dhanvi AI Intelligence Engine */}
              <div className="flex flex-col items-center justify-center p-6 text-center my-4 lg:my-0">
                <div className="relative">
                  {/* Pulsing halo */}
                  <div className="absolute -inset-3 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
                  <div className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full border-2 border-emerald-500 bg-neutral-950 text-white shadow-xl shadow-emerald-500/20 p-4">
                    <Sparkles className="w-8 h-8 text-emerald-400 animate-spin-slow mb-1" />
                    <span className="font-extrabold text-sm tracking-tight text-white">DHANVI</span>
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono mt-0.5">
                      Core Engine
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Double-Entry Invariant
                  </span>
                </div>
              </div>

              {/* Right Column: Intelligent Outputs & Stakeholders */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <span className="h-2 w-2 rounded-full bg-positive" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    2. Synchronized Outputs & Impact
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {OUTPUT_NODES.map((node) => {
                    const Icon = node.icon
                    const isHovered = hoveredNode === node.id
                    return (
                      <div
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isHovered
                            ? 'border-emerald-500 bg-emerald-50/70 shadow-xs scale-[1.02]'
                            : 'border-border bg-muted/30 hover:border-emerald-300 hover:bg-emerald-50/30'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-card border border-border/80 text-emerald-700 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-neutral-950 truncate">{node.label}</p>
                          <p className="text-[10px] text-neutral-600 truncate">{node.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bottom summary bar */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
              <span className="font-mono">
                Continuous General Ledger: <strong className="text-neutral-950">100% Real-Time Invariant Checking</strong>
              </span>
              <span className="font-semibold text-emerald-800">
                Zero data silos. Zero manual re-entry.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
