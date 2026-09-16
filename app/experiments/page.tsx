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

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-medium uppercase tracking-wide text-[#5F665F] mb-3">
              Research Log Archive
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-[#111411] leading-[1.08]">
              Dhanvi Experiments
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#5F665F] leading-relaxed font-normal tracking-[-0.01em]">
              A growing record of prototypes, simulations and research conducted while building Dhanvi.
            </p>
          </div>

          {/* Experiments List */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-white divide-y divide-[#E4E8E4] overflow-hidden mb-16 shadow-xs">
            {experiments.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#F7F9F7]/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono tabular-nums text-sm font-bold text-[#111411]">
                      {exp.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tabular-nums font-semibold ${
                        exp.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-neutral-100 text-[#8B928C]'
                      }`}
                    >
                      {exp.status}
                    </span>
                    <span className="text-xs font-mono text-[#8B928C]">
                      {exp.type}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#111411] tracking-[-0.02em]">
                    {exp.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5F665F] max-w-2xl leading-relaxed font-normal">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="shrink-0">
                  {exp.status === 'Completed' ? (
                    <Link
                      href={`/experiments/${exp.id}`}
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

          {/* Subtext Note */}
          <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-10 text-center shadow-xs">
            <h3 className="text-lg font-bold text-[#111411] tracking-[-0.02em]">
              More experiments will be published as Dhanvi develops.
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#5F665F] max-w-xl mx-auto leading-relaxed font-normal">
              We publish empirical research on multi-agent collaboration, deterministic risk governance,
              and institutional memory as new phases complete.
            </p>
            <div className="mt-6">
              <EarlyAccessButton
                source="experiments_archive"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
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
