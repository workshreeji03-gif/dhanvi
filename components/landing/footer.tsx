'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { EarlyAccessButton } from './ui-context'
import { ShieldCheck, Cpu, Database } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-white font-sans">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand Col */}
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Dhanvi home">
              <Logo className="h-8 w-auto" />
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-neutral-400">
                Intelligence
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-neutral-400">
              Building an AI-native investment intelligence institution. Specialized autonomous agents collaborating across market research, strategy development, risk governance, and institutional memory.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Independent Safety Controls Enforced</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {/* Architecture */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Platform
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs">
                <li>
                  <a href="#intelligence" className="text-neutral-400 hover:text-white transition-colors">
                    Intelligence Layer
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="text-neutral-400 hover:text-white transition-colors">
                    Agent Architecture
                  </a>
                </li>
                <li>
                  <a href="#strategies" className="text-neutral-400 hover:text-white transition-colors">
                    Multi-Strategy Lab
                  </a>
                </li>
                <li>
                  <a href="#memory" className="text-neutral-400 hover:text-white transition-colors">
                    Institutional Memory
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-neutral-400 hover:text-white transition-colors">
                    Product Roadmap
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Solutions
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs">
                <li>
                  <a href="#products" className="text-neutral-400 hover:text-white transition-colors">
                    Dhanvi Institutional
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-neutral-400 hover:text-white transition-colors">
                    Dhanvi Intelligence API
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-neutral-400 hover:text-white transition-colors">
                    Dhanvi Personal
                  </a>
                </li>
                <li>
                  <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                    Launch Platform →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Access */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Access
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs">
                <li>
                  <EarlyAccessButton className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer">
                    Join Early Access
                  </EarlyAccessButton>
                </li>
                <li>
                  <Link href="/login" className="text-neutral-400 hover:text-white transition-colors">
                    Researcher Login
                  </Link>
                </li>
                <li>
                  <Link href="/reset-password" className="text-neutral-400 hover:text-white transition-colors">
                    Reset Password
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
                    Research Inquiries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Compliance
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-xs">
                <li>
                  <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-neutral-400 hover:text-white transition-colors">
                    Security Architecture
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mandatory Regulatory & Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-900 text-xs text-neutral-400 leading-relaxed font-mono">
          <p className="mb-4">
            <strong>Regulatory & Financial Notice:</strong> Dhanvi is currently a technology and financial
            research project under active development. Information presented on this website is provided
            strictly for informational and conceptual purposes and does not constitute investment advice,
            financial recommendations, an offer, solicitation, or endorsement to buy or sell any security,
            derivative, commodity, or financial instrument. Capabilities displayed represent research prototypes,
            quantitative simulations, and planned architectural features.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-neutral-400 text-[11px]">
            <p>© {new Date().getFullYear()} Dhanvi. All rights reserved.</p>
            <p>Building an AI-Native Investment Intelligence System.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
