'use client'

import { useEffect, useState } from 'react'
import {
  X,
  ArrowRight,
  Camera,
  BookOpenCheck,
  Activity,
  AlertTriangle,
  MessageSquare,
  Wand2,
} from 'lucide-react'

const STEPS = [
  {
    icon: Camera,
    title: 'Capture transaction',
    body: 'A ₹48,500 UPI payment lands. Dhanvi captures it the moment it happens — no manual entry.',
    tone: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: BookOpenCheck,
    title: 'Update books',
    body: 'Sales, bank balance, receivables, P&L and cash flow all update automatically and instantly.',
    tone: 'text-positive',
    bg: 'bg-positive/10',
  },
  {
    icon: Activity,
    title: 'Monitor finances',
    body: 'Your live dashboard reflects the new reality. Revenue, profit and cash move in real time.',
    tone: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: AlertTriangle,
    title: 'Detect problem',
    body: 'Dhanvi spots that packaging costs are 31% above average and flags it before month-end.',
    tone: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: MessageSquare,
    title: 'Ask AI',
    body: '“Why did profit fall?” Dhanvi answers in plain English with the numbers behind it.',
    tone: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: Wand2,
    title: 'Take action',
    body: 'Act on a clear recommendation — with high-impact actions always human-approved.',
    tone: 'text-positive',
    bg: 'bg-positive/10',
  },
]

export function ProductTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!open) return
    setStep(0)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const current = STEPS[step]
  const Icon = current.icon
  const isLast = step === STEPS.length - 1

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Product tour"
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md" />
      <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-positive">
            60-second tour · {step + 1} / {STEPS.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Skip tour <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div key={step} className="animate-fade-up px-6 py-10 text-center sm:px-10 sm:py-14">
          <span className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${current.bg} ${current.tone}`}>
            <Icon className="h-8 w-8" />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Step {step + 1}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {current.title}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {current.body}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-primary' : 'w-1.5 bg-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => (isLast ? onClose() : setStep((s) => s + 1))}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
          >
            {isLast ? 'Finish' : 'Next'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
