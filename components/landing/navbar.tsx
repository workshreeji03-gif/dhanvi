'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'

const NAV_LINKS = [
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Research', href: '#research' },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-white/[0.07] bg-[#080A09]/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10"
        aria-label="Primary"
      >
        {/* Left: Authoritative Dhanvi Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Dhanvi home"
        >
          <Logo className="h-7 w-auto" />
        </Link>

        {/* Center: Simplified Navigation Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-medium text-[#9A9F9B] transition-colors hover:text-[#F1F3EF]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action: Restrained Primary CTA */}
        <div className="hidden items-center md:flex">
          <EarlyAccessButton
            source="navbar"
            className="inline-flex items-center justify-center rounded-md bg-[#10B981] px-4 py-2 text-xs font-semibold text-[#080A09] transition-all hover:bg-[#059669] active:scale-[0.99] cursor-pointer"
          >
            <span>Join Early Access</span>
          </EarlyAccessButton>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#9A9F9B] hover:text-[#F1F3EF] hover:bg-white/[0.04] md:hidden cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="border-b border-white/[0.08] bg-[#080A09]/98 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 sm:px-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-[#9A9F9B] transition-colors hover:text-[#F1F3EF]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4 mt-2 border-t border-white/[0.06]">
              <EarlyAccessButton
                source="mobile_nav"
                className="flex items-center justify-center w-full rounded-md bg-[#10B981] px-4 py-2.5 text-center text-xs font-semibold text-[#080A09] transition-colors hover:bg-[#059669] cursor-pointer"
              >
                <span>Join Early Access</span>
              </EarlyAccessButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
