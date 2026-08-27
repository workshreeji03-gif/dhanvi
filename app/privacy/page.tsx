import type { Metadata } from 'next'
import { PageShell } from '@/components/landing/page-shell'
import { LegalPageLayout } from '@/components/landing/legal-page-layout'

export const metadata: Metadata = {
  title: 'Privacy Policy — Dhanvi',
  description: 'Privacy Policy for Dhanvi — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalPageLayout
        title="Privacy Policy"
        subtitle="Last updated: August 2026"
        sections={[
          {
            title: '1. Information We Collect',
            content: (
              <>
                <p>
                  We may collect information that you provide directly to us or that is generated
                  through your use of the Dhanvi website and early access program. This may include:
                </p>
                <ul>
                  <li>Contact information (such as name, email address, and phone number)</li>
                  <li>Account information if you create an account</li>
                  <li>Business information (such as company name, business type, and size)</li>
                  <li>Information submitted through forms on our website</li>
                  <li>Product usage information when you interact with Dhanvi</li>
                  <li>Information voluntarily provided during early access sign-up or communications</li>
                </ul>
                <p>
                  The current early-access website does not automatically access your bank or
                  financial accounts. Any financial data would only be collected if and when you
                  explicitly choose to connect or provide it through officially supported product
                  interfaces in the future.
                </p>
              </>
            ),
          },
          {
            title: '2. How We Use Information',
            content: (
              <>
                <p>We may use the information we collect to:</p>
                <ul>
                  <li>Provide, operate, and improve the Dhanvi service</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Manage early access and waitlist programs</li>
                  <li>Communicate product updates and relevant information</li>
                  <li>Understand how our product and website are used</li>
                  <li>Improve reliability, security, and user experience</li>
                </ul>
              </>
            ),
          },
          {
            title: '3. Financial Information',
            content: (
              <p>
                Dhanvi is intended to process business financial information when users choose to
                connect or provide it through the product. You should only provide financial
                information through officially supported Dhanvi interfaces. We do not claim any
                specific encryption standards or security certifications unless explicitly stated
                elsewhere on our website.
              </p>
            ),
          },
          {
            title: '4. Data Sharing',
            content: (
              <p>
                We do not sell your personal information. We may share information with service
                providers who assist us in operating the website and service, but only when necessary
                and subject to appropriate contractual and security controls. We may also disclose
                information if required by law or to protect our rights and users.
              </p>
            ),
          },
          {
            title: '5. Data Retention',
            content: (
              <p>
                We retain information only for as long as reasonably necessary to fulfill the purposes
                described in this policy, comply with legal obligations, resolve disputes, and support
                legitimate business needs.
              </p>
            ),
          },
          {
            title: '6. User Rights',
            content: (
              <p>
                Depending on applicable law, you may have the right to request access to, correction
                of, or deletion of your personal information. To exercise these rights, please contact
                us using the information below. We will respond to requests in accordance with
                applicable law.
              </p>
            ),
          },
          {
            title: '7. Cookies',
            content: (
              <p>
                Our website may use cookies and similar technologies that are necessary for the site
                to function, as well as analytics technologies where implemented. You can control
                cookies through your browser settings. We do not claim use of specific analytics
                providers unless they are actually installed and disclosed.
              </p>
            ),
          },
          {
            title: '8. Security',
            content: (
              <p>
                We intend to use reasonable technical and organizational safeguards to protect
                information. However, no method of transmission over the internet or electronic storage
                is completely secure, and we cannot guarantee absolute security.
              </p>
            ),
          },
          {
            title: "9. Children's Privacy",
            content: (
              <p>
                Dhanvi is a business product and is not intended for use by children. We do not
                knowingly collect personal information from children.
              </p>
            ),
          },
          {
            title: '10. Changes',
            content: (
              <p>
                We may update this Privacy Policy from time to time as Dhanvi evolves. We will post
                the updated policy on this page with a revised &quot;Last updated&quot; date.
              </p>
            ),
          },
          {
            title: '11. Contact',
            content: (
              <p>
                For privacy-related questions, contact us at{' '}
                <a href="mailto:shreejiptl0307@gmail.com">shreejiptl0307@gmail.com</a>.
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  )
}
