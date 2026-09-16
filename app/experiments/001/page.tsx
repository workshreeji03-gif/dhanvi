import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { EXPERIMENT_001 } from '@/lib/experiments/data'
import { EarlyAccessButton } from '@/components/landing/ui-context'

export const metadata: Metadata = {
  title: 'Experiment 001: Multi-Agent Paper Trading — Dhanvi',
  description:
    'An early Dhanvi paper-trading experiment testing coordination between five specialized AI agents across research, market analysis, company analysis and simulated trading.',
}

export default function Experiment001Page() {
  const exp = EXPERIMENT_001

  return (
    <PageShell>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          {/* Breadcrumb / Back Link */}
          <div className="mb-10 flex items-center gap-2 text-xs font-mono text-[#606660]">
            <Link
              href="/experiments"
              className="hover:text-[#101310] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dhanvi Experiments</span>
            </Link>
            <span className="text-[#C5C8C5]">/</span>
            <span className="text-[#101310] font-medium">{exp.id}</span>
          </div>

          {/* Header & Badges */}
          <div className="space-y-4 mb-14">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#10B981] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
                {exp.formattedId}
              </span>
              <span className="text-xs font-mono text-[#606660] bg-[#F7F8F6] border border-[#E5E8E5] px-2.5 py-1 rounded">
                {exp.type}
              </span>
              <span className="text-xs font-mono text-[#101310] font-medium bg-[#F7F8F6] border border-[#E5E8E5] px-2.5 py-1 rounded">
                Status: {exp.status}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#101310] leading-[1.12]">
              {exp.title}
            </h1>

            <p className="text-base sm:text-xl text-[#606660] leading-relaxed max-w-3xl">
              {exp.subtitle}
            </p>
          </div>

          {/* Factual Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E5E8E5] border border-[#E5E8E5] rounded-2xl overflow-hidden mb-16 shadow-2xs">
            <div className="bg-white p-6 sm:p-8">
              <div className="text-3xl sm:text-4xl font-mono text-[#101310]">
                {exp.agentsCount}
              </div>
              <div className="mt-1 text-xs text-[#606660]">Specialized agents</div>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <div className="text-3xl sm:text-4xl font-mono text-[#101310]">
                {exp.opportunitiesEvaluated}
              </div>
              <div className="mt-1 text-xs text-[#606660]">Opportunities evaluated</div>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <div className="text-3xl sm:text-4xl font-mono text-[#101310]">
                {exp.tradesSelected}
              </div>
              <div className="mt-1 text-xs text-[#606660]">Trades selected</div>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <div className="text-3xl sm:text-4xl font-mono text-[#101310]">
                {exp.startingCapital}
              </div>
              <div className="mt-1 text-xs text-[#606660]">Simulated starting capital</div>
            </div>
          </div>

          {/* Section: The Filtering Story */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-2xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-2 font-mono">
                The Filtering Story
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#101310]">
                Evaluation over execution.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#606660] leading-relaxed">
                Rather than executing on every signal emitted during the market session, the specialized agents
                rigorously evaluated 459 total opportunities and selected only 33 trade candidates that satisfied
                cross-modal parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F7F8F6] border border-[#E5E8E5] rounded-xl p-6 sm:p-8">
              <div className="md:col-span-4 text-center md:text-left">
                <div className="text-4xl sm:text-5xl font-mono font-medium text-[#101310]">
                  {exp.opportunitiesEvaluated}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-[#101310]">
                  Trade candidates evaluated
                </div>
                <div className="mt-1 text-xs text-[#8A908A]">
                  Initial opportunity stream
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center py-4 md:py-0">
                <div className="w-full max-w-xs flex flex-col items-center gap-2">
                  <div className="w-full bg-[#E5E8E5] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full w-[7.2%] rounded-full" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#10B981]">
                    {exp.selectionRate} Selection rate
                  </div>
                  <div className="text-[11px] text-[#8A908A] text-center">
                    ~7.2% progressed to selected trades
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 text-center md:text-right">
                <div className="text-4xl sm:text-5xl font-mono font-medium text-[#101310]">
                  {exp.tradesSelected}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-[#101310]">
                  Trades selected
                </div>
                <div className="mt-1 text-xs text-[#8A908A]">
                  Final simulated paper execution
                </div>
              </div>
            </div>
          </div>

          {/* Section: Agent Workflow */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-[#F7F8F6] p-8 sm:p-12 mb-16 shadow-2xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-2 font-mono">
                Agent Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#101310]">
                Five agents in coordination.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#606660] leading-relaxed">
                Each agent had a dedicated focus area during the session to avoid cognitive overload and ensure
                continuous validation.
              </p>
            </div>

            <div className="space-y-4">
              {exp.agents?.map((agent, i) => (
                <div
                  key={agent.name}
                  className="bg-white border border-[#E5E8E5] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold text-[#8A908A]">
                        0{i + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-[#101310]">
                        {agent.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#606660] bg-[#F7F8F6] border border-[#E5E8E5] px-2 py-0.5 rounded">
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#606660] leading-relaxed pt-1">
                      {agent.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Session Timeline */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-2xs">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-2 font-mono">
                Execution Log
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#101310]">
                Session timeline.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#606660] leading-relaxed">
                The experiment ran across the full market session from {exp.startTime} to {exp.endTime}.
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-[#E5E8E5] space-y-6">
              {exp.timeline?.map((step) => (
                <div key={step.time} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#101310]" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="font-mono text-xs font-semibold text-[#101310] shrink-0">
                      {step.time}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#101310]">
                      {step.title}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#606660] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Result & Prominent Disclosure */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-white p-8 sm:p-12 mb-16 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] font-mono">
                  Session Result
                </div>
                <div className="text-5xl sm:text-6xl font-normal text-[#10B981] font-mono tracking-tight">
                  {exp.sessionResult}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#101310]">
                  {exp.resultNote}
                </div>
                <div className="text-xs text-[#606660] pt-1">
                  {exp.startingCapital} simulated starting capital
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAFAF9] border border-[#E5E8E5] rounded-xl p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#101310] font-mono mb-2.5">
                  <ShieldAlert className="w-4 h-4 text-[#606660]" />
                  <span>About this result</span>
                </div>
                <p className="text-xs text-[#606660] leading-relaxed">
                  {exp.disclosure}
                </p>
              </div>
            </div>
          </div>

          {/* Section: What We Tested & What It Does Not Establish */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-6 border border-[#E5E8E5] rounded-2xl bg-white p-8 sm:p-10 shadow-2xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-2 font-mono">
                Experimental Hypotheses
              </div>
              <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#101310] mb-6">
                What we were testing
              </h2>

              <div className="space-y-5">
                {exp.whatWeTested?.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#101310]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[#606660] mt-0.5 leading-relaxed">
                        {item.question}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 border border-[#E5E8E5] rounded-2xl bg-[#F7F8F6] p-8 sm:p-10 shadow-2xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-2 font-mono">
                Limitations & Scope
              </div>
              <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#101310] mb-6">
                What Experiment 001 does not establish
              </h2>

              <p className="text-xs text-[#606660] mb-4 leading-relaxed">
                A single paper-trading session does not establish:
              </p>

              <ul className="space-y-2.5 text-xs text-[#606660]">
                {exp.whatItDoesNotEstablish?.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#8A908A]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Experiment Summary Chain */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-white p-8 sm:p-10 text-center mb-16 shadow-2xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-6 font-mono">
              Experiment Summary Chain
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-mono text-[#101310]">
              <span className="bg-[#F7F8F6] border border-[#E5E8E5] px-3 py-1.5 rounded-md">
                5 specialized agents
              </span>
              <span className="text-[#C5C8C5]">→</span>
              <span className="bg-[#F7F8F6] border border-[#E5E8E5] px-3 py-1.5 rounded-md">
                459 opportunities evaluated
              </span>
              <span className="text-[#C5C8C5]">→</span>
              <span className="bg-[#F7F8F6] border border-[#E5E8E5] px-3 py-1.5 rounded-md">
                33 trades selected
              </span>
              <span className="text-[#C5C8C5]">→</span>
              <span className="bg-[#F7F8F6] border border-[#E5E8E5] px-3 py-1.5 rounded-md">
                ₹10,000 simulated capital
              </span>
              <span className="text-[#C5C8C5]">→</span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-md font-semibold">
                +1.89% paper result
              </span>
            </div>

            <div className="mt-4 text-[11px] font-mono text-[#8A908A]">
              Single-session simulated result · Paper-trading prototype
            </div>
          </div>

          {/* Follow the Experiments / CTA */}
          <div className="border border-[#E5E8E5] rounded-2xl bg-[#FAFAF9] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#606660] mb-3 font-mono">
              Follow Dhanvi
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#101310]">
              Follow the experiments.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#606660] leading-relaxed">
              As Dhanvi develops, we&apos;ll continue documenting what we test, what works, what doesn&apos;t and
              what we learn. Join our early-access community to follow technical research updates.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <EarlyAccessButton
                source="experiment_001_detail"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs"
              >
                <span>Join Early Access →</span>
              </EarlyAccessButton>

              <Link
                href="/experiments"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E5E8E5] bg-white hover:border-[#101310] text-[#101310] px-5 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs"
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
