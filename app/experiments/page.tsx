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
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#606660] hover:text-[#101310] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-3 font-mono">
              Research Log Archive
            </div>
            <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-[#101310] leading-tight">
              Dhanvi Experiments
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#606660] leading-relaxed">
              A growing record of prototypes, simulations and research conducted while building Dhanvi.
            </p>
          </div>

          {/* Experiments List */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-white divide-y divide-[#E5E8E5] overflow-hidden mb-16 shadow-2xs">
            {experiments.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#FAFAF9]/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-[#101310]">
                      {exp.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono ${
                        exp.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-neutral-100 text-[#8A908A]'
                      }`}
                    >
                      {exp.status}
                    </span>
                    <span className="text-xs font-mono text-[#8A908A]">
                      {exp.type}
                    </span>
                  </div>

                  <h2 className="text-xl font-medium text-[#101310]">
                    {exp.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#606660] max-w-2xl leading-relaxed">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="shrink-0">
                  {exp.status === 'Completed' ? (
                    <Link
                      href={`/experiments/${exp.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#101310] bg-white hover:bg-[#101310] text-[#101310] hover:text-white px-4 py-2 text-xs font-medium transition-colors"
                    >
                      <span>View experiment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-[#8A908A]">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Subtext Note */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-[#F7F8F6] p-8 sm:p-10 text-center">
            <h3 className="text-lg font-medium text-[#101310]">
              More experiments will be published as Dhanvi develops.
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#606660] max-w-xl mx-auto leading-relaxed">
              We publish empirical research on multi-agent collaboration, deterministic risk governance,
              and institutional memory as new phases complete.
            </p>
            <div className="mt-6">
              <EarlyAccessButton
                source="experiments_archive"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 text-xs font-medium transition-colors cursor-pointer shadow-xs"
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
