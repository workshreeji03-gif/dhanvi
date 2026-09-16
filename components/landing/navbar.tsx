'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'

const NAV_LINKS = [
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Strategies', href: '#strategies' },
  { label: 'Memory', href: '#memory' },
  { label: 'Products', href: '#products' },
  { label: 'Vision', href: '#vision' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
          ? 'border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl shadow-xs dark:border-neutral-800 dark:bg-neutral-950/85'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
        aria-label="Primary"
      >
        {/* Left: Authoritative Dhanvi Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-transform hover:scale-105"
          aria-label="Dhanvi home"
        >
          <Logo className="h-8 w-auto" />
          <span className="hidden sm:inline-block text-[11px] font-bold tracking-widest uppercase text-neutral-400 font-mono">
            Intelligence
          </span>
        </Link>

        {/* Center: Institutional Section Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-3.5 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>

          <EarlyAccessButton
            source="navbar"
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Join Early Access</span>
          </EarlyAccessButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-900 hover:bg-neutral-100 md:hidden cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-neutral-200 bg-white/98 backdrop-blur-xl md:hidden shadow-xl animate-fade-up">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-neutral-100 mt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full border border-neutral-200 px-4 py-2.5 text-center text-xs font-semibold text-neutral-900 shadow-xs mb-2"
              >
                Sign In
              </Link>
            </li>
            <li>
              <EarlyAccessButton
                source="mobile_nav"
                className="flex items-center justify-center gap-1.5 w-full rounded-full bg-neutral-950 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Join Early Access</span>
              </EarlyAccessButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
