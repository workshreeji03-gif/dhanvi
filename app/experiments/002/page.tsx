import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShieldAlert, ArrowDown } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { EXPERIMENT_002 } from '@/lib/experiments/data'
import { EarlyAccessButton } from '@/components/landing/ui-context'

export const metadata: Metadata = {
  title: 'Experiment 002: EMA Momentum Reversal Backtest — Dhanvi',
  description:
    'A Dhanvi historical backtest of the EMA Momentum Reversal Alpha strategy on RELIANCE.NS using next-bar-open execution.',
}

export default function Experiment002Page() {
  const exp = EXPERIMENT_002

  return (
    <PageShell>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          {/* Breadcrumb / Back Link */}
          <div className="mb-10 flex items-center gap-2 text-xs font-mono text-[#5F665F]">
            <Link
              href="/experiments"
              className="hover:text-[#111411] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dhanvi Experiments</span>
            </Link>
            <span className="text-[#D8DDD8]">/</span>
            <span className="text-[#111411] font-semibold">{exp.id}</span>
          </div>

          {/* 1. Detail Page Hero */}
          <div className="space-y-4 mb-14">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono tabular-nums font-semibold uppercase tracking-wider text-[#10B981] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
                {exp.formattedId}
              </span>
              <span className="text-xs font-mono text-[#5F665F] bg-[#F7F9F7] border border-[#E4E8E4] px-2.5 py-1 rounded font-medium">
                {exp.type}
              </span>
              <span className="text-xs font-mono text-[#111411] font-semibold bg-[#F7F9F7] border border-[#E4E8E4] px-2.5 py-1 rounded">
                Status: {exp.status}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-[#111411] leading-[1.05]">
              EMA Momentum
              <br />
              Reversal Backtest
            </h1>

            <p className="text-base sm:text-xl text-[#5F665F] leading-relaxed max-w-3xl font-normal tracking-[-0.01em]">
              {exp.subtitle}
            </p>

            {/* Metadata underneath */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-[#5F665F]">
              <span className="text-[#111411] font-semibold">Historical Backtest</span>
              <span className="text-[#D8DDD8]">•</span>
              <span className="text-[#111411] font-semibold">{exp.instrument}</span>
              <span className="text-[#D8DDD8]">•</span>
              <span>{exp.bars} daily bars</span>
              <span className="text-[#D8DDD8]">•</span>
              <span className="text-emerald-700 font-semibold">{exp.status}</span>
            </div>

            {/* Small Technical Metadata */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-[#5F665F] border-t border-[#E4E8E4]">
              <div>
                <span className="text-[#8B928C]">Backtest ID: </span>
                <span className="text-[#111411] font-semibold">{exp.backtestId}</span>
              </div>
              <div>
                <span className="text-[#8B928C]">Strategy: </span>
                <span className="text-[#111411] font-semibold">{exp.strategyId}</span>
              </div>
              <div>
                <span className="text-[#8B928C]">Timestamp: </span>
                <span className="text-[#111411] font-medium">{exp.timestamp}</span>
              </div>
            </div>
          </div>

          {/* 2. Start With The Question — NOT The Return */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-3 font-mono">
                Methodology & Scope
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411] mb-4">
                What we tested
              </h2>
              <p className="text-sm sm:text-base text-[#5F665F] leading-relaxed font-normal">
                Experiment 002 tested the EMA Momentum Reversal Alpha strategy using Dhanvi&apos;s backtesting engine on 72 daily RELIANCE.NS bars. Orders were modeled using next-bar-open execution and the simulation included commission and slippage.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-[#F7F9F7] border border-[#E4E8E4] text-xs font-mono text-[#5F665F]">
                <span className="font-semibold text-[#111411]">Objective: </span>
                Evaluate baseline execution modeling, cost drag, and trade behavior under controlled historical parameters without discretionary intervention.
              </div>
            </div>
          </div>

          {/* 3. Experiment Configuration (2-4 Col Editorial Grid) */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Parameters
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                Experiment configuration
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                Deterministic configuration parameters supplied to the Dhanvi simulation runtime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E4E8E4] border border-[#E4E8E4] rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Instrument</div>
                <div className="mt-2 text-base sm:text-lg font-bold font-mono text-[#111411]">{exp.instrument}</div>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Timeframe</div>
                <div className="mt-2 text-base sm:text-lg font-bold font-mono text-[#111411]">{exp.timeframe}</div>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Dataset</div>
                <div className="mt-2 text-base sm:text-lg font-bold font-mono text-[#111411]">{exp.bars} bars</div>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Strategy</div>
                <div className="mt-2 text-sm sm:text-base font-bold text-[#111411] leading-snug">{exp.strategyName}</div>
              </div>

              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Strategy ID</div>
                <div className="mt-2 text-sm sm:text-base font-bold font-mono text-[#111411]">{exp.strategyId}</div>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Execution</div>
                <div className="mt-2 text-base sm:text-lg font-bold font-mono text-[#111411]">Next bar open</div>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Initial Capital</div>
                <div className="mt-2 text-base sm:text-lg font-bold font-mono text-[#111411]">{exp.initialCapital}</div>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Status</div>
                <div className="mt-2 text-base sm:text-lg font-bold font-mono text-emerald-700">{exp.status}</div>
              </div>
            </div>
          </div>

          {/* 4. Backtest Pipeline (Minimal Flowchart) */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                System Topology
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                Backtest pipeline
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                End-to-end execution flow modeling historical inputs through to portfolio settlement.
              </p>
            </div>

            {/* Pipeline Stages */}
            <div className="max-w-xl mx-auto space-y-2 font-mono">
              {[
                { stage: '01', title: '72 DAILY BARS', desc: 'RELIANCE.NS historical OHLCV daily bars' },
                { stage: '02', title: 'EMA MOMENTUM REVERSAL ALPHA', desc: 'Algorithmic trend and momentum signal engine' },
                { stage: '03', title: 'SIGNAL GENERATION', desc: 'Deterministic order trigger calculation' },
                { stage: '04', title: 'NEXT-BAR-OPEN EXECUTION', desc: 'Order fill modeled strictly at subsequent bar open' },
                { stage: '05', title: 'COMMISSION + SLIPPAGE', desc: '₹78.75 commission + ₹39.37 simulated slippage applied' },
                { stage: '06', title: 'PORTFOLIO ACCOUNTING', desc: 'Mark-to-market position and cash settlement' },
                { stage: '07', title: 'FINAL EQUITY', desc: '₹99,116.66 settled portfolio value', highlight: true },
              ].map((step, idx, arr) => (
                <div key={step.title} className="flex flex-col items-center">
                  <div
                    className={`w-full p-4 rounded-xl border transition-all ${
                      step.highlight
                        ? 'bg-white border-[#111411] text-[#111411] shadow-xs'
                        : 'bg-white border-[#E4E8E4] text-[#111411]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold text-[#8B928C]">{step.stage}</span>
                        <span className="text-xs sm:text-sm font-bold tracking-tight text-[#111411]">
                          {step.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5F665F] font-normal sm:text-right">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="my-1.5 flex flex-col items-center">
                      <div className="w-px h-3 bg-[#D8DDD8]" />
                      <ArrowDown className="w-3.5 h-3.5 text-[#8B928C]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Results & Metrics Grid */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Simulation Output
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                Backtest result
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                Verifiable metrics recorded across the 72-bar simulation run.
              </p>
            </div>

            {/* Results Grid - Hairline dividers */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#E4E8E4] border border-[#E4E8E4] rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Initial Equity</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.initialCapital}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Final Equity</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.finalEquity}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Net P&L</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.netPnl}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Return</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.returnPct}
                </div>
                <div className="mt-1 text-[11px] text-[#8B928C]">Unleveraged backtest return</div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Maximum Drawdown</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.maximumDrawdown}
                </div>
                <div className="mt-1 text-xs font-mono text-[#8B928C]">{exp.maximumDrawdownAmount}</div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Trades</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.trades}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Win Rate</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.winRate}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Profit Factor</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.profitFactor}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Commission</div>
                <div className="mt-2 text-xl sm:text-2xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.commission}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Slippage</div>
                <div className="mt-2 text-xl sm:text-2xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.slippage}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-7 sm:col-span-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Modeled Costs Total</div>
                <div className="mt-2 text-xl sm:text-2xl font-semibold font-mono tabular-nums text-[#111827] tracking-tight">
                  {exp.totalExecutionCosts}
                </div>
                <div className="mt-1 text-[11px] text-[#8B928C]">Modeled: commission + slippage</div>
              </div>
            </div>

            {/* Prominent Disclosure Directly Below Result */}
            <div className="mt-8 bg-[#F7F9F7] border border-[#E4E8E4] rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#111411] font-mono mb-2.5">
                <ShieldAlert className="w-4 h-4 text-[#5F665F]" />
                <span>About this experiment</span>
              </div>
              <p className="text-xs text-[#5F665F] leading-relaxed font-normal">
                {exp.disclosure}
              </p>
            </div>
          </div>

          {/* 6. Equity Change Visual (Simple, Factual, No Fabricated Curves) */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Capital Progression
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                Simulated equity transition
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                Start-to-finish capital reconciliation across the backtested window.
              </p>
            </div>

            <div className="bg-[#F7F9F7] border border-[#E4E8E4] rounded-xl p-6 sm:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Initial */}
                <div className="text-center md:text-left">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C] mb-1">
                    Initial Equity
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#111411]">
                    {exp.initialCapital}
                  </div>
                </div>

                {/* Arrow Vector */}
                <div className="flex-1 max-w-xs flex flex-col items-center gap-1.5 px-4">
                  <div className="w-full flex items-center">
                    <div className="flex-1 border-t-2 border-dashed border-[#D8DDD8]" />
                    <ArrowRight className="w-5 h-5 text-[#8B928C] -ml-1 shrink-0" />
                  </div>
                  <div className="text-[11px] font-mono text-[#8B928C]">
                    72 daily bars simulated
                  </div>
                </div>

                {/* Final */}
                <div className="text-center md:text-right">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C] mb-1">
                    Final Equity
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#111411]">
                    {exp.finalEquity}
                  </div>
                </div>
              </div>

              {/* Net change caption */}
              <div className="mt-8 pt-6 border-t border-[#E4E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#8B928C]">Net change:</span>
                <span className="text-sm font-bold text-[#111411]">
                  {exp.netPnl} ({exp.returnPct})
                </span>
              </div>
            </div>
          </div>

          {/* 7. Trade Outcomes */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Order Statistics
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                Trade outcomes
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                Disaggregated breakdown of completed trade executions during the historical test.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E4E8E4] border border-[#E4E8E4] rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-white p-6">
                <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.trades}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-mono uppercase tracking-wide">Total trades</div>
              </div>

              <div className="bg-white p-6">
                <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.winningTrades}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-mono uppercase tracking-wide">Winning</div>
              </div>

              <div className="bg-white p-6">
                <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.losingTrades}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-mono uppercase tracking-wide">Losing</div>
              </div>

              <div className="bg-white p-6">
                <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.breakevenTrades}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-mono uppercase tracking-wide">Breakeven</div>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-[#F7F9F7] border border-[#E4E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
              <div className="text-xs text-[#5F665F]">
                <span className="font-semibold text-[#111411]">Win rate: </span>
                Both executed simulated positions resulted in a loss under test conditions.
              </div>
              <div className="text-lg font-bold text-[#111411] tabular-nums">
                {exp.winRate}
              </div>
            </div>
          </div>

          {/* 8. Execution Costs */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Friction & Overhead
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                Execution costs
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                Modeled transactional costs applied to order fills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E4E8E4] border border-[#E4E8E4] rounded-xl overflow-hidden shadow-2xs mb-4">
              <div className="bg-white p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Commission</div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.commission}
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Slippage</div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.slippage}
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B928C]">Modeled Costs Total</div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#111411]">
                  {exp.totalExecutionCosts}
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-[#8B928C]">
              Direct calculation: {exp.commission} commission + {exp.slippage} slippage = {exp.totalExecutionCosts} modeled execution costs. These represent simulated frictional modeling, not actual live broker receipts.
            </p>
          </div>

          {/* 9. Interpretation: What happened */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-3 font-mono">
                Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411] mb-4">
                What happened
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5F665F] leading-relaxed font-normal">
                <p>
                  The strategy completed two simulated trades during the tested dataset. Neither trade produced a winning outcome under the configured backtesting assumptions.
                </p>
                <p>
                  Starting from ₹100,000 of simulated capital, the backtest finished at ₹99,116.66, representing a net simulated return of -0.88%.
                </p>
                <p>
                  Maximum observed drawdown during the backtest was -0.91%.
                </p>
              </div>
            </div>
          </div>

          {/* 10. Editorial: Why publish a losing experiment? */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-3 font-mono">
                Research Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411] mb-4">
                Why publish a losing experiment?
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5F665F] leading-relaxed font-normal">
                <p>
                  Dhanvi Experiments is intended to document the research process, not only favorable outcomes.
                </p>
                <p>
                  Experiment 002 produced a negative simulated result. Publishing it preserves the complete experimental record and provides a baseline for future strategy iterations.
                </p>
                <p className="pt-2 text-base font-semibold text-[#111411]">
                  The next question is not whether this result can be hidden.
                </p>
                <p className="text-base text-[#111411]">
                  The useful question is: <span className="font-bold">What should the next experiment test?</span>
                </p>
              </div>
            </div>
          </div>

          {/* 11. What Experiment 002 does not establish */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Limitations & Scope
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                What Experiment 002 does not establish
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                This experiment does not establish:
              </p>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5F665F] font-normal mb-6">
              {exp.whatItDoesNotEstablish?.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-white border border-[#E4E8E4] text-xs text-[#5F665F] leading-relaxed font-normal">
              With only 72 daily bars and 2 simulated trades, the result should be treated as a limited experimental observation rather than evidence of long-term strategy performance.
            </div>
          </div>

          {/* 12. Follow Dhanvi / Early Access CTA */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-3 font-mono">
              The Research Continues
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
              Follow the research record.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
              Experiment 001 tested multi-agent coordination. Experiment 002 tested a single strategy inside our backtest engine. More experiments will be published as Dhanvi develops.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <EarlyAccessButton
                source="experiment_002_detail"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
              >
                <span>Join Early Access →</span>
              </EarlyAccessButton>

              <Link
                href="/experiments"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E4E8E4] bg-white hover:border-[#111411] text-[#111411] px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
              >
                <span>All Experiments</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
