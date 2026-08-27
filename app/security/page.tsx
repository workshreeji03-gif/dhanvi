import type { Metadata } from 'next'
import { Lock, Shield, Eye, UserCheck } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { PageHero } from '@/components/landing/page-hero'
import { Reveal } from '@/components/landing/reveal'
import { SectionHeading } from '@/components/landing/section-heading'

export const metadata: Metadata = {
  title: 'Security — Dhanvi',
  description:
    'Security is fundamental to financial software. Learn how Dhanvi is being designed with security, privacy, and controlled automation at its core.',
}

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Data Protection',
    description:
      'Protect sensitive business information through appropriate technical and organizational safeguards.',
  },
  {
    icon: Lock,
    title: 'Access Control',
    description:
      'Design access around authentication, authorization, and least-privilege principles.',
  },
  {
    icon: Eye,
    title: 'Auditability',
    description: 'Financial actions and automated workflows should be traceable.',
  },
  {
    icon: UserCheck,
    title: 'Human Control',
    description:
      'High-impact financial actions should be permission-based rather than blindly executed by AI.',
  },
]

export default function SecurityPage() {
  return (
    <PageShell>
      <PageHero
        title="Security is fundamental to financial software."
        description="Dhanvi is being designed with security, privacy, transparency, and controlled automation at its core."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 40}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-positive/10 text-positive">
                  <principle.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl space-y-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="AI Safety"
              title="AI should assist, not blindly act."
              description={
                <>
                  <span className="block">
                    Dhanvi is designed so that AI can identify patterns, explain financial
                    information, prepare work, and recommend actions.
                  </span>
                  <span className="mt-3 block">
                    For sensitive financial actions, the system should use appropriate approval and
                    authorization controls.
                  </span>
                </>
              }
            />
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
              <SectionHeading
                align="left"
                eyebrow="Responsible Development"
                title="Security practices that evolve with the product."
                description="Security practices will evolve as Dhanvi moves from early access toward production. We are committed to building financial software that earns trust through thoughtful design, transparency, and continuous improvement."
              />
              <p className="mt-6 text-sm text-muted-foreground">
                Security contact:{' '}
                <a
                  href="mailto:shreejiptl0307@gmail.com"
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-positive"
                >
                  shreejiptl0307@gmail.com
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
