'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, ChevronRight, User } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

type Answer = {
  intro: string
  reasons: string[]
  action: string
  detail: { label: string; value: string; tone: 'warning' | 'destructive' | 'muted' }[]
}

const QA: Record<string, Answer> = {
  'Why did profit fall?': {
    intro: 'Your profit declined 8.4%. I found three main reasons:',
    reasons: [
      'Raw material costs increased 13%.',
      'Product X margin dropped from 24% → 11%.',
      'Logistics expenses increased ₹82,000.',
    ],
    action:
      'Review Supplier A’s pricing and reduce your next Product X purchase by approximately 15%.',
    detail: [
      { label: 'Raw materials', value: '+₹1,42,000 (13%)', tone: 'warning' },
      { label: 'Product X margin', value: '24% → 11%', tone: 'destructive' },
      { label: 'Logistics', value: '+₹82,000', tone: 'warning' },
    ],
  },
  'Where are we overspending?': {
    intro: 'Two categories are running hot this month:',
    reasons: [
      'Packaging is 31% above your 6-month average.',
      'Marketing spend rose ₹64,000 with flat lead volume.',
    ],
    action: 'Renegotiate packaging supplier terms and pause the lowest-performing ad set.',
    detail: [
      { label: 'Packaging', value: '+31% vs avg', tone: 'warning' },
      { label: 'Marketing', value: '+₹64,000', tone: 'warning' },
    ],
  },
  'Who owes us money?': {
    intro: '₹4.82L is currently outstanding across 14 customers.',
    reasons: [
      'Sharma Electronics — ₹1.2L, 38 days overdue.',
      'Verma Traders — ₹86,000, 21 days overdue.',
      '9 smaller invoices under 15 days.',
    ],
    action: 'Send automated reminders to the 2 accounts overdue beyond 30 days.',
    detail: [
      { label: 'Overdue > 30d', value: '₹1.2L', tone: 'destructive' },
      { label: 'Overdue 15–30d', value: '₹86,000', tone: 'warning' },
      { label: 'Current', value: '₹2.76L', tone: 'muted' },
    ],
  },
  'Which product has the lowest margin?': {
    intro: 'Product X has your lowest margin right now.',
    reasons: [
      'Margin fell from 24% to 11% this quarter.',
      'Driven mostly by a 13% rise in input cost.',
    ],
    action: 'Increase price by 6–8% or switch to your secondary supplier for the next batch.',
    detail: [
      { label: 'Product X', value: '11% margin', tone: 'destructive' },
      { label: 'Category avg', value: '22% margin', tone: 'muted' },
    ],
  },
  'Can we afford ₹10L of inventory?': {
    intro: 'Yes — but it would leave your cash buffer thin.',
    reasons: [
      'Cash on hand: ₹9.24L, with ₹2.1L payable due in 7 days.',
      'A ₹10L purchase would require staggering or short-term credit.',
    ],
    action: 'Split the purchase into two ₹5L orders across the next 30 days.',
    detail: [
      { label: 'Cash available', value: '₹9.24L', tone: 'muted' },
      { label: 'Due in 7 days', value: '₹2.1L', tone: 'warning' },
    ],
  },
}

const CHIPS = Object.keys(QA)

export function AskDhanvi() {
  const [active, setActive] = useState<string>(CHIPS[0])
  const [typed, setTyped] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const answer = QA[active]

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setShowDetail(false)
    const full = answer.intro
    setTyped('')
    for (let i = 1; i <= full.length; i++) {
      timers.current.push(setTimeout(() => setTyped(full.slice(0, i)), i * 16))
    }
    return () => timers.current.forEach(clearTimeout)
  }, [active, answer.intro])

  const introDone = typed.length >= answer.intro.length

  return (
    <section id="ask" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Ask Dhanvi"
          title="Don't learn accounting. Ask your business."
          description="No dashboards to decode. Ask a plain-English question and get an answer backed by your own numbers."
        />

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.05]">
            {/* chips */}
            <div className="flex flex-wrap gap-2 border-b border-border bg-muted/30 p-4">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active === c
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* conversation */}
            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-start justify-end gap-2.5">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {active}
                </div>
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-4 w-4" />
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-info/15 text-info">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="w-full max-w-[85%] space-y-3 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {typed}
                    {!introDone && <span className="caret">▋</span>}
                  </p>

                  {introDone && (
                    <ol className="animate-fade-up space-y-1.5">
                      {answer.reasons.map((r, i) => (
                        <li key={r} className="flex gap-2 text-sm text-foreground">
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-[11px] font-bold text-info">
                            {i + 1}
                          </span>
                          {r}
                        </li>
                      ))}
                    </ol>
                  )}

                  {introDone && (
                    <div className="animate-fade-up rounded-lg border border-positive/25 bg-positive/[0.06] p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-positive">
                        Recommended action
                      </p>
                      <p className="mt-1 text-sm text-foreground">{answer.action}</p>
                    </div>
                  )}

                  {introDone && !showDetail && (
                    <button
                      onClick={() => setShowDetail(true)}
                      className="group inline-flex items-center gap-1 text-sm font-semibold text-info"
                    >
                      Show me why
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  )}

                  {showDetail && (
                    <div className="animate-fade-up grid gap-2 sm:grid-cols-3">
                      {answer.detail.map((d) => (
                        <div
                          key={d.label}
                          className="rounded-lg border border-border bg-background p-3"
                        >
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            {d.label}
                          </p>
                          <p
                            className={`mt-1 text-sm font-semibold ${
                              d.tone === 'destructive'
                                ? 'text-destructive'
                                : d.tone === 'warning'
                                  ? 'text-warning'
                                  : 'text-foreground'
                            }`}
                          >
                            {d.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
