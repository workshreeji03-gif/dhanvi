'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, X, ArrowUp } from 'lucide-react'

const CANNED: Record<string, string> = {
  'What happened today?':
    'Today: ₹1,24,000 in sales across 9 transactions, ₹38,000 in expenses, and one flag — marketing spend is 38% above normal. Net cash moved +₹86,000.',
  'Where am I losing money?':
    'Product X is your weak spot — its margin fell from 24% to 11% this month after raw-material costs rose 13%. That alone cost you about ₹1.1L in profit.',
  'How much cash do I have?':
    'You currently hold ₹9,24,000 in cash. ₹2.1L in supplier payments are due within 7 days, leaving roughly ₹7.1L of headroom.',
  "What's my biggest expense?":
    'Raw materials at ₹4,82,000 (41% of expenses), followed by payroll at ₹2,90,000. Raw materials are up 13% vs. your 6-month average.',
}

const QUESTIONS = Object.keys(CANNED)

export function AskDhantraFab() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const answer = active ? CANNED[active] : ''

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (!active) {
      setTyped('')
      return
    }
    const full = CANNED[active]
    setTyped('')
    for (let i = 1; i <= full.length; i++) {
      timers.current.push(setTimeout(() => setTyped(full.slice(0, i)), i * 12))
    }
    return () => timers.current.forEach(clearTimeout)
  }, [active])

  return (
    <>
      {/* Panel */}
      {open && (
        <div className="animate-fade-up fixed bottom-24 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-info/15 text-info">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              Ask Dhanvi
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto p-4">
            {active ? (
              <>
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                  {active}
                </div>
                <div className="mr-auto max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground">
                  {typed}
                  {typed.length < answer.length && <span className="caret">▋</span>}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Ask about your business using mock data. Try one of these:
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border p-3">
            {QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setActive(q)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === q
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask Dhanvi"
        className="group fixed bottom-5 right-4 z-[60] inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-4 pr-5 text-sm font-semibold text-primary-foreground shadow-xl shadow-foreground/20 transition-all hover:shadow-2xl sm:right-6"
      >
        {open ? (
          <ArrowUp className="h-4 w-4 rotate-180 transition-transform" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        Ask Dhanvi
      </button>
    </>
  )
}
