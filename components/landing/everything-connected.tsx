'use client'

import { useState } from 'react'
import {
  Landmark,
  ShoppingCart,
  Boxes,
  Users,
  FileText,
  Wallet,
  BarChart3,
} from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

type Node = {
  key: string
  label: string
  icon: typeof Landmark
  effect: string
}

const NODES: Node[] = [
  { key: 'sales', label: 'Sales', icon: ShoppingCart, effect: 'Revenue, receivables and cash flow update the instant a sale is made.' },
  { key: 'bank', label: 'Banking', icon: Landmark, effect: 'Every UPI, NEFT and card movement reconciles against your books automatically.' },
  { key: 'inventory', label: 'Inventory', icon: Boxes, effect: 'Stock levels, COGS and margins recalculate as goods move in and out.' },
  { key: 'payroll', label: 'Payroll', icon: Users, effect: 'Salaries and reimbursements flow straight into expenses and cash flow.' },
  { key: 'invoices', label: 'Invoicing', icon: FileText, effect: 'Raised and paid invoices keep receivables and revenue perfectly in sync.' },
  { key: 'expenses', label: 'Expenses', icon: Wallet, effect: 'Bills and spends land in the right category with anomaly checks applied.' },
]

export function EverythingConnected() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Everything Connected"
          title="One system, not fifteen disconnected tools."
          description="Every part of your business feeds one continuously accurate financial core. Hover a source to see what it moves."
        />

        <Reveal className="mt-10">
          <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-xl shadow-foreground/[0.05] sm:p-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* sources */}
            <div className="grid grid-cols-2 gap-3">
              {NODES.map((n) => {
                const Icon = n.icon
                const isActive = active === n.key
                return (
                  <button
                    key={n.key}
                    onMouseEnter={() => setActive(n.key)}
                    onFocus={() => setActive(n.key)}
                    onClick={() => setActive(n.key)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                      isActive
                        ? 'border-info bg-info/[0.06] shadow-sm'
                        : 'border-border bg-background hover:border-foreground/20'
                    }`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive ? 'bg-info/15 text-info' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{n.label}</span>
                  </button>
                )
              })}
            </div>

            {/* core */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <span className="pulse-dot absolute inset-0 rounded-2xl" />
                <div className="relative flex flex-col items-center">
                  <BarChart3 className="h-6 w-6" />
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide">
                    Dhanvi
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">Financial core</span>
            </div>

            {/* effect */}
            <div className="rounded-xl border border-border bg-background p-5">
              {active ? (
                <div key={active} className="animate-fade-up">
                  <p className="text-xs font-semibold uppercase tracking-wide text-info">
                    {NODES.find((n) => n.key === active)?.label} → Financial core
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    {NODES.find((n) => n.key === active)?.effect}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a source to trace how it flows into your live financials. Nothing is
                  entered twice — it all connects.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
