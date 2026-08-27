'use client'

import { Cpu, Landmark, Clock3 } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const SHIFTS = [
  {
    icon: Cpu,
    title: 'AI can finally understand a business',
    body: 'Language models can now read messy, real-world financial activity and explain it in plain terms — something rigid accounting software never could.',
  },
  {
    icon: Landmark,
    title: 'Money moved digital',
    body: 'UPI, digital banking and e-invoicing mean nearly every transaction now leaves a clean signal Dhanvi can capture the instant it happens.',
  },
  {
    icon: Clock3,
    title: 'Month-end is no longer good enough',
    body: 'Markets and costs move daily. A report that arrives weeks late can’t drive the decisions modern businesses need to make now.',
  },
]

export function WhyNow() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Now"
          title="This wasn't possible five years ago. It is now."
          description="Three shifts came together to make a real-time, AI-native financial platform finally viable."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SHIFTS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 text-center sm:p-8">
            <p className="mx-auto max-w-2xl text-balance text-lg font-medium leading-relaxed text-foreground sm:text-xl">
              Dhanvi isn&apos;t accounting software with AI bolted on. It&apos;s a financial system
              designed, from the ground up, for a real-time and AI-native world.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
