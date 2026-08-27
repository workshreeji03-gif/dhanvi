import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { PageHero } from '@/components/landing/page-hero'
import { Reveal } from '@/components/landing/reveal'

export const metadata: Metadata = {
  title: 'Careers — Dhanvi',
  description:
    'Join Dhanvi and help build the future of business finance. Open roles will appear here as we grow the team.',
}

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        title="Build the future of business finance."
        description="We're building Dhanvi to make financial operations dramatically simpler for businesses. If you're excited about AI, fintech, accounting, and ambitious products, we'd love to hear from you."
      />

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <Reveal className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm sm:px-12">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Briefcase className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">Coming Soon</h2>
          <p className="mt-3 max-w-md text-pretty text-muted-foreground">
            Open roles will appear here as we grow the team.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center rounded-2xl border border-border bg-muted/30 px-6 py-10 text-center">
          <h3 className="text-lg font-semibold text-foreground">Interested in Dhanvi?</h3>
          <Link
            href="/contact"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>
    </PageShell>
  )
}
