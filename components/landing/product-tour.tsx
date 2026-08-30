'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  X,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Inbox,
  Layers,
  Activity,
  MessageSquareText,
  Zap,
  AlertTriangle,
  ArrowDown,
  ShieldCheck,
  Bot,
  User,
  Check,
} from 'lucide-react'

export interface ProductTourProps {
  open: boolean
  onClose: () => void
}

export function ProductTour({ open, onClose }: ProductTourProps) {
  // SINGLE SOURCE OF TRUTH: 1-indexed chapter (1 to 5)
  const [currentChapter, setCurrentChapter] = useState<number>(1)
  const [actionConfirmed, setActionConfirmed] = useState<string | null>(null)

  // Reset to Chapter 1 whenever modal is opened
  useEffect(() => {
    if (open) {
      setCurrentChapter(1)
      setActionConfirmed(null)
    }
  }, [open])

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        setCurrentChapter((prev) => (prev < 5 ? prev + 1 : 1))
      } else if (e.key === 'ArrowLeft') {
        setCurrentChapter((prev) => (prev > 1 ? prev - 1 : 5))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const handleNext = () => {
    if (currentChapter < 5) {
      setCurrentChapter((c) => c + 1)
    } else {
      setCurrentChapter(1)
    }
  }

  const handlePrev = () => {
    if (currentChapter > 1) {
      setCurrentChapter((c) => c - 1)
    }
  }

  const handleSelectChapter = (chapterNum: number) => {
    setCurrentChapter(chapterNum)
  }

  const handleActionClick = (actionName: string) => {
    setActionConfirmed(`Action triggered: "${actionName}" (Simulation)`)
    setTimeout(() => setActionConfirmed(null), 3000)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 font-sans select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Dhanvi Product Tour"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Main Tour Container */}
      <div className="relative flex w-full max-w-2xl max-h-[92vh] flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 text-white shadow-2xl animate-fade-up">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/70 px-5 py-3.5 sm:px-6 sm:py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                DHANVI PRODUCT TOUR
              </span>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                See how Dhanvi turns everyday transactions into continuous financial intelligence
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Tour"
          >
            Close <X className="h-4 w-4 ml-0.5" />
          </button>
        </div>

        {/* Scrollable Chapter Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {/* Chapter 1: CAPTURE */}
          {currentChapter === 1 && (
            <div key="chapter-1" className="space-y-5 animate-fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    01 — CAPTURE
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Chapter 1 of 5
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  ● Transaction captured in 0.4s
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Every transaction enters Dhanvi.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  Bank feeds, UPI credits, POS settlements, and supplier invoices enter Dhanvi the second they happen. Line items and GSTINs are extracted automatically.
                </p>
              </div>

              {/* Chapter 1 Demo Card */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-neutral-200">Incoming UPI Outflow</span>
                    <p className="text-[11px] text-neutral-400">HDFC Current A/c (***9021)</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Auto-OCR Verified
                  </span>
                </div>

                <div className="flex items-baseline">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    ₹42,500.00
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-800 space-y-1.5 text-xs font-mono text-neutral-300">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-neutral-400">Payee:</span>
                    <span className="font-semibold text-neutral-100">Apex Packaging Industries Ltd.</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-neutral-400">Document:</span>
                    <span className="font-semibold text-neutral-100">Tax Invoice #INV-8891</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-neutral-400">Audit Trail:</span>
                    <span className="font-semibold text-neutral-100">Immutable SHA-256 hash timestamped</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 2: UNDERSTAND */}
          {currentChapter === 2 && (
            <div key="chapter-2" className="space-y-5 animate-fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    02 — UNDERSTAND
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Chapter 2 of 5
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  ● Ledger verified
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Dhanvi understands what happened.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  Every transaction is categorized, reconciled, and mapped into your financial records automatically.
                </p>
              </div>

              {/* Chapter 2 Visual Flow */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-bold text-neutral-200">Accounting Kernel Flow</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Ledger balanced ✓
                  </span>
                </div>

                {/* Animated Pipeline Flow */}
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono font-bold text-neutral-300 py-1">
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200">
                    UPI Transaction
                  </span>
                  <span className="text-neutral-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200">
                    Supplier Payment
                  </span>
                  <span className="text-neutral-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200">
                    Packaging Expense
                  </span>
                  <span className="text-neutral-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200">
                    COGS
                  </span>
                  <span className="text-neutral-500">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                    General Ledger
                  </span>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Categorized automatically
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" /> GST data detected
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Double-entry verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3: MONITOR */}
          {currentChapter === 3 && (
            <div key="chapter-3" className="space-y-5 animate-fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    03 — MONITOR
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Chapter 3 of 5
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  ● Live monitoring active
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Dhanvi watches your business continuously.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  Instead of waiting until month-end, Dhanvi continuously monitors margins, expenses, cash flow, receivables, and unusual activity.
                </p>
              </div>

              {/* Chapter 3 Monitoring Dashboard */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 space-y-3.5 shadow-xl">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[10px] text-neutral-400 font-semibold font-mono">Gross Margin</p>
                    <p className="font-mono text-sm sm:text-base font-bold text-rose-400 mt-0.5">24% → 11%</p>
                    <p className="text-[10px] font-bold text-rose-500">↓ 13% Drop</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[10px] text-neutral-400 font-semibold font-mono">Packaging Costs</p>
                    <p className="font-mono text-sm sm:text-base font-bold text-rose-400 mt-0.5">+31%</p>
                    <p className="text-[10px] font-bold text-rose-500">Above Baseline</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[10px] text-neutral-400 font-semibold font-mono">Receivables</p>
                    <p className="font-mono text-sm sm:text-base font-bold text-amber-400 mt-0.5">₹4.82L</p>
                    <p className="text-[10px] font-bold text-amber-500">Overdue past 30d</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                    <p className="text-[10px] text-neutral-400 font-semibold font-mono">Cash Runway</p>
                    <p className="font-mono text-sm sm:text-base font-bold text-emerald-400 mt-0.5">42 days</p>
                    <p className="text-[10px] font-bold text-emerald-500">Liquid Buffer</p>
                  </div>
                </div>

                {/* Highlighted Warning Box */}
                <div className="rounded-xl bg-amber-950/60 p-3.5 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">
                      ⚠ Margin leak detected
                    </p>
                    <p className="leading-relaxed">
                      Detected on Day 5 (30 days before traditional month-end close).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 4: EXPLAIN */}
          {currentChapter === 4 && (
            <div key="chapter-4" className="space-y-5 animate-fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    04 — EXPLAIN
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Chapter 4 of 5
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  ● Financial data connected
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Ask Dhanvi what is happening.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  Ask questions in plain language and get answers grounded in your actual financial data.
                </p>
              </div>

              {/* Chapter 4 AI Chat Preview */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 space-y-3.5 shadow-xl">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-xs bg-white text-neutral-950 p-3 text-xs font-semibold">
                    <p>Why did profit fall this month?</p>
                  </div>
                </div>

                {/* Dhanvi AI Response */}
                <div className="flex justify-start">
                  <div className="max-w-[92%] rounded-2xl rounded-bl-xs bg-neutral-950 border border-neutral-800 p-4 text-xs space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Dhanvi</span>
                    </div>

                    <p className="text-neutral-200 leading-relaxed">
                      Operating profit declined 8.4%, primarily because raw-material costs increased 13% while average selling prices remained almost unchanged.
                    </p>

                    {/* Supporting Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                        <p className="text-[9px] text-neutral-400 font-mono">Revenue Growth</p>
                        <p className="font-mono text-xs font-bold text-emerald-400">+8.1%</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                        <p className="text-[9px] text-neutral-400 font-mono">COGS Increase</p>
                        <p className="font-mono text-xs font-bold text-rose-400">+13.2%</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                        <p className="text-[9px] text-neutral-400 font-mono">Net Profit</p>
                        <p className="font-mono text-xs font-bold text-white">₹6.59L</p>
                      </div>
                    </div>

                    <p className="text-[11px] font-bold text-amber-300 pt-1">
                      Product X gross margin fell from 24% to 11%.
                    </p>

                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-200">
                      <span className="font-bold text-emerald-400">Recommended Action: </span>
                      Review supplier pricing and wholesale margins.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: ACT */}
          {currentChapter === 5 && (
            <div key="chapter-5" className="space-y-5 animate-fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    05 — ACT
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Chapter 5 of 5
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400">
                  ● Action recommended
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Dhanvi helps you act before the problem grows.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  Turn financial signals into clear next steps instead of discovering problems after month-end.
                </p>
              </div>

              {/* Chapter 5 Action Panel */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    ⚠ MARGIN LEAK
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Day 5 Immediate Alert
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-neutral-300">
                    <span className="text-neutral-400">Problem: </span>
                    Packaging supplier increased prices by 31%.
                  </p>
                  <p className="text-xs font-semibold text-neutral-300">
                    <span className="text-emerald-400 font-bold">Dhanvi recommends: </span>
                    Renegotiate supplier pricing or adjust wholesale tier pricing.
                  </p>
                </div>

                {/* 3 Interactive Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleActionClick('Review Supplier')}
                    className="px-3.5 py-2 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-200 transition-all cursor-pointer shadow-xs"
                  >
                    Review Supplier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActionClick('Adjust Pricing')}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs font-bold hover:bg-neutral-700 transition-all cursor-pointer"
                  >
                    Adjust Pricing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActionClick('Ask Dhanvi')}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-emerald-400 text-xs font-bold hover:bg-neutral-700 transition-all cursor-pointer"
                  >
                    Ask Dhanvi
                  </button>
                </div>

                {actionConfirmed && (
                  <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-fade-up">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{actionConfirmed}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Human-approved execution
                  </span>
                  <span>Zero unauthorized ledger changes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900/90 px-5 py-3.5 sm:px-6 sm:py-4 shrink-0">
          {/* Chapter Selector (1 2 3 4 5) */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => {
              const isActive = num === currentChapter
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleSelectChapter(num)}
                  className={`h-7 w-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                  }`}
                  aria-label={`Go to Chapter ${num}`}
                  title={`Chapter ${num}`}
                >
                  {num}
                </button>
              )
            })}
          </div>

          {/* Nav Action Buttons */}
          <div className="flex items-center gap-2">
            {currentChapter > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-800 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>
            )}

            {currentChapter < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4.5 py-1.5 text-xs font-bold text-neutral-950 shadow-md hover:bg-neutral-100 transition-all cursor-pointer"
              >
                Next Chapter
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-emerald-600" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-3.5 py-1.5 text-xs font-bold text-neutral-200 hover:bg-neutral-700 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-emerald-400" /> Restart Tour
                </button>

                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4.5 py-1.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-all cursor-pointer"
                >
                  Launch Dhanvi
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
