import type { Metadata } from 'next'
import { ArrowRight, BookOpen } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { PageHero } from '@/components/landing/page-hero'
import { Reveal } from '@/components/landing/reveal'
import { EarlyAccessButton } from '@/components/landing/ui-context'

export const metadata: Metadata = {
  title: 'Blog — Dhanvi',
  description:
    'Ideas for the future of business finance. The Dhanvi blog covers AI in accounting, financial automation, and practical insights for business owners.',
}

const TOPICS = [
  'AI in accounting',
  'Financial automation',
  'Indian SMB finance',
  'Business cash flow',
  'Accounting technology',
  'AI agents',
  'Fintech',
  'Business intelligence',
  'The future of ERP',
  'Practical financial insights for business owners',
]

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero title="Ideas for the future of business finance." />

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-sm sm:px-12">
          <div
            aria-hidden="true"
            className="grain pointer-events-none absolute inset-0 opacity-[0.15]"
          />
          <div className="relative">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-info/15 text-info">
              <BookOpen className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
              Coming Soon
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
              We&apos;re building something worth reading.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <p className="text-center text-sm text-muted-foreground">
            The Dhanvi blog will cover:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {TOPICS.map((topic) => (
              <li
                key={topic}
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <EarlyAccessButton className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md">
            Join Early Access
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </EarlyAccessButton>
        </Reveal>
      </section>
    </PageShell>
  )
}
