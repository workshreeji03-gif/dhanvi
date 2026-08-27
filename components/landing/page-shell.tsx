import { Navbar } from './navbar'
import { Footer } from './footer'
import { PageBackground } from './page-background'
import { LandingProviders } from './ui-context'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <LandingProviders>
      <div className="relative min-h-dvh bg-background">
        <PageBackground />
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </LandingProviders>
  )
}
