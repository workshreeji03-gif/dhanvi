'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080A09] text-[#9A9F9B] font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="Dhanvi home">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-[#7A807B]">
              Building an AI-native investment intelligence system where specialized agents
              collaborate across market research, strategy development, deterministic risk governance,
              and institutional memory.
            </p>
            <div className="text-[11px] font-mono text-[#10B981]">
              Deterministic safety boundaries enforced.
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-xs">
            {/* Platform */}
            <div>
              <div className="font-medium text-[#F1F3EF] mb-3.5">Platform</div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#intelligence" className="hover:text-[#F1F3EF] transition-colors">
                    Intelligence Core
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#F1F3EF] transition-colors">
                    Agent Architecture
                  </a>
                </li>
                <li>
                  <a href="#strategies" className="hover:text-[#F1F3EF] transition-colors">
                    Strategy Network
                  </a>
                </li>
                <li>
                  <a href="#memory" className="hover:text-[#F1F3EF] transition-colors">
                    Memory Engine
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <div className="font-medium text-[#F1F3EF] mb-3.5">Products</div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#products" className="hover:text-[#F1F3EF] transition-colors">
                    Dhanvi Institutional
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-[#F1F3EF] transition-colors">
                    Dhanvi Intelligence
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-[#F1F3EF] transition-colors">
                    Dhanvi Personal
                  </a>
                </li>
              </ul>
            </div>

            {/* Access */}
            <div>
              <div className="font-medium text-[#F1F3EF] mb-3.5">Access</div>
              <ul className="space-y-2.5">
                <li>
                  <EarlyAccessButton className="hover:text-[#F1F3EF] transition-colors text-left cursor-pointer">
                    Join Early Access
                  </EarlyAccessButton>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#F1F3EF] transition-colors">
                    Explore Architecture
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F1F3EF] transition-colors">
                    Research Inquiries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Regulatory / Legal */}
            <div>
              <div className="font-medium text-[#F1F3EF] mb-3.5">Legal & Governance</div>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="hover:text-[#F1F3EF] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#F1F3EF] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/risk-disclosure" className="hover:text-[#F1F3EF] transition-colors">
                    Risk Disclosures
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-[#7A807B]">
          <p className="max-w-3xl leading-relaxed">
            Dhanvi is an investment technology research platform. Content, simulation telemetry, and
            strategy hypotheses presented on this website are for conceptual and technical demonstration
            purposes only and do not constitute investment advice, financial promotion, or an offer to
            buy or sell securities.
          </p>
          <div className="shrink-0 font-mono">
            © {new Date().getFullYear()} Dhanvi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
