'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowDown, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react'
import { EXPERIMENT_001, getAllExperiments } from '@/lib/experiments/data'
import { EarlyAccessButton } from './ui-context'

export function ExperimentsSection() {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState<number>(0)
  const experiments = getAllExperiments()
  const exp = EXPERIMENT_001

  return (
    <section id="experiments" className="py-24 sm:py-32 bg-white border-t border-[#E4E8E4] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* 1. Large Editorial Introduction */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs font-medium uppercase tracking-wide text-[#5F665F] mb-3">
            Research Log
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-[#111411] leading-[1.05]">
            We don&apos;t just describe the idea.
            <br />
            We test it.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5F665F] leading-relaxed font-normal tracking-[-0.01em]">
            Dhanvi Experiments documents prototypes, simulations and research conducted while building the
            system — including what was tested, how the system behaved, what happened and what we learned.
          </p>
          <p className="mt-3 text-xs sm:text-sm text-[#8B928C] font-normal">
            Experiment 001 is the first entry. More experiments will be published here as Dhanvi develops.
          </p>
        </div>

        {/* 2. Minimal Experiment Index */}
        <div className="mb-16 border-t border-b border-[#E4E8E4] py-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-3 font-mono">
            Experiment Archive Index
          </div>
          <div className="divide-y divide-[#E4E8E4]">
            {experiments.map((item) => (
              <div
                key={item.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono tabular-nums text-[#8B928C] font-medium">{item.id}</span>
                  <span className={item.status === 'Completed' ? 'font-semibold text-[#111411] tracking-[-0.01em]' : 'text-[#8B928C]'}>
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tabular-nums font-semibold ${
                      item.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-neutral-100 text-[#8B928C]'
                    }`}
                  >
                    {item.status}
                  </span>
                  {item.status === 'Completed' ? (
                    <Link
                      href={`/experiments/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors tracking-[-0.01em]"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs text-[#8B928C]">In development</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Experiment 001 — Case Study Header & Metrics */}
        <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Metadata & Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono tabular-nums font-semibold uppercase tracking-wider text-[#10B981] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
                  {exp.formattedId}
                </span>
                <span className="text-xs font-mono text-[#5F665F] bg-white border border-[#E4E8E4] px-2.5 py-1 rounded font-medium">
                  {exp.type}
                </span>
                <span className="text-xs font-mono text-[#111411] font-semibold bg-white border border-[#E4E8E4] px-2.5 py-1 rounded">
                  Status: {exp.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-[#111411] leading-tight">
                  {exp.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#5F665F] leading-relaxed font-normal">
                  {exp.subtitle}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/experiments/${exp.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#111411] bg-[#111411] hover:bg-neutral-800 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
                >
                  <span>Explore Experiment 001</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Factual Metrics with subtle hairline dividers */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-px bg-[#E4E8E4] border border-[#E4E8E4] rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-white p-6 sm:p-7">
                <div className="text-3xl sm:text-4xl font-bold text-[#111411] font-mono tabular-nums tracking-tight">
                  {exp.agentsCount}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-medium">Specialized agents</div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-3xl sm:text-4xl font-bold text-[#111411] font-mono tabular-nums tracking-tight">
                  {exp.opportunitiesEvaluated}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-medium">Opportunities evaluated</div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-3xl sm:text-4xl font-bold text-[#111411] font-mono tabular-nums tracking-tight">
                  {exp.tradesSelected}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-medium">Trades selected</div>
              </div>

              <div className="bg-white p-6 sm:p-7">
                <div className="text-3xl sm:text-4xl font-bold text-[#111411] font-mono tabular-nums tracking-tight">
                  {exp.startingCapital}
                </div>
                <div className="mt-1 text-xs text-[#5F665F] font-medium">Simulated starting capital</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. The Filtering Story: 459 -> 33 (~7.2% Selection Rate) */}
        <div className="mb-16 border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
              The Filtering Story
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-[#111411]">
              Evaluation over execution.
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
              The primary architectural challenge was validating that the system could reject low-conviction
              ideas rather than attempting to trade every candidate identified in the morning stream.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F7F9F7] border border-[#E4E8E4] rounded-xl p-6 sm:p-8">
            {/* Step 1: 459 Evaluated */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="text-4xl sm:text-5xl font-mono tabular-nums font-bold text-[#111411] tracking-tight">
                {exp.opportunitiesEvaluated}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-semibold text-[#111411] tracking-[-0.01em]">
                Trade candidates evaluated
              </div>
              <div className="mt-1 text-xs text-[#8B928C]">
                Unfiltered opportunity stream identified by market & news signals
              </div>
            </div>

            {/* Filter Pipeline Indicator */}
            <div className="md:col-span-4 flex flex-col items-center justify-center py-4 md:py-0">
              <div className="w-full max-w-xs flex flex-col items-center gap-2">
                <div className="w-full bg-[#E4E8E4] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full w-[7.2%] rounded-full" />
                </div>
                <div className="text-xs font-mono tabular-nums font-bold text-[#10B981]">
                  {exp.selectionRate} Selection rate
                </div>
                <div className="text-[11px] text-[#8B928C] text-center font-medium">
                  ~7.2% progressed to selected trades
                </div>
              </div>
            </div>

            {/* Step 2: 33 Selected */}
            <div className="md:col-span-4 text-center md:text-right">
              <div className="text-4xl sm:text-5xl font-mono tabular-nums font-bold text-[#111411] tracking-tight">
                {exp.tradesSelected}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-semibold text-[#111411] tracking-[-0.01em]">
                Trades selected
              </div>
              <div className="mt-1 text-xs text-[#8B928C]">
                Passed multi-agent fundamental & technical validation
              </div>
            </div>
          </div>
        </div>

        {/* 5. Agent Workflow: Horizontal Desktop / Vertical Mobile */}
        <div className="mb-16 border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
              Agent Workflow
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-[#111411]">
              How intelligence moved through the system.
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
              Five specialized agents operated in sequence during the experimental session. Click or hover
              any agent to inspect its specific task.
            </p>
          </div>

          {/* Workflow Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {exp.agents?.map((agent, idx) => {
              const isSelected = selectedAgentIndex === idx
              return (
                <button
                  key={agent.name}
                  type="button"
                  onClick={() => setSelectedAgentIndex(idx)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#111411] bg-[#F7F9F7] shadow-xs'
                      : 'border-[#E4E8E4] bg-white hover:border-[#111411]/30 hover:bg-[#F7F9F7]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#8B928C] mb-2 font-medium">
                    <span>0{idx + 1}</span>
                    {idx < 4 && (
                      <ArrowRight className="hidden md:block w-3 h-3 text-[#D8DDD8]" />
                    )}
                    {idx < 4 && (
                      <ArrowDown className="md:hidden w-3 h-3 text-[#D8DDD8]" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#111411] leading-snug tracking-[-0.01em]">
                    {agent.name}
                  </div>
                  <div className="text-[11px] text-[#5F665F] mt-1 font-normal">
                    {agent.role}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Agent Role Description */}
          {exp.agents && exp.agents[selectedAgentIndex] && (
            <div className="mt-6 p-5 rounded-xl bg-[#F7F9F7] border border-[#E4E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#111411] mr-2">
                  {exp.agents[selectedAgentIndex].name}:
                </span>
                <span className="text-xs sm:text-sm text-[#5F665F] font-normal">
                  {exp.agents[selectedAgentIndex].description}
                </span>
              </div>
              <span className="text-[11px] font-mono tabular-nums text-[#8B928C] shrink-0 font-medium">
                Stage {selectedAgentIndex + 1} of 5
              </span>
            </div>
          )}
        </div>

        {/* 6. Session Timeline */}
        <div className="mb-16 border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
              Session Timeline
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-[#111411]">
              From pre-market ingestion to session close.
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
              The continuous multi-agent cycle operated across the complete market hours between {exp.startTime} and {exp.endTime}.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-[#E4E8E4] space-y-6">
            {exp.timeline?.map((step) => (
              <div key={step.time} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#111411]" />
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-mono tabular-nums text-xs font-bold text-[#111411] shrink-0">
                    {step.time}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#111411] tracking-[-0.01em]">
                    {step.title}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#5F665F] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Session Result & Prominent Disclosure */}
        <div className="mb-16 border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Result */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] font-mono">
                Session Result
              </div>
              <div className="text-5xl sm:text-6xl font-bold text-[#10B981] font-mono tabular-nums tracking-tight">
                {exp.sessionResult}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#111411] tracking-[-0.01em]">
                {exp.resultNote}
              </div>
              <div className="text-xs text-[#5F665F] pt-1 font-normal">
                {exp.startingCapital} simulated starting capital
              </div>
            </div>

            {/* Right: Prominent Disclosure */}
            <div className="lg:col-span-7 bg-[#F7F9F7] border border-[#E4E8E4] rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#111411] font-mono mb-2.5">
                <ShieldAlert className="w-4 h-4 text-[#5F665F]" />
                <span>About this result</span>
              </div>
              <p className="text-xs text-[#5F665F] leading-relaxed font-normal">
                {exp.disclosure}
              </p>
            </div>
          </div>
        </div>

        {/* 8. What We Tested & What This Does Not Establish */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* What we tested */}
          <div className="lg:col-span-6 border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-10 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
              Methodology
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-[#111411] mb-6">
              What we were testing
            </h4>

            <div className="space-y-5">
              {exp.whatWeTested?.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#111411] tracking-[-0.01em]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#5F665F] mt-0.5 leading-relaxed font-normal">
                      {item.question}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What this does not establish */}
          <div className="lg:col-span-6 border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-10 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-2 font-mono">
              Credibility & Bounds
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-[#111411] mb-6">
              What Experiment 001 does not establish
            </h4>

            <p className="text-xs text-[#5F665F] mb-4 leading-relaxed font-normal">
              A single paper-trading session does not establish:
            </p>

            <ul className="space-y-2.5 text-xs text-[#5F665F] font-normal">
              {exp.whatItDoesNotEstablish?.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B928C]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 9. Experiment Summary Chain */}
        <div className="mb-16 border border-[#E4E8E4] rounded-2xl bg-white p-8 sm:p-10 text-center shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-6 font-mono">
            Experiment Summary Chain
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-mono text-[#111411]">
            <span className="bg-[#F7F9F7] border border-[#E4E8E4] px-3 py-1.5 rounded-md font-medium">
              5 specialized agents
            </span>
            <span className="text-[#D8DDD8]">→</span>
            <span className="bg-[#F7F9F7] border border-[#E4E8E4] px-3 py-1.5 rounded-md font-medium">
              459 opportunities evaluated
            </span>
            <span className="text-[#D8DDD8]">→</span>
            <span className="bg-[#F7F9F7] border border-[#E4E8E4] px-3 py-1.5 rounded-md font-medium">
              33 trades selected
            </span>
            <span className="text-[#D8DDD8]">→</span>
            <span className="bg-[#F7F9F7] border border-[#E4E8E4] px-3 py-1.5 rounded-md font-medium">
              ₹10,000 simulated capital
            </span>
            <span className="text-[#D8DDD8]">→</span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-md font-bold">
              +1.89% paper result
            </span>
          </div>

          <div className="mt-4 text-[11px] font-mono text-[#8B928C]">
            Single-session simulated result · Paper-trading prototype
          </div>
        </div>

        {/* 10. Future Experiments & Early Access Conversion */}
        <div className="border border-[#E4E8E4] rounded-2xl bg-[#F7F9F7] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#5F665F] mb-3 font-mono">
            Ongoing Research
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#111411]">
            More experiments are coming.
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-[#5F665F] leading-relaxed font-normal">
            As Dhanvi evolves, new experiments will be published here — including system architecture tests,
            strategy research, paper-trading studies, risk experiments and other development milestones.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <EarlyAccessButton
              source="experiments_section"
              className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
            >
              <span>Join Early Access →</span>
            </EarlyAccessButton>

            <Link
              href="/experiments"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E4E8E4] bg-white hover:border-[#111411] text-[#111411] px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs tracking-[-0.01em]"
            >
              <span>View Research Archive</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
