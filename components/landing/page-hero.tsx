import type { ReactNode } from 'react'
import { Reveal } from './reveal'

type PageHeroProps = {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
}

export function PageHero({ title, description, children, align = 'center' }: PageHeroProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div className={`relative mx-auto flex max-w-3xl flex-col px-5 pb-16 sm:px-8 sm:pb-20 ${alignment}`}>
        <Reveal
          as="h1"
          className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
        >
          {title}
        </Reveal>
        {description && (
          <Reveal
            as="p"
            delay={60}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {description}
          </Reveal>
        )}
        {children && (
          <Reveal delay={120} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}
