import type { ReactNode } from 'react'
import { Reveal } from './reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'
  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className ?? ''}`}>
      {eyebrow && (
        <Reveal
          as="span"
          className="mb-3 text-xs font-semibold uppercase tracking-widest text-positive"
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={40}
        className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={90}
          className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}
