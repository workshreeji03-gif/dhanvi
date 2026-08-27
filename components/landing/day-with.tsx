'use client'

import { useEffect, useRef, useState } from 'react'
import { Sunrise, Coffee, Sun, Sunset, Moon } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const MOMENTS = [
  {
    time: '8:30 AM',
    icon: Sunrise,
    title: 'Morning coffee',
    body: 'One glance: yesterday closed at ₹1.24L revenue, cash is healthy, nothing on fire. No spreadsheet needed.',
  },
  {
    time: '11:00 AM',
    icon: Coffee,
    title: 'A big order lands',
    body: 'A ₹2.1L order comes in. Receivables, revenue and projected cash update instantly — you approve credit with confidence.',
  },
  {
    time: '2:15 PM',
    icon: Sun,
    title: 'A quiet flag',
    body: 'Dhanvi notices packaging costs creeping 31% above normal and nudges you — long before month-end would have.',
  },
  {
    time: '5:40 PM',
    icon: Sunset,
    title: 'A quick question',
    body: '“Can we afford ₹10L of inventory?” You ask in plain words and get a clear, numbers-backed answer in seconds.',
  },
  {
    time: '9:00 PM',
    icon: Moon,
    title: 'Winding down',
    body: 'Books are already current and accurate. Nothing to reconcile tonight. You close the laptop knowing exactly where you stand.',
  },
]

export function DayWith() {
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLOListElement | null>(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll('[data-moment]')
    if (!items) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.moment)
            setVisible((v) => Math.max(v, idx + 1))
          }
        })
      },
      { threshold: 0.6 },
    )
    items.forEach((i) => obs.observe(i))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="A Day With Dhanvi"
          title="What running a business feels like when the books keep themselves."
          description="No end-of-day data entry. No month-end dread. Just clarity, all day."
        />

        <ol ref={ref} className="relative mt-12 space-y-8 pl-8">
          {/* spine */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border"
          />
          {MOMENTS.map((m, i) => {
            const Icon = m.icon
            const on = i < visible
            return (
              <li key={m.time} data-moment={i} className="relative">
                <span
                  className={`absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                    on ? 'border-positive bg-positive' : 'border-border bg-card'
                  }`}
                />
                <div
                  className={`transition-all duration-500 ${
                    on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-positive" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {m.time}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-1 text-pretty leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
