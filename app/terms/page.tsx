import type { Metadata } from 'next'
import { PageShell } from '@/components/landing/page-shell'
import { LegalPageLayout } from '@/components/landing/legal-page-layout'

export const metadata: Metadata = {
  title: 'Terms of Use — Dhanvi',
  description: 'Terms of Use for the Dhanvi website and early access program.',
}

export default function TermsPage() {
  return (
    <PageShell>
      <LegalPageLayout
        title="Terms of Use"
        subtitle="Last updated: August 2026"
        sections={[
          {
            title: '1. Acceptance',
            content: (
              <p>
                By accessing or using the Dhanvi website, joining our early access program, or
                otherwise interacting with Dhanvi, you agree to these Terms of Use. If you do not
                agree, please do not use the website or services.
              </p>
            ),
          },
          {
            title: '2. Early Access',
            content: (
              <p>
                Dhanvi may currently be under development. Features may change, be unavailable, or
                be discontinued at any time during early access. Early access is provided on an
                &quot;as available&quot; basis without guarantees of specific functionality or
                timelines.
              </p>
            ),
          },
          {
            title: '3. No Professional Advice',
            content: (
              <p>
                Information provided by Dhanvi, including AI-generated content, is intended to assist
                users and should not be treated as legal, tax, investment, or professional accounting
                advice. You remain responsible for important financial decisions and should consult
                qualified professionals when appropriate.
              </p>
            ),
          },
          {
            title: '4. Accuracy',
            content: (
              <p>
                Dhanvi aims to provide accurate financial information, but we do not guarantee that
                all outputs, calculations, or insights will be error-free. You should verify important
                records and outputs before relying on them for business decisions.
              </p>
            ),
          },
          {
            title: '5. User Responsibilities',
            content: (
              <>
                <p>When using Dhanvi, you agree to:</p>
                <ul>
                  <li>Provide accurate and truthful information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the service lawfully and in accordance with these terms</li>
                  <li>Not attempt to abuse, reverse engineer, or compromise the platform</li>
                </ul>
              </>
            ),
          },
          {
            title: '6. Intellectual Property',
            content: (
              <p>
                The Dhanvi platform, branding, software, content, and related materials are owned by
                Dhanvi or its licensors and are protected by applicable intellectual property laws.
                You may not copy, modify, or distribute our materials without permission.
              </p>
            ),
          },
          {
            title: '7. Third-Party Services',
            content: (
              <p>
                Dhanvi may integrate with or link to third-party services in the future. Those
                services are governed by their own terms and privacy policies. We are not responsible
                for third-party services or content.
              </p>
            ),
          },
          {
            title: '8. Availability',
            content: (
              <p>
                We do not guarantee uninterrupted or error-free availability of the website or
                service. Maintenance, updates, or circumstances beyond our control may affect access.
              </p>
            ),
          },
          {
            title: '9. Limitation of Liability',
            content: (
              <p>
                To the fullest extent permitted by applicable law, Dhanvi and its team shall not be
                liable for indirect, incidental, special, consequential, or punitive damages arising
                from your use of the website or service. Our total liability for any claim related to
                the service shall not exceed the amount you paid us, if any, in the twelve months
                preceding the claim.
              </p>
            ),
          },
          {
            title: '10. Changes to Terms',
            content: (
              <p>
                We may update these Terms of Use as the product evolves. Continued use of the website
                or service after changes are posted constitutes acceptance of the updated terms.
              </p>
            ),
          },
          {
            title: '11. Contact',
            content: (
              <p>
                For questions about these terms, contact us at{' '}
                <a href="mailto:shreejiptl0307@gmail.com">shreejiptl0307@gmail.com</a>.
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  )
}
