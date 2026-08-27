import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { PageHero } from '@/components/landing/page-hero'
import { SectionHeading } from '@/components/landing/section-heading'
import { Reveal } from '@/components/landing/reveal'
import { EarlyAccessButton } from '@/components/landing/ui-context'

export const metadata: Metadata = {
  title: 'About — Dhanvi',
  description:
    'Dhanvi is building an AI-powered financial operating system that helps businesses understand, monitor, and manage their finances continuously.',
}

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        title="Building the financial intelligence layer for modern businesses."
        description="Dhanvi is building an AI-powered financial operating system that helps businesses understand, monitor, and manage their finances continuously — not just at the end of the month."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="What Dhanvi is"
              title="Finance that works alongside your team."
              description="Dhanvi is designed to work alongside accountants and finance teams, handling repetitive financial workflows while helping business owners understand what is happening inside their business."
            />
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <SectionHeading
                align="left"
                eyebrow="The Problem"
                title="Understanding arrives too late."
                description="Business transactions happen every day, but financial understanding often arrives later through spreadsheets, accounting software, reconciliation, and periodic reports."
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <SectionHeading
                align="left"
                eyebrow="The Vision"
                title="Continuous, intelligent finance."
                description="Dhanvi's vision is to make business finance continuous, intelligent, accessible, and easier to manage."
              />
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              align="left"
              title="Built for the businesses that power the economy."
              description="Dhanvi is initially focused on small and growing businesses that may not have large finance teams but still need reliable financial visibility."
            />
          </Reveal>

          <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <EarlyAccessButton className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md">
              Join Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </EarlyAccessButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
