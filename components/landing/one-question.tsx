'use client'

import React, { useState } from 'react'
import { Sparkles, ArrowRight, CornerDownLeft, Bot, CheckCircle2, ShieldAlert, TrendingUp } from 'lucide-react'
import { Reveal } from './reveal'

const PROMPT_SUGGESTIONS = [
  {
    text: 'What is our actual gross margin across product categories this month?',
    answer: 'Your overall gross margin is 35.8% (₹6.59L net profit on ₹18.42L revenue). Wholesale Electronics is your highest-margin segment at 42.1%, while Packaging Consumables dropped to 11.2% due to recent supplier price shifts.',
  },
  {
    text: 'Which debtors have outstanding invoices older than 45 days?',
    answer: 'There are 3 debtor accounts exceeding 45 days overdue totaling ₹2.40 Lakh: Apex Retailers (₹1.40L) and Metro Traders (₹72,000). Automated payment reminders can be dispatched with 1 click.',
  },
  {
    text: 'How much cash will we have in 30 days after paying vendor bills?',
    answer: 'Assuming projected collections of ₹4.82L and committed vendor payables of ₹3.14L, your projected 30-day liquid bank headroom will be ₹10.92 Lakh.',
  },
  {
    text: 'Where are our largest operating cost increases coming from?',
    answer: 'Outbound logistics and corrugated box packaging increased 31% MTD (₹85,000 above 6-month trailing average). All other administrative expenses remain within budgeted limits.',
  },
]

export function OneQuestion() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>(PROMPT_SUGGESTIONS[0].text)
  const [answer, setAnswer] = useState<string>(PROMPT_SUGGESTIONS[0].answer)
  const [customInput, setCustomInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAsk = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    setSelectedPrompt(trimmed)
    setIsLoading(true)

    setTimeout(() => {
      const match = PROMPT_SUGGESTIONS.find((p) => p.text.toLowerCase().includes(trimmed.toLowerCase()))
      if (match) {
        setAnswer(match.answer)
      } else {
        setAnswer(
          `Dhanvi analyzed your General Ledger across posted sales, expenses, and inventory: Operating performance is balanced at 35.8% net margin with ₹9.24L liquid cash headroom. No discrepancies detected.`
        )
      }
      setIsLoading(false)
    }, 700)
  }

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-positive" />
            Instant Financial Clarity
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            What would you ask if your finances were always up to date?
          </h2>
          <p className="mt-4 text-pretty text-sm sm:text-base text-neutral-600 font-medium">
            Test any natural question below to experience how Dhanvi turns raw double-entry accounting into immediate executive answers.
          </p>
        </Reveal>

        {/* Large Interactive Input Box */}
        <Reveal delay={80} className="mt-10">
          <div className="rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-2xl shadow-foreground/[0.04] text-left">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAsk(customInput)
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask Dhanvi anything about your cash, margins, or suppliers..."
                className="w-full rounded-2xl bg-muted/40 border border-border px-4 sm:px-5 py-4 text-xs sm:text-sm font-medium text-neutral-950 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all pr-24"
              />
              <button
                type="submit"
                disabled={!customInput.trim() || isLoading}
                className="absolute right-2 sm:right-3 px-4 py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 disabled:opacity-40 transition-all inline-flex items-center gap-1 cursor-pointer"
              >
                Ask <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Suggested Prompts Pills */}
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Or click an example question:
              </p>
              <div className="flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS.map((p) => (
                  <button
                    key={p.text}
                    onClick={() => {
                      setCustomInput('')
                      handleAsk(p.text)
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all text-left cursor-pointer font-medium ${
                      selectedPrompt === p.text
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-2xs'
                        : 'border-border bg-background text-neutral-700 hover:border-neutral-300 hover:bg-muted'
                    }`}
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Display Box */}
            <div className="mt-6 pt-5 border-t border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-950">Dhanvi Answer:</span>
                    <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ● General Ledger Verified
                    </span>
                  </div>

                  {isLoading ? (
                    <p className="text-xs text-muted-foreground mt-2 animate-pulse">
                      Analyzing journal entries and calculating exact figures...
                    </p>
                  ) : (
                    <p className="mt-2 text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                      {answer}
                    </p>
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
