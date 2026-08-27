'use client'

import { ShieldCheck, Lock, Plug, UserCheck } from 'lucide-react'
import { Reveal } from './reveal'

const POINTS = [
  { icon: ShieldCheck, title: 'Bank-grade security', body: 'Encryption in transit and at rest.' },
  { icon: Lock, title: 'Your data, private', body: 'Never sold, never used to train public models.' },
  { icon: Plug, title: 'Works with your tools', body: 'Connects to the systems you already use.' },
  { icon: UserCheck, title: 'You stay in control', body: 'Actions require your approval, always.' },
]

export function Trust() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-foreground ring-1 ring-border">
                <p.icon className="h-5 w-5 text-positive" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
