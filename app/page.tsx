import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Problem } from '@/components/landing/problem'
import { WatchWork } from '@/components/landing/watch-work'
import { InteractiveDashboard } from '@/components/landing/interactive-dashboard'
import { BeforeAfter } from '@/components/landing/before-after'
import { NewWay } from '@/components/landing/new-way'
import { HowItWorks } from '@/components/landing/how-it-works'
import { AskDhantra } from '@/components/landing/ask-dhantra'
import { AiAssistant } from '@/components/landing/ai-assistant'
import { AiMonitoring } from '@/components/landing/ai-monitoring'
import { Proactive } from '@/components/landing/proactive'
import { BusinessHealth } from '@/components/landing/business-health'
import { RealtimeVsMonthend } from '@/components/landing/realtime-vs-monthend'
import { AlwaysUpdated } from '@/components/landing/always-updated'
import { EverythingConnected } from '@/components/landing/everything-connected'
import { IndustrySelector } from '@/components/landing/industry-selector'
import { DualPerspective } from '@/components/landing/dual-perspective'
import { ForBusinesses } from '@/components/landing/for-businesses'
import { ForAccountants } from '@/components/landing/for-accountants'
import { DayWith } from '@/components/landing/day-with'
import { WhyNow } from '@/components/landing/why-now'
import { Vision } from '@/components/landing/vision'
import { Trust } from '@/components/landing/trust'
import { FinalCta } from '@/components/landing/final-cta'
import { Footer } from '@/components/landing/footer'
import { LandingProviders } from '@/components/landing/ui-context'
import { PageBackground } from '@/components/landing/page-background'

export default function Page() {
  return (
    <LandingProviders>
      <div id="top" className="relative min-h-dvh bg-background">
        <PageBackground />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Problem />
            <WatchWork />
            <InteractiveDashboard />
            <BeforeAfter />
            <NewWay />
            <HowItWorks />
            <AskDhantra />
            <AiAssistant />
            <AiMonitoring />
            <Proactive />
            <BusinessHealth />
            <RealtimeVsMonthend />
            <AlwaysUpdated />
            <EverythingConnected />
            <IndustrySelector />
            <DualPerspective />
            <ForBusinesses />
            <ForAccountants />
            <DayWith />
            <WhyNow />
            <Vision />
            <Trust />
            <FinalCta />
          </main>
          <Footer />
        </div>
      </div>
    </LandingProviders>
  )
}
