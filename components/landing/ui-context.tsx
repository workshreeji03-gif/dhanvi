'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { EarlyAccessModal } from './early-access-modal'
import { ProductTour } from './product-tour'
import { AskDhanviFab } from './ask-dhanvi-fab'

type UiContextValue = {
  openEarlyAccess: (source?: string) => void
  openTour: () => void
}

const UiContext = createContext<UiContextValue | null>(null)

export function useUi() {
  const ctx = useContext(UiContext)
  if (!ctx) throw new Error('useUi must be used within <LandingProviders>')
  return ctx
}

export function LandingProviders({ children }: { children: ReactNode }) {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false)
  const [leadSource, setLeadSource] = useState<string>('modal')
  const [tourOpen, setTourOpen] = useState(false)

  const handleOpenEarlyAccess = (src?: string) => {
    if (src) setLeadSource(src)
    setEarlyAccessOpen(true)
  }

  return (
    <UiContext.Provider
      value={{
        openEarlyAccess: handleOpenEarlyAccess,
        openTour: () => setTourOpen(true),
      }}
    >
      {children}
      <EarlyAccessModal
        open={earlyAccessOpen}
        defaultSource={leadSource}
        onClose={() => setEarlyAccessOpen(false)}
      />
      <ProductTour open={tourOpen} onClose={() => setTourOpen(false)} />
      <AskDhanviFab />
    </UiContext.Provider>
  )
}

/** Reusable CTA that opens the early-access modal from anywhere. */
export function EarlyAccessButton({
  className,
  source = 'landing_cta',
  children,
}: {
  className?: string
  source?: string
  children: ReactNode
}) {
  const { openEarlyAccess } = useUi()
  return (
    <button type="button" onClick={() => openEarlyAccess(source)} className={className}>
      {children}
    </button>
  )
}

/** Reusable CTA that opens the product tour from anywhere. */
export function TourButton({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { openTour } = useUi()
  return (
    <button type="button" onClick={openTour} className={className}>
      {children}
    </button>
  )
}
