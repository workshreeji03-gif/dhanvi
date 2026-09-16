'use client'

import React from 'react'
import { ArrowRight, Sparkles, Shield, Cpu, Binary } from 'lucide-react'
import { EarlyAccessButton } from './ui-context'
import { NetworkVisualization } from './network-visualization'

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Eyebrow & Badges */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              BUILDING AN AI-NATIVE INVESTMENT INSTITUTION
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-[11px] font-mono text-neutral-400">Research & Early Access</span>
          </div>

          {/* Core Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15] sm:leading-[1.12]">
            Intelligence that studies markets.{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Agents that build strategies.
            </span>{' '}
            A system that learns.
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            Dhanvi is building a multi-agent investment intelligence system designed to research
            global markets, analyze companies and events, generate competing strategies, manage
            risk, and learn continuously from outcomes.
          </p>

          {/* Dual Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <EarlyAccessButton
              source="hero_primary"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Join Early Access</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </EarlyAccessButton>

            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-xs transition-all hover:bg-neutral-50 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-850"
            >
              <span>Explore Dhanvi</span>
            </a>
          </div>

          {/* Trust Attributes */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-neutral-500 font-mono">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-Agent Synthesis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Independent Risk Engine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-emerald-600" />
              <span>Institutional Memory</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visualization Canvas */}
        <div id="architecture" className="mt-14 sm:mt-18 scroll-mt-20">
          <NetworkVisualization />
        </div>
      </div>
    </section>
  )
}
