'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'

export function Footer() {
  return (
    <footer className="border-t border-[#E4E8E4] bg-[#F7F9F7] text-[#5F665F] font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="Dhanvi home">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-[#5F665F] font-normal tracking-[-0.01em]">
              Building an AI-native investment intelligence system where specialized agents
              collaborate across market research, strategy development, deterministic risk governance,
              and institutional memory.
            </p>
            <div className="text-[11px] font-mono tabular-nums text-[#10B981] font-semibold">
              Deterministic safety boundaries enforced.
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-xs">
            {/* Platform */}
            <div>
              <div className="font-semibold text-[#111411] mb-3.5 tracking-[-0.01em]">Platform</div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#intelligence" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Intelligence Core
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Agent Architecture
                  </a>
                </li>
                <li>
                  <a href="#strategies" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Strategy Network
                  </a>
                </li>
                <li>
                  <a href="#memory" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Memory Engine
                  </a>
                </li>
                <li>
                  <Link href="/experiments" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Dhanvi Experiments
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <div className="font-semibold text-[#111411] mb-3.5 tracking-[-0.01em]">Products</div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#products" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Dhanvi Institutional
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Dhanvi Intelligence
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Dhanvi Personal
                  </a>
                </li>
              </ul>
            </div>

            {/* Access */}
            <div>
              <div className="font-semibold text-[#111411] mb-3.5 tracking-[-0.01em]">Access</div>
              <ul className="space-y-2.5">
                <li>
                  <EarlyAccessButton className="text-[#5F665F] hover:text-[#111411] transition-colors text-left cursor-pointer font-medium">
                    Join Early Access
                  </EarlyAccessButton>
                </li>
                <li>
                  <a href="#architecture" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Explore Architecture
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Research Inquiries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Regulatory / Legal */}
            <div>
              <div className="font-semibold text-[#111411] mb-3.5 tracking-[-0.01em]">Legal & Governance</div>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/risk-disclosure" className="text-[#5F665F] hover:text-[#111411] transition-colors font-medium">
                    Risk Disclosures
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="mt-14 pt-8 border-t border-[#E4E8E4] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-[#8B928C]">
          <p className="max-w-3xl leading-relaxed font-normal">
            Dhanvi is an investment technology research platform. Content, simulation telemetry, and
            strategy hypotheses presented on this website are for conceptual and technical demonstration
            purposes only and do not constitute investment advice, financial promotion, or an offer to
            buy or sell securities.
          </p>
          <div className="shrink-0 font-mono tabular-nums">
            © {new Date().getFullYear()} Dhanvi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
