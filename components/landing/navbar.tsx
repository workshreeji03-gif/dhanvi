'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'

const NAV_LINKS = [
  { label: 'Intelligence', href: '/#intelligence' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Strategies', href: '/#strategies' },
  { label: 'Memory', href: '/#memory' },
  { label: 'Experiments', href: '/#experiments' },
  { label: 'Vision', href: '/#vision' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
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
          ? 'border-b border-[#E4E8E4] bg-white/95 backdrop-blur-xs'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10"
        aria-label="Primary"
      >
        {/* Left: Authentic Dhanvi Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Dhanvi home"
        >
          <Logo className="h-7 w-auto" />
        </Link>

        {/* Center: Clean Navigation Links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#4B5563] transition-colors hover:text-[#111827]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action: Clean Buttons matching Image 1 */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-[#111827] hover:bg-black px-4 py-2 text-xs sm:text-sm font-semibold tracking-tight text-white transition-all shadow-xs cursor-pointer"
          >
            <span>Launch App</span>
            <span className="ml-1 text-xs">→</span>
          </Link>
          <EarlyAccessButton
            source="navbar"
            className="inline-flex items-center justify-center rounded-full border border-[#E4E8E4] bg-white hover:bg-[#F7F9F7] px-4 py-2 text-xs sm:text-sm font-semibold tracking-tight text-[#111827] transition-colors cursor-pointer shadow-xs"
          >
            <span>Join Early Access</span>
          </EarlyAccessButton>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#5F665F] hover:text-[#111411] hover:bg-[#F7F9F7] md:hidden cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="border-b border-[#E4E8E4] bg-white md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 sm:px-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium tracking-[-0.01em] text-[#444A45] transition-colors hover:text-[#111411]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-[#E4E8E4] mt-2 flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full rounded-full bg-[#111827] hover:bg-black px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight text-white transition-colors"
              >
                <span>Launch App →</span>
              </Link>
              <EarlyAccessButton
                source="mobile_nav"
                className="flex items-center justify-center w-full rounded-full border border-[#E4E8E4] bg-white hover:bg-[#F7F9F7] px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight text-[#111827] transition-colors cursor-pointer"
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
