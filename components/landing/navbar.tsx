'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, PlayCircle, ArrowRight } from 'lucide-react'
import { Logo } from './logo'
import { EarlyAccessButton, TourButton } from './ui-context'

const NAV_LINKS = [
  { label: 'Product', href: '/#product' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Businesses', href: '/#for-businesses' },
  { label: 'For Accountants', href: '/#for-accountants' },
  { label: 'Vision', href: '/#vision' },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/80 bg-background/85 backdrop-blur-xl shadow-xs'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-105" aria-label="Dhanvi home">
          <Logo className="h-9 w-auto" />
        </Link>

        {/* Center Nav Links with subtle active pill states */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative rounded-full px-3.5 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-950 hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {isHome ? (
            <TourButton className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-all hover:text-neutral-950 hover:bg-neutral-100 cursor-pointer">
              <PlayCircle className="h-4 w-4 text-emerald-600" />
              Take a tour
            </TourButton>
          ) : (
            <Link
              href="/#product"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-all hover:text-neutral-950 hover:bg-neutral-100"
            >
              <PlayCircle className="h-4 w-4 text-emerald-600" />
              Take a tour
            </Link>
          )}

          <Link
            href="/login"
            className="inline-flex items-center rounded-full px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-all hover:text-neutral-950 hover:bg-neutral-100"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch App
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <EarlyAccessButton source="navbar" className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-neutral-950 shadow-xs transition-all hover:bg-neutral-50 hover:border-neutral-300 cursor-pointer">
            Join Early Access
          </EarlyAccessButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-900 hover:bg-neutral-100 lg:hidden cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden shadow-xl animate-fade-up">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <TourButton className="flex items-center justify-center gap-1.5 w-full rounded-full border border-border bg-card px-4 py-2.5 text-center text-xs font-semibold text-neutral-950 shadow-xs cursor-pointer">
                <PlayCircle className="h-4 w-4 text-emerald-600" />
                Take a tour
              </TourButton>
            </li>
            <li className="pt-1">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full border border-border bg-card px-4 py-2.5 text-center text-xs font-semibold text-neutral-950 shadow-xs"
              >
                Sign In
              </Link>
            </li>
            <li className="pt-1">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-neutral-950 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-xs"
              >
                Launch App
              </Link>
            </li>
            <li>
              <EarlyAccessButton source="mobile_nav" className="block w-full rounded-full border border-border bg-card px-4 py-2.5 text-center text-xs font-semibold text-neutral-950 mt-1 shadow-xs cursor-pointer">
                Join Early Access
              </EarlyAccessButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
