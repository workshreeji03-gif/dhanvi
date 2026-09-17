import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { getAllExperiments } from '@/lib/experiments/data'
import { EarlyAccessButton } from '@/components/landing/ui-context'

export const metadata: Metadata = {
  title: 'Dhanvi Experiments — Research Log',
  description:
    'A growing record of prototypes, simulations and research conducted while building Dhanvi.',
}

export default function ExperimentsArchivePage() {
  const experiments = getAllExperiments()

  return (
    <PageShell>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          {/* Breadcrumb / Back Link */}
          <div className="mb-10">
            <Link
              href="/#experiments"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5F665F] hover:text-[#111411] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>

          {/* 1. Research Log Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-wide text-[#5F665F] mb-3 font-semibold">
              DHANVI EXPERIMENTS
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] text-[#111411] leading-[1.05]">
              Build.
              <br />
              Test.
              <br />
              Measure.
              <br />
              Learn.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#5F665F] leading-relaxed font-normal tracking-[-0.01em]">
              Dhanvi Experiments is a growing record of the simulations, prototypes and system tests conducted while building Dhanvi. We publish favorable and unfavorable results alike.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-[#8B928C]">
              This is a development research log — not a performance record.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-100 border border-[#E4E8E4] text-xs font-mono font-semibold text-[#111411]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>2 EXPERIMENTS PUBLISHED</span>
            </div>
          </div>

          {/* 2. Research Progression Story (001 -> 002) */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
                Research Progression
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#111411]">
                System evolution in public.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
                Each experiment evaluates a distinct technical question within the platform architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* 001 Card */}
              <div className="bg-white border border-[#E4E8E4] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8B928C] mb-3">
                    <span className="font-bold text-[#111411]">001</span>
                    <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">Completed</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#111411] tracking-tight mb-4">
                    MULTI-AGENT PAPER TRADING
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5F665F] font-mono mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span>5 specialized agents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span>459 opportunities evaluated</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span>33 selected trades</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span className="text-[#111411] font-bold">+1.89% single-session simulated result</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/experiments/001"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors"
                >
                  <span>Explore 001</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 002 Card */}
              <div className="bg-white border border-[#E4E8E4] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8B928C] mb-3">
                    <span className="font-bold text-[#111411]">002</span>
                    <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">Completed</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#111411] tracking-tight mb-4">
                    EMA MOMENTUM REVERSAL BACKTEST
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5F665F] font-mono mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C]" />
                      <span>1 defined strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C]" />
                      <span>72 daily bars</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C]" />
                      <span>2 simulated trades</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C]" />
                      <span className="text-[#111411] font-bold">-0.88% backtest result</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/experiments/002"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors"
                >
                  <span>Explore 002</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Subtle Story Footer */}
            <div className="mt-8 pt-6 border-t border-[#E4E8E4] text-center">
              <p className="text-xs sm:text-sm font-semibold text-[#111411] tracking-[-0.01em]">
                Different experiments. Different questions. One growing research record.
              </p>
            </div>
          </div>

          {/* 3. Experiments Archive Table */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white divide-y divide-[#E4E8E4] overflow-hidden mb-16 shadow-xs">
            {experiments.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#F7F9F7]/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono tabular-nums text-sm font-bold text-[#111411]">
                      {item.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tabular-nums font-semibold ${
                        item.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-neutral-100 text-[#8B928C]'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs font-mono text-[#8B928C]">
                      {item.type}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#111411] tracking-[-0.02em]">
                    {item.title === '—' ? 'Upcoming Research' : item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5F665F] max-w-2xl leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>

                <div className="shrink-0">
                  {item.status === 'Completed' ? (
                    <Link
                      href={`/experiments/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#111411] bg-white hover:bg-[#111411] text-[#111411] hover:text-white px-4 py-2 text-xs font-semibold transition-colors tracking-[-0.01em] shadow-xs"
                    >
                      <span>View experiment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-[#8B928C]">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Future Experiments */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 text-center shadow-xs">
            <h3 className="text-xl sm:text-2xl font-bold text-[#111411] tracking-[-0.025em]">
              The research continues.
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#5F665F] max-w-xl mx-auto leading-relaxed font-normal">
              Experiment 001 tested multi-agent coordination in a paper-trading session.
              <br />
              Experiment 002 tested a defined strategy inside Dhanvi&apos;s historical backtesting engine.
              <br />
              More experiments will be published here as Dhanvi develops.
            </p>
            <div className="mt-6">
              <EarlyAccessButton
                source="experiments_archive"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
              >
                <span>Join Early Access →</span>
              </EarlyAccessButton>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
