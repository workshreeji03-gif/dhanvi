import type { ReactNode } from 'react'

type LegalSection = {
  title: string
  content: ReactNode
}

type LegalPageLayoutProps = {
  title: string
  subtitle: string
  sections: LegalSection[]
}

export function LegalPageLayout({ title, subtitle, sections }: LegalPageLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </header>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-positive [&_li]:ml-4 [&_li]:list-disc [&_ul]:mt-2 [&_ul]:space-y-1.5">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
