'use client'

import { useEffect, useState } from 'react'
import { Menu, X, PlayCircle } from 'lucide-react'
import { Logo } from './logo'
import { EarlyAccessButton, TourButton } from './ui-context'

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Businesses', href: '#for-businesses' },
  { label: 'For Accountants', href: '#for-accountants' },
  { label: 'Vision', href: '#vision' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Dhanvi home">
          <Logo className="h-7 w-7" />
          <span className="text-lg font-semibold tracking-tight text-foreground">Dhanvi</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <TourButton className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <PlayCircle className="h-4 w-4" />
            Take a tour
          </TourButton>
          <EarlyAccessButton className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md">
            Join Early Access
          </EarlyAccessButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <TourButton className="block w-full rounded-full border border-border px-4 py-3 text-center text-sm font-medium text-foreground">
                Take a tour
              </TourButton>
            </li>
            <li>
              <EarlyAccessButton className="block w-full rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">
                Join Early Access
              </EarlyAccessButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
