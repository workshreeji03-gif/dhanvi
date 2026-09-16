import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { ProblemSection } from '@/components/landing/problem-section'
import { IntelligenceLayer } from '@/components/landing/intelligence-layer'
import { DecisionPipeline } from '@/components/landing/decision-pipeline'
import { MultiStrategyLab } from '@/components/landing/multi-strategy-lab'
import { DecisionMemory } from '@/components/landing/decision-memory'
import { SafetyArchitecture } from '@/components/landing/safety-architecture'
import { ProductDirections } from '@/components/landing/product-directions'
import { IntelligenceTerminal } from '@/components/landing/intelligence-terminal'
import { EarlyAccessSection } from '@/components/landing/early-access-section'
import { Footer } from '@/components/landing/footer'
import { LandingProviders } from '@/components/landing/ui-context'
import { PageBackground } from '@/components/landing/page-background'

export default function Page() {
  return (
    <LandingProviders>
      <div id="top" className="relative min-h-dvh bg-background selection:bg-emerald-100 selection:text-emerald-950 font-sans">
        <PageBackground />
        <div className="relative z-10">
          <Navbar />
          <main>
            {/* 1. Hero & Network Architecture Visualization */}
            <Hero />

            {/* 2. The Problem & Paradigm Shift */}
            <ProblemSection />

            {/* 3. The 9 Specialized Intelligence Agents */}
            <IntelligenceLayer />

            {/* 4. The 9-Stage Decision Pipeline */}
            <DecisionPipeline />

            {/* 5. Multi-Strategy Simulation Lab */}
            <MultiStrategyLab />

            {/* 6. Institutional Decision Memory */}
            <DecisionMemory />

            {/* 7. Architecture & Independent Safety Layer */}
            <SafetyArchitecture />

            {/* 8. Three Product Directions */}
            <ProductDirections />

            {/* 9. Live-Style Intelligence Terminal */}
            <IntelligenceTerminal />

            {/* 10. Early Access Conversion Section */}
            <EarlyAccessSection />
          </main>
          <Footer />
        </div>
      </div>
    </LandingProviders>
  )
}
