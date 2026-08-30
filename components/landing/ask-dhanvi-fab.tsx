'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Sparkles, X, Send, Bot, User, CheckCircle2, ChevronRight } from 'lucide-react'

const PRESET_QUERIES: Record<string, string> = {
  'How much cash do we have right now?':
    'Your current liquid cash & bank balance is ₹9,24,000. Committed supplier payables due within 14 days total ₹3,14,000, leaving ₹6,10,000 in unencumbered liquidity.',
  'Where did our margin drop this month?':
    'Overall net profit margin is 35.8%. However, Product X gross margin declined from 24% to 18% after a 13% raw material cost increase.',
  'Who owes us the most overdue money?':
    'Total receivables are ₹4,82,000 across 14 accounts. 2 clients (Apex Retailers: ₹1.40L and Metro Traders: ₹72,000) are 45+ days overdue.',
  'What are our top operating expenses?':
    'Operating expenses MTD are ₹11.83 Lakh: Raw materials (₹7.20L / 61%), Logistics & packaging (₹2.45L / 21%), and Salaries & rent (₹2.18L / 18%).',
}

const QUESTIONS = Object.keys(PRESET_QUERIES)

export function AskDhanviFab() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [inputVal, setInputVal] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const answer = active ? PRESET_QUERIES[active] || 'Analyzing General Ledger...' : ''

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (!active) {
      setTyped('')
      return
    }
    const full = PRESET_QUERIES[active] || 'Your business is operating at a 35.8% net margin with ₹9.24L liquid cash headroom.'
    setTyped('')
    for (let i = 1; i <= full.length; i++) {
      timers.current.push(setTimeout(() => setTyped(full.slice(0, i)), i * 10))
    }
    return () => timers.current.forEach(clearTimeout)
  }, [active])

  return (
    <>
      {/* Floating Drawer Modal */}
      {open && (
        <div className="animate-fade-up fixed bottom-20 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:right-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-neutral-950">Ask Dhanvi AI</p>
                <p className="text-[10px] text-muted-foreground font-mono">● Connected to General Ledger</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Assistant"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-neutral-950 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Conversation Area */}
          <div className="max-h-80 min-h-[220px] space-y-3 overflow-y-auto p-4 text-xs sm:text-sm">
            {active ? (
              <div className="space-y-3">
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-xs bg-neutral-950 px-4 py-2.5 text-white font-medium shadow-xs">
                  {active}
                </div>
                <div className="mr-auto max-w-[90%] rounded-2xl rounded-bl-xs border border-border bg-muted/40 p-3.5 text-neutral-950 shadow-2xs">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    <Bot className="w-3 h-3" /> Dhanvi Answer
                  </div>
                  <p className="leading-relaxed font-medium">
                    {typed}
                    {typed.length < answer.length && <span className="caret">▋</span>}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 mb-2">
                  <Sparkles className="w-5 h-5" />
                </span>
                <p className="text-xs font-bold text-neutral-950">Ask anything about your business.</p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Click a suggested query below or type your own question:
                </p>
              </div>
            )}
          </div>

          {/* Suggested Query Chips */}
          <div className="flex flex-wrap gap-1.5 border-t border-border bg-muted/20 p-3">
            {QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setActive(q)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all text-left cursor-pointer ${
                  active === q
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-border bg-card text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <div className="border-t border-border p-2.5 bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!inputVal.trim()) return
                setActive(inputVal.trim())
                setInputVal('')
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about profit, debtors, cash..."
                className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-1.5 text-xs text-neutral-950 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating FAB trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask Dhanvi AI"
        className="group fixed bottom-5 right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-neutral-950 py-3 pl-4 pr-5 text-xs sm:text-sm font-bold text-white shadow-xl transition-all hover:bg-neutral-850 hover:scale-105 active:scale-95 sm:right-6 cursor-pointer"
      >
        <Sparkles className="h-4 w-4 text-emerald-400" />
        <span>Ask Dhanvi</span>
      </button>
    </>
  )
}
