'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { TourButton, EarlyAccessButton } from './ui-context'
import { Sparkles, ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand Col */}
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Dhanvi home">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-neutral-600 font-medium">
              Continuous financial clarity for modern businesses. Bringing real-time General Ledger intelligence to founders and their accountants.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Double-Entry Invariants Enforced</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {/* Product */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Product
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/dashboard" className="font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
                    Launch App →
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#ai-assistant" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    AI Finance Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/#for-businesses" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    For Businesses
                  </Link>
                </li>
                <li>
                  <Link href="/#for-accountants" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    For Accountants
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Company
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    About Dhanvi
                  </Link>
                </li>
                <li>
                  <Link href="/#vision" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Our Vision
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Engineering Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Contact Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Resources
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <TourButton className="text-neutral-700 hover:text-neutral-950 transition-colors text-left cursor-pointer">
                    60s Product Tour
                  </TourButton>
                </li>
                <li>
                  <EarlyAccessButton className="text-neutral-700 hover:text-neutral-950 transition-colors text-left cursor-pointer">
                    Join Early Access
                  </EarlyAccessButton>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Account Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Legal
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/privacy" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    Security Principles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Dhanvi Technologies. All rights reserved.</p>
          <p className="font-medium">
            Designed for business owners and Chartered Accountants.
          </p>
        </div>
      </div>
    </footer>
  )
}
