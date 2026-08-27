'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Check, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

type Scenario = {
  kind: string
  headline: string
  customer: string
  type: string
  invoice: string
  payment: string
  amount: string
  updates: string[]
  anomaly: { flagged: boolean; text: string }
}

const SCENARIOS: Scenario[] = [
  {
    kind: 'Sales',
    headline: '₹48,500 payment received via UPI',
    customer: 'Sharma Electronics',
    type: 'Sales',
    invoice: 'INV-2841',
    payment: 'UPI',
    amount: '₹48,500',
    updates: ['Sales', 'Bank balance', 'Accounts receivable', 'Revenue', 'Profit & Loss', 'Cash flow'],
    anomaly: { flagged: false, text: 'No anomaly detected.' },
  },
  {
    kind: 'Purchase',
    headline: '₹1,12,000 raw material purchase',
    customer: 'Supplier A (Metals)',
    type: 'Purchase',
    invoice: 'BILL-1190',
    payment: 'Bank transfer',
    amount: '₹1,12,000',
    updates: ['Inventory', 'Bank balance', 'Accounts payable', 'Cost of goods', 'Profit & Loss', 'Cash flow'],
    anomaly: { flagged: true, text: 'Unit price 13% above last purchase — flagged for review.' },
  },
  {
    kind: 'Expense',
    headline: '₹82,000 logistics expense',
    customer: 'BlueDart Logistics',
    type: 'Expense',
    invoice: 'EXP-0447',
    payment: 'Corporate card',
    amount: '₹82,000',
    updates: ['Expenses', 'Bank balance', 'Profit & Loss', 'Cash flow'],
    anomaly: { flagged: true, text: 'Logistics 31% above monthly average — flagged.' },
  },
  {
    kind: 'Supplier payment',
    headline: '₹2,10,000 paid to supplier',
    customer: 'Verma Traders',
    type: 'Supplier payment',
    invoice: 'PAY-3320',
    payment: 'NEFT',
    amount: '₹2,10,000',
    updates: ['Accounts payable', 'Bank balance', 'Cash flow'],
    anomaly: { flagged: false, text: 'No anomaly detected.' },
  },
  {
    kind: 'Employee expense',
    headline: '₹14,200 employee reimbursement',
    customer: 'Priya (Sales)',
    type: 'Employee expense',
    invoice: 'REIMB-0912',
    payment: 'UPI',
    amount: '₹14,200',
    updates: ['Expenses', 'Bank balance', 'Payroll', 'Cash flow'],
    anomaly: { flagged: false, text: 'No anomaly detected.' },
  },
]

export function WatchWork() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const started = useRef(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const s = SCENARIOS[index]

  const runPipeline = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStep(0)
    ;[1, 2, 3, 4, 5].forEach((n) => {
      timers.current.push(setTimeout(() => setStep(n), n * 700))
    })
  }

  // auto-start when scrolled into view
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            runPipeline()
          }
        })
      },
      { threshold: 0.3 },
    )
    obs.observe(node)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const simulateAnother = () => {
    const next = (index + 1) % SCENARIOS.length
    setIndex(next)
    // restart pipeline on the next tick with the new scenario
    setTimeout(runPipeline, 0)
  }

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Watch Dhanvi Work"
          title="See what happens when a transaction occurs."
          description="No spreadsheets. No month-end wait. Watch a single payment flow through your entire financial system in real time."
        />

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.05]">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-info/10 px-2.5 py-1 text-xs font-semibold text-info">
                {s.kind}
              </span>
              <button
                type="button"
                onClick={simulateAnother}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <RefreshCw className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                Simulate another transaction
              </button>
            </div>

            <div className="grid gap-0 sm:grid-cols-2">
              {/* Steps 1-2 */}
              <div className="space-y-4 border-b border-border p-5 sm:border-b-0 sm:border-r">
                <PipeStep active={step >= 0} n="Step 1" title="Transaction detected">
                  <p className="text-sm font-semibold text-foreground">{s.headline}</p>
                </PipeStep>
                <Connector active={step >= 1} />
                <PipeStep active={step >= 1} n="Step 2" title="Dhanvi identifies">
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                    <Detail k="Customer" v={s.customer} />
                    <Detail k="Type" v={s.type} />
                    <Detail k="Invoice" v={s.invoice} />
                    <Detail k="Payment" v={s.payment} />
                    <Detail k="Amount" v={s.amount} />
                  </dl>
                </PipeStep>
              </div>

              {/* Steps 3-4 */}
              <div className="space-y-4 p-5">
                <PipeStep active={step >= 2} n="Step 3" title="Automatically updates">
                  <ul className="grid grid-cols-2 gap-1.5">
                    {s.updates.map((u, i) => (
                      <li
                        key={u}
                        className={`flex items-center gap-1.5 text-sm text-foreground transition-all ${
                          step >= 2 ? 'animate-fade-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${i * 90}ms` }}
                      >
                        <Check className="h-3.5 w-3.5 shrink-0 text-positive" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </PipeStep>
                <Connector active={step >= 3} />
                <PipeStep active={step >= 3} n="Step 4" title="AI checks the transaction">
                  <div
                    className={`flex items-start gap-2 rounded-lg p-2.5 text-sm ${
                      s.anomaly.flagged
                        ? 'bg-warning/10 text-foreground'
                        : 'bg-positive/10 text-foreground'
                    }`}
                  >
                    <ShieldCheck
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        s.anomaly.flagged ? 'text-warning' : 'text-positive'
                      }`}
                    />
                    <span>{s.anomaly.text}</span>
                  </div>
                </PipeStep>
              </div>
            </div>

            {/* Result */}
            <div
              className={`flex items-center justify-center gap-2 border-t border-border px-5 py-4 text-sm font-semibold transition-colors ${
                step >= 4 ? 'bg-positive/[0.07] text-positive' : 'bg-muted/30 text-muted-foreground'
              }`}
            >
              <Sparkles className={`h-4 w-4 ${step >= 4 ? 'text-positive' : ''}`} />
              {step >= 4 ? 'Business financials updated.' : 'Processing…'}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PipeStep({
  active,
  n,
  title,
  children,
}: {
  active: boolean
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-35'}`}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-positive">
          {n}
        </span>
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  )
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center">
      <ArrowDown
        className={`h-4 w-4 transition-colors ${active ? 'text-positive' : 'text-border'}`}
      />
    </div>
  )
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground">{v}</dd>
    </div>
  )
}
