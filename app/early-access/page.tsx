import type { Metadata } from 'next'
import { PageShell } from '@/components/landing/page-shell'
import { PageHero } from '@/components/landing/page-hero'
import { EarlyAccessForm } from '@/components/landing/early-access-form'
import { Reveal } from '@/components/landing/reveal'

export const metadata: Metadata = {
  title: 'Early Access — Dhanvi',
  description:
    'Request early access to Dhanvi — the AI-powered financial operating system for modern businesses.',
}

export default function EarlyAccessPage() {
  return (
    <PageShell>
      <PageHero
        title="Join Dhanvi Early Access"
        description="Be among the first to experience continuous, intelligent business finance. Tell us about your business and we'll be in touch."
      />

      <section className="mx-auto max-w-xl px-5 pb-24 sm:px-8">
        <Reveal>
          <EarlyAccessForm />
        </Reveal>
      </section>
    </PageShell>
  )
}
