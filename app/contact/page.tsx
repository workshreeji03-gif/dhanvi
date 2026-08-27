import type { Metadata } from 'next'
import { Mail, Phone, User } from 'lucide-react'
import { PageShell } from '@/components/landing/page-shell'
import { PageHero } from '@/components/landing/page-hero'
import { ContactForm } from '@/components/landing/contact-form'
import { Reveal } from '@/components/landing/reveal'

export const metadata: Metadata = {
  title: 'Contact — Dhanvi',
  description:
    "Get in touch with Dhanvi. Have a question, want to explore Dhanvi, or interested in early access? We would love to hear from you.",
}

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        title="Let's talk."
        description="Have a question, want to explore Dhanvi, or interested in early access? We'd love to hear from you."
      />

      <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Shreeji Patel
                  </h2>
                  <p className="text-sm text-muted-foreground">Founder, Dhanvi</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:shreejiptl0307@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <Mail className="h-4 w-4 shrink-0 text-positive" />
                  shreejiptl0307@gmail.com
                </a>
                <a
                  href="tel:9998283811"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <Phone className="h-4 w-4 shrink-0 text-positive" />
                  9998283811
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
