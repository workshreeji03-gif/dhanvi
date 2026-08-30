'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  DollarSign,
  Bot,
  AlertCircle,
  Clock,
  Lock,
} from 'lucide-react'
import { Reveal } from './reveal'

// 3 Rich Interactive Business Scenarios
export interface SimulationScenario {
  id: 'margin-leak' | 'cost-spike' | 'cash-flow'
  name: string
  subtitle: string
  moneyAtRiskMax: number
  riskLabel: string
  protectedLabel: string
  steps: {
    stepNum: number
    day: number
    title: string
    description: string
    riskAmount: number
    withDhanvi: {
      status: string
      action: string
      state: 'normal' | 'signal' | 'alert' | 'action' | 'protected'
    }
    withoutDhanvi: {
      status: string
      state: 'blind' | 'leak' | 'loss'
    }
    chartSignalActive?: boolean
  }[]
  magicMoment: {
    headline: string
    subheadline: string
    detectedSummary: string
    estimatedImpact: string
    recommendedAction: string
    actionButtonText: string
  }
  decisionQuestion: {
    prompt: string
    options: { key: string; label: string; isCorrect?: boolean }[]
    feedback: string
  }
}

const SCENARIOS: Record<string, SimulationScenario> = {
  'margin-leak': {
    id: 'margin-leak',
    name: 'MARGIN LEAK',
    subtitle: 'Packaging cost inflation on bulk wholesale orders',
    moneyAtRiskMax: 180000,
    riskLabel: 'Quarterly Margin at Risk',
    protectedLabel: '₹1,80,000 Protected by Early Action',
    steps: [
      {
        stepNum: 1,
        day: 1,
        title: 'Transaction Received',
        description: 'Customer completes ₹42,500 purchase via UPI. Ingestion verified in 0.4s.',
        riskAmount: 0,
        withDhanvi: {
          status: 'General Ledger debits equal credits in real time.',
          action: 'Continuous telemetry active across bank feeds & GST invoices.',
          state: 'normal',
        },
        withoutDhanvi: {
          status: 'Invoices filed in physical binder. Zero live visibility.',
          state: 'blind',
        },
      },
      {
        stepNum: 2,
        day: 4,
        title: 'Supplier Invoice Processed',
        description: 'Packaging vendor posts batch invoice #INV-8891 for 2,000 corrugated packing units.',
        riskAmount: 25000,
        withDhanvi: {
          status: 'Invoice line items auto-extracted & classified to Operating Expenses.',
          action: 'OCR verified tax breakdown: Taxable ₹36,017 + ₹6,483 GST.',
          state: 'normal',
        },
        withoutDhanvi: {
          status: 'Receipt filed in accounts inbox pending month-end data entry.',
          state: 'blind',
        },
      },
      {
        stepNum: 3,
        day: 5,
        title: 'Cost Increases by 31%',
        description: 'Corrugated box supplier unit rate jumped from ₹18.00 to ₹24.50 (+31%).',
        riskAmount: 48000,
        withDhanvi: {
          status: 'TELEMETRY SIGNAL: Packaging unit cost +31% above 6-month baseline.',
          action: 'Dhanvi flags margin anomaly immediately upon voucher posting.',
          state: 'signal',
        },
        withoutDhanvi: {
          status: 'Nobody notices the unit price hike. Batch orders continue fulfilling.',
          state: 'blind',
        },
        chartSignalActive: true,
      },
      {
        stepNum: 4,
        day: 6,
        title: 'Gross Margin Begins Falling',
        description: 'Product X gross margin drops from baseline 24% down to 11% across orders.',
        riskAmount: 72000,
        withDhanvi: {
          status: 'Dhanvi projects ₹1,80,000 quarterly margin leakage if unaddressed.',
          action: 'Draft supplier renegotiation brief generated for executive review.',
          state: 'alert',
        },
        withoutDhanvi: {
          status: 'Daily margin leak accumulating silently across 140+ batch shipments.',
          state: 'leak',
        },
      },
      {
        stepNum: 5,
        day: 9,
        title: 'Dhanvi Detects the Anomaly',
        description: 'Proactive early-warning alert sent to Founder & Accountant simultaneously.',
        riskAmount: 110000,
        withDhanvi: {
          status: 'Alert delivered: "Packaging costs increased 31% with flat selling prices."',
          action: 'Actionable choice presented: Renegotiate supplier contract or adjust tier prices.',
          state: 'alert',
        },
        withoutDhanvi: {
          status: 'Founder assumes wholesale operations are profitable. Day 9 blindspot.',
          state: 'leak',
        },
      },
      {
        stepNum: 6,
        day: 10,
        title: 'Recommended Action Generated',
        description: 'Dhanvi formulates concrete vendor renegotiation strategy with MOQ targets.',
        riskAmount: 145000,
        withDhanvi: {
          status: 'Recommended Action: Renegotiate supplier pricing or adjust wholesale price by 6%.',
          action: '1-click supplier rate inquiry email & WhatsApp brief ready for founder approval.',
          state: 'action',
        },
        withoutDhanvi: {
          status: 'Margin continues compounding down. 21 days remaining until month-end close.',
          state: 'leak',
        },
      },
      {
        stepNum: 7,
        day: 12,
        title: 'Owner Takes Action',
        description: 'Founder executes vendor renegotiation with Apex Packaging. Unit rate revised.',
        riskAmount: 180000,
        withDhanvi: {
          status: 'Supplier contract updated to fixed SLA rate. Margin normalized to 24%.',
          action: 'Future margin leakage halted completely on Day 12.',
          state: 'action',
        },
        withoutDhanvi: {
          status: 'Unaware of ongoing leak. Compounding losses threaten working capital.',
          state: 'leak',
        },
      },
      {
        stepNum: 8,
        day: 31,
        title: '₹1.8L Potential Loss Avoided',
        description: 'Month closes with books 100% balanced, verified, and audited.',
        riskAmount: 180000,
        withDhanvi: {
          status: '₹1,80,000 SAVED: Problem caught on Day 5, solved on Day 12.',
          action: 'Founder & CA review strategic growth instead of doing month-end damage control.',
          state: 'protected',
        },
        withoutDhanvi: {
          status: '₹1,80,000 LOST: Traditional month-end finally reveals the loss 30 days too late.',
          state: 'loss',
        },
      },
    ],
    magicMoment: {
      headline: '✦ DHANVI NOTICED SOMETHING',
      subheadline: 'Proactive Anomaly Detected on Day 5',
      detectedSummary: 'Packaging costs increased 31% while selling prices remained unchanged.',
      estimatedImpact: 'Estimated margin erosion: ₹1,80,000 / quarter',
      recommendedAction: 'Renegotiate supplier pricing with Apex Packaging OR adjust wholesale pricing by 6%.',
      actionButtonText: 'Review recommendation →',
    },
    decisionQuestion: {
      prompt: 'Supplier packaging unit cost just surged +31%. What would you do?',
      options: [
        { key: 'A', label: 'Do nothing' },
        { key: 'B', label: 'Check next month' },
        { key: 'C', label: 'Investigate now', isCorrect: true },
      ],
      feedback: 'Exactly. Dhanvi already did — on Day 5 before the loss grew.',
    },
  },
  'cost-spike': {
    id: 'cost-spike',
    name: 'COST SPIKE',
    subtitle: 'Surge logistics billing overcharges across 3 carrier bills',
    moneyAtRiskMax: 85000,
    riskLabel: 'Billing Overcharges at Risk',
    protectedLabel: '₹85,000 Recovered by SLA Enforcement',
    steps: [
      {
        stepNum: 1,
        day: 1,
        title: 'Normal Shipping Dispatch',
        description: 'Outbound courier shipments dispatched to 18 retail stores under standard SLA.',
        riskAmount: 0,
        withDhanvi: {
          status: 'Shipping charges recorded against standard logistics ledger account.',
          action: 'Carrier contract baseline verified at ₹42/kg standard rate.',
          state: 'normal',
        },
        withoutDhanvi: {
          status: 'Courier slips filed in shipping log.',
          state: 'blind',
        },
      },
      {
        stepNum: 2,
        day: 6,
        title: '3 Surge Invoices Posted',
        description: 'Logistics provider posts 3 invoices with unannounced ₹28/kg peak surcharges.',
        riskAmount: 32000,
        withDhanvi: {
          status: 'TELEMETRY SIGNAL: Freight rate ₹70/kg vs contracted ₹42/kg rate card.',
          action: 'Dhanvi flags SLA billing discrepancy across 3 consecutive invoices.',
          state: 'signal',
        },
        withoutDhanvi: {
          status: 'Accounts clerk approves invoices without checking contract rate card.',
          state: 'blind',
        },
        chartSignalActive: true,
      },
      {
        stepNum: 3,
        day: 9,
        title: 'Dhanvi Compares Against SLA',
        description: 'Dhanvi audits carrier rate history against guaranteed annual SLA contract.',
        riskAmount: 55000,
        withDhanvi: {
          status: 'Discrepancy confirmed: ₹85,000 in uncontracted peak surcharges applied in error.',
          action: 'Dhanvi drafts formal carrier SLA billing dispute notice.',
          state: 'alert',
        },
        withoutDhanvi: {
          status: 'Excess shipping fees debited from current bank account automatically.',
          state: 'leak',
        },
      },
      {
        stepNum: 4,
        day: 14,
        title: 'Dispute Issued & ₹85,000 Recovered',
        description: 'Carrier accepts dispute notice and issues ₹85,000 credit adjustment note.',
        riskAmount: 85000,
        withDhanvi: {
          status: '₹85,000 CREDIT SECURED: Overcharge recovered within 5 business days.',
          action: 'Carrier billing rules locked to prevent future automated surcharges.',
          state: 'protected',
        },
        withoutDhanvi: {
          status: '₹85,000 LOST: Discovered 45 days later during annual audit. Non-refundable.',
          state: 'loss',
        },
      },
    ],
    magicMoment: {
      headline: '✦ DHANVI NOTICED SOMETHING',
      subheadline: 'Uncontracted Carrier Surcharge Detected',
      detectedSummary: '3 courier invoices billed at ₹70/kg vs contracted ₹42/kg SLA rate.',
      estimatedImpact: 'Recoverable billing discrepancy: ₹85,000',
      recommendedAction: 'Issue formal billing dispute notice citing Section 4.2 of carrier master agreement.',
      actionButtonText: 'Generate SLA Dispute Notice →',
    },
    decisionQuestion: {
      prompt: 'Logistics bills surged +28% above rate card. What would you do?',
      options: [
        { key: 'A', label: 'Pay the bill' },
        { key: 'B', label: 'Wait for accountant' },
        { key: 'C', label: 'Investigate now', isCorrect: true },
      ],
      feedback: 'Exactly. Dhanvi audited the SLA rate card and flagged the overcharge in minutes.',
    },
  },
  'cash-flow': {
    id: 'cash-flow',
    name: 'CASH FLOW',
    subtitle: '₹10L inventory purchase risk against working capital runway',
    moneyAtRiskMax: 500000,
    riskLabel: 'Working Capital Buffer at Risk',
    protectedLabel: '₹5,00,000 Liquidity Preserved',
    steps: [
      {
        stepNum: 1,
        day: 1,
        title: 'Draft Purchase Order Created',
        description: 'Procurement team drafts ₹10,00,000 bulk raw material purchase order #PO-941.',
        riskAmount: 0,
        withDhanvi: {
          status: 'Draft PO evaluated against liquid bank balance (₹9.24L) & upcoming payroll (₹3.14L).',
          action: 'Dhanvi calculates post-PO 30-day liquid cash buffer.',
          state: 'normal',
        },
        withoutDhanvi: {
          status: 'Manager approves PO based on current bank balance without checking 14-day payables.',
          state: 'blind',
        },
      },
      {
        stepNum: 2,
        day: 5,
        title: 'Runway Squeeze Detected',
        description: 'Dhanvi projects liquid cash buffer falling to ₹2.14L — below the 2-month safety floor.',
        riskAmount: 250000,
        withDhanvi: {
          status: 'TELEMETRY SIGNAL: Committed payables + upfront PO will cause cash squeeze on Day 18.',
          action: 'Dhanvi recommends 50/50 phased delivery & payment schedule over 30 days.',
          state: 'signal',
        },
        withoutDhanvi: {
          status: '100% upfront payment dispatched. Bank balance drops sharply.',
          state: 'blind',
        },
        chartSignalActive: true,
      },
      {
        stepNum: 3,
        day: 8,
        title: 'Supplier Accepts Phased Terms',
        description: 'Supplier agrees to two ₹5L tranches spaced 15 days apart. Liquid buffer secured.',
        riskAmount: 500000,
        withDhanvi: {
          status: '₹5,00,000 CASH BUFFER PRESERVED: Vendor payroll & taxes paid on time with zero strain.',
          action: 'Overdue debtor collections prioritized via automated UPI WhatsApp reminders.',
          state: 'protected',
        },
        withoutDhanvi: {
          status: 'CASH SQUEEZE: Business forced to take high-interest overdraft to cover payroll.',
          state: 'loss',
        },
      },
    ],
    magicMoment: {
      headline: '✦ DHANVI NOTICED SOMETHING',
      subheadline: 'Working Capital Squeeze Anticipated',
      detectedSummary: 'Executing 100% upfront PO reduces liquid cash buffer below 2-month safety floor.',
      estimatedImpact: 'Projected working capital deficit: ₹5,00,000 on Day 18',
      recommendedAction: 'Split procurement into two ₹5L tranches spaced 15 days apart.',
      actionButtonText: 'Split Purchase Order Terms →',
    },
    decisionQuestion: {
      prompt: 'A ₹10L inventory PO will tighten your 30-day cash buffer. What would you do?',
      options: [
        { key: 'A', label: 'Hope sales cover it' },
        { key: 'B', label: 'Take bank loan' },
        { key: 'C', label: 'Investigate now', isCorrect: true },
      ],
      feedback: 'Exactly. Dhanvi modeled 30-day cash flow and proposed phased 50/50 supplier terms.',
    },
  },
}

export function RealtimeVsMonthend() {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<string>('margin-leak')
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [userChoice, setUserChoice] = useState<string | null>(null)
  const [magicReviewOpen, setMagicReviewOpen] = useState<boolean>(false)

  const scenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['margin-leak']
  const totalSteps = scenario.steps.length
  const currentStep = scenario.steps[stepIndex] || scenario.steps[0]

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1
        } else {
          // Pause briefly at end, then loop back
          return 0
        }
      })
    }, 3800)

    return () => clearInterval(timer)
  }, [isPlaying, totalSteps, selectedScenarioKey])

  // Reset steps when switching scenarios
  const handleSelectScenario = (key: string) => {
    setSelectedScenarioKey(key)
    setStepIndex(0)
    setUserChoice(null)
    setMagicReviewOpen(false)
    setIsPlaying(true)
  }

  const handlePrev = () => {
    setIsPlaying(false)
    setStepIndex((prev) => (prev > 0 ? prev - 1 : totalSteps - 1))
  }

  const handleNext = () => {
    setIsPlaying(false)
    setStepIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : 0))
  }

  const handleReplay = () => {
    setStepIndex(0)
    setUserChoice(null)
    setMagicReviewOpen(false)
    setIsPlaying(true)
  }

  // Derived progress and money display
  const progressRatio = totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 100 : 0
  const isEnd = stepIndex === totalSteps - 1

  return (
    <section id="see-dhanvi-think" className="relative py-24 sm:py-32 bg-background border-b border-border font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            See Dhanvi Think
          </span>

          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl leading-[1.1]">
            Your books shouldn’t tell you what happened.{' '}
            <span className="text-emerald-700 block sm:inline">
              They should tell you what’s happening.
            </span>
          </h2>

          <p className="mt-6 text-pretty text-sm sm:text-base leading-relaxed text-neutral-600 font-medium">
            Watch a single business problem unfold in real time — and see how Dhanvi catches it before month-end.
          </p>
        </div>

        {/* Central Live Simulation Container */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/[0.04]">
          {/* Top Simulation Toolbar */}
          <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-6 py-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
              </span>
              <div>
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-neutral-950">
                  LIVE BUSINESS SIMULATION
                </span>
                <span className="text-[11px] text-emerald-700 font-bold ml-2">
                  ● {isPlaying ? 'SIMULATING' : 'PAUSED'}
                </span>
              </div>
            </div>

            {/* Scenario Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {Object.values(SCENARIOS).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(sc.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedScenarioKey === sc.id
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-card border border-border text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  {sc.name}
                </button>
              ))}
            </div>

            {/* Month & Day Badge */}
            <div className="text-right font-mono text-xs text-neutral-700">
              <span className="font-bold text-neutral-950">MONTH 01</span> · Day {currentStep.day.toString().padStart(2, '0')} of 31
            </div>
          </div>

          {/* Main Simulation Workspace */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Step Progress Bar & Timeline Event Nodes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span className="font-bold text-neutral-950">
                  Step {currentStep.stepNum} of {totalSteps}: {currentStep.title}
                </span>
                <span className="text-emerald-700 font-bold">
                  Day {currentStep.day} / 31
                </span>
              </div>

              {/* Visual Progress Track */}
              <div className="relative h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-500 ease-out"
                  style={{ width: `${progressRatio}%` }}
                />
              </div>

              {/* Event Nodes Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
                {scenario.steps.map((st, idx) => {
                  const isActive = stepIndex === idx
                  const isPast = stepIndex > idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsPlaying(false)
                        setStepIndex(idx)
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                          : isPast
                          ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                          : 'border-border bg-card text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      <p className="font-mono text-[10px] font-bold">DAY {st.day}</p>
                      <p className="text-[11px] truncate mt-0.5 font-medium">{st.title}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Money At Risk Live Counter Strip */}
            <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  MONEY AT RISK
                </span>
                <div className="flex items-baseline gap-3">
                  <span className={`font-mono text-3xl sm:text-4xl font-extrabold transition-all duration-300 ${
                    isEnd ? 'text-emerald-700' : currentStep.riskAmount > 0 ? 'text-rose-700' : 'text-neutral-950'
                  }`}>
                    ₹{currentStep.riskAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-neutral-600">
                    {isEnd ? scenario.protectedLabel : `${scenario.riskLabel} on Day ${currentStep.day}`}
                  </span>
                </div>
              </div>

              {/* Mini Analytical Signal Chart */}
              <div className="rounded-xl bg-card border border-border p-3 space-y-1 text-[11px] font-mono shrink-0 shadow-2xs">
                <div className="flex items-center justify-between gap-6 text-neutral-600">
                  <span>Revenue:</span>
                  <span className="text-emerald-700 font-bold">────────────────</span>
                </div>
                <div className="flex items-center justify-between gap-6 text-neutral-600">
                  <span>Costs:</span>
                  <span className="text-rose-700 font-bold">───────────╱─────</span>
                </div>
                <div className="flex items-center justify-between gap-6 text-neutral-600">
                  <span>Margin:</span>
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    ─────────╲──────
                    {currentStep.chartSignalActive && (
                      <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Parallel Visual Paths: WITH DHANVI vs WITHOUT DHANVI */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 1. With Dhanvi Path (Fast, Proactive, Protected) */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 p-6 flex flex-col justify-between transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold shadow-2xs">
                        <Zap className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-neutral-950">WITH DHANVI</h3>
                        <p className="text-xs text-emerald-800 font-semibold">Continuous Signal Engine</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Day {currentStep.day} Active
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="rounded-xl bg-white p-4 border border-emerald-200 shadow-2xs space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                        Dhanvi Telemetry Status
                      </p>
                      <p className="font-semibold text-neutral-950 leading-relaxed">
                        {currentStep.withDhanvi.status}
                      </p>
                    </div>

                    <div className="rounded-xl bg-emerald-100/70 p-4 border border-emerald-300/70 space-y-1 text-emerald-950">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 font-mono">
                        Automated System Action
                      </p>
                      <p className="font-medium leading-relaxed">
                        {currentStep.withDhanvi.action}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Actionable from Day {currentStep.day}</span>
                  <span className="text-emerald-700 font-bold">
                    {isEnd ? '₹1.8L Protected' : 'Zero Decision Lag'}
                  </span>
                </div>
              </div>

              {/* 2. Without Dhanvi Path (Blind, Delayed, Loss Compounding) */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-6 flex flex-col justify-between transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-200 text-neutral-700">
                        <Clock className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-neutral-950">WITHOUT DHANVI</h3>
                        <p className="text-xs text-muted-foreground">Traditional Month-End Batch</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      {31 - currentStep.day > 0 ? `${31 - currentStep.day} Days Blind` : 'Month-End Discovery'}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="rounded-xl bg-white p-4 border border-rose-200 shadow-2xs space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-800 font-mono">
                        Traditional Workflow
                      </p>
                      <p className="font-semibold text-neutral-950 leading-relaxed">
                        {currentStep.withoutDhanvi.status}
                      </p>
                    </div>

                    <div className="rounded-xl bg-rose-100/70 p-4 border border-rose-300/70 space-y-1 text-rose-950">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-900 font-mono">
                        Impact on Business
                      </p>
                      <p className="font-medium leading-relaxed">
                        {isEnd
                          ? 'Loss discovered 30 days too late to renegotiate past supplier invoices.'
                          : 'Daily margin leak compounding undetected across every fulfilled customer order.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-rose-200 text-xs text-muted-foreground flex items-center justify-between">
                  <span>Traditional accounting</span>
                  <span className="font-semibold text-rose-800">
                    {isEnd ? '₹1.8L Lost' : `${31 - currentStep.day} days until books close`}
                  </span>
                </div>
              </div>
            </div>

            {/* The "Dhanvi Magic Moment" Expandable Card */}
            <div className="rounded-3xl border-2 border-emerald-500/50 bg-emerald-50/60 p-6 sm:p-7 shadow-lg space-y-4 animate-fade-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-neutral-950 font-mono">
                      {scenario.magicMoment.headline}
                    </h4>
                    <p className="text-xs text-emerald-800 font-semibold">
                      {scenario.magicMoment.subheadline}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 self-start sm:self-auto">
                  Deterministic Financial Intelligence
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Detected Signal
                  </span>
                  <p className="text-neutral-950 font-semibold leading-relaxed">
                    {scenario.magicMoment.detectedSummary}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700">
                    Calculated Impact
                  </span>
                  <p className="text-neutral-950 font-semibold leading-relaxed">
                    {scenario.magicMoment.estimatedImpact}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Recommended Action
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-relaxed">
                    {scenario.magicMoment.recommendedAction}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMagicReviewOpen((v) => !v)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-850 transition-all cursor-pointer shrink-0"
                >
                  <span>{scenario.magicMoment.actionButtonText}</span>
                </button>
              </div>

              {magicReviewOpen && (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 space-y-2 animate-fade-up">
                  <p className="font-bold">Executive Action Plan Generated:</p>
                  <p className="leading-relaxed">
                    1. Supplier renegotiation brief formatted with 6-month historical volumes.
                    <br />
                    2. Wholesale Tier 1 pricing update scheduled for founder 1-click confirmation.
                    <br />
                    3. No month-end delay: ₹1,80,000 margin protected before next shipment batch.
                  </p>
                </div>
              )}
            </div>

            {/* Interactive "What Would You Do?" Decision Prompt */}
            <div className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-950">
                <AlertCircle className="w-4 h-4 text-emerald-600" />
                <span>Interactive Decision Check: {scenario.decisionQuestion.prompt}</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {scenario.decisionQuestion.options.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setUserChoice(opt.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      userChoice === opt.key
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                        : 'border-border bg-card text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {opt.key} — {opt.label}
                  </button>
                ))}
              </div>

              {userChoice && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium animate-fade-up">
                  <span className="font-bold">{scenario.decisionQuestion.feedback}</span>
                </div>
              )}
            </div>

            {/* Simulation Playback Controls Bar */}
            <div className="flex flex-wrap items-center justify-between border-t border-border pt-5 gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-950 text-xs font-bold text-white hover:bg-neutral-850 cursor-pointer shadow-xs"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Play Simulation
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-600 hover:text-neutral-950 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay Simulation
              </button>
            </div>
          </div>
        </div>

        {/* "Why This Matters" High-Contrast Statement */}
        <div className="mt-14 mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase font-bold text-muted-foreground">
              Traditional Accounting asks:
            </span>
            <p className="text-lg font-bold text-neutral-500 italic">
              &ldquo;What happened last month?&rdquo;
            </p>
          </div>

          <div className="hidden sm:block h-12 w-[1px] bg-border" />

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase font-bold text-emerald-800">
              Dhanvi asks:
            </span>
            <p className="text-xl sm:text-2xl font-extrabold text-neutral-950">
              &ldquo;What is happening — and what should we do?&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
