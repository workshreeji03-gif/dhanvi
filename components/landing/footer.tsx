'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'

export function Footer() {
  return (
    <footer className="border-t border-[#E5E8E5] bg-[#FAFAF9] text-[#606660] font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="Dhanvi home">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-[#606660]">
              Building an AI-native investment intelligence system where specialized agents
              collaborate across market research, strategy development, deterministic risk governance,
              and institutional memory.
            </p>
            <div className="text-[11px] font-mono text-[#10B981] font-medium">
              Deterministic safety boundaries enforced.
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-xs">
            {/* Platform */}
            <div>
              <div className="font-semibold text-[#101310] mb-3.5 tracking-tight">Platform</div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#intelligence" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Intelligence Core
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Agent Architecture
                  </a>
                </li>
                <li>
                  <a href="#strategies" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Strategy Network
                  </a>
                </li>
                <li>
                  <a href="#memory" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Memory Engine
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <div className="font-semibold text-[#101310] mb-3.5 tracking-tight">Products</div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#products" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Dhanvi Institutional
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Dhanvi Intelligence
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Dhanvi Personal
                  </a>
                </li>
              </ul>
            </div>

            {/* Access */}
            <div>
              <div className="font-semibold text-[#101310] mb-3.5 tracking-tight">Access</div>
              <ul className="space-y-2.5">
                <li>
                  <EarlyAccessButton className="text-[#606660] hover:text-[#101310] transition-colors text-left cursor-pointer">
                    Join Early Access
                  </EarlyAccessButton>
                </li>
                <li>
                  <a href="#architecture" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Explore Architecture
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Research Inquiries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Regulatory / Legal */}
            <div>
              <div className="font-semibold text-[#101310] mb-3.5 tracking-tight">Legal & Governance</div>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/risk-disclosure" className="text-[#606660] hover:text-[#101310] transition-colors">
                    Risk Disclosures
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="mt-14 pt-8 border-t border-[#E5E8E5] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-[#8A908A]">
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
