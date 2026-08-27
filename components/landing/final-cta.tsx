'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Reveal } from './reveal'

export function FinalCta() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="join" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="grain pointer-events-none absolute inset-0 opacity-[0.15]"
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
            Early Access
          </span>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            Give your business a finance brain that never sleeps.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
            Join the early access list and be the first to put Dhanvi to work alongside your team
            and your accountant.
          </p>

          {submitted ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-positive/20 px-5 py-3.5 text-sm font-medium text-primary-foreground">
              <CheckCircle2 className="h-5 w-5 text-positive" />
              You&apos;re on the list. We&apos;ll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 flex-1 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition focus:border-primary-foreground/40 focus:ring-2 focus:ring-primary-foreground/10"
              />
              <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary transition-all hover:opacity-90"
              >
                Request Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-primary-foreground/50">
            No spam. We&apos;ll only reach out about early access.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
