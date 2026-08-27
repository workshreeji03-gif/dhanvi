'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const QUESTIONS = [
  'How much profit did we make this month?',
  'Why is our profit down?',
  'Which products have the lowest margins?',
  'Who owes us money?',
  'Where are we spending too much?',
  'Can we afford to purchase ₹10 lakh of inventory?',
]

export function AiAssistant() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="AI Finance Assistant"
          title="Ask your business anything."
          description="No dashboards to learn, no reports to dig through. Ask a question in plain language and get an answer grounded in your live financial data."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Example questions */}
          <Reveal className="flex flex-col justify-center gap-3">
            <p className="text-sm font-medium text-foreground">Try asking things like:</p>
            <div className="flex flex-wrap gap-2.5">
              {QUESTIONS.map((q) => (
                <span
                  key={q}
                  className="rounded-full border border-border bg-card px-3.5 py-2 text-sm text-foreground"
                >
                  {q}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Chat interface */}
          <Reveal delay={120}>
            <ChatDemo />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

type Msg = { from: 'owner' | 'dhanvi'; content: React.ReactNode }

const CONVERSATION: Msg[] = [
  { from: 'owner', content: 'Why did profit fall this month?' },
  {
    from: 'dhanvi',
    content: (
      <>
        Profit declined <span className="font-semibold">8.4%</span> primarily because raw-material
        costs increased <span className="font-semibold">13%</span>, while average selling prices
        stayed almost unchanged.
        <br />
        <br />I also found that <span className="font-semibold">Product X&apos;s</span> gross margin
        dropped from 24% to 11%.
        <a
          href="#join"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-info hover:underline"
        >
          View detailed analysis <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </>
    ),
  },
]

function ChatDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runSequence()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)

    let timers: ReturnType<typeof setTimeout>[] = []
    function runSequence() {
      // owner message
      timers.push(setTimeout(() => setShown(1), 300))
      // typing indicator
      timers.push(setTimeout(() => setTyping(true), 900))
      // dhanvi reply
      timers.push(
        setTimeout(() => {
          setTyping(false)
          setShown(2)
        }, 2100),
      )
    }

    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.05]"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-info/15 text-info">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-semibold text-foreground">Dhanvi Assistant</span>
      </div>

      <div className="flex min-h-[320px] flex-col gap-4 p-4 sm:p-6">
        {CONVERSATION.slice(0, shown).map((msg, i) => (
          <div
            key={i}
            className={`flex reveal is-visible ${msg.from === 'owner' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.from === 'owner'
                  ? 'rounded-br-sm bg-primary text-primary-foreground'
                  : 'rounded-bl-sm border border-border bg-muted/60 text-foreground'
              }`}
            >
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide opacity-60">
                {msg.from === 'owner' ? 'Owner' : 'Dhanvi'}
              </span>
              {msg.content}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-muted/60 px-4 py-3.5">
              <Dot delay={0} />
              <Dot delay={150} />
              <Dot delay={300} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground"
      style={{ animationDelay: `${delay}ms` }}
    />
  )
}
