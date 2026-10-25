import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  intro?: ReactNode
  children: ReactNode
}

export default function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="page py-section">
      <header className="mb-[clamp(2.5rem,1.5rem+3vw,4.5rem)] max-w-4xl">
        <h2 id={`${id}-title`} className="font-display text-h2 font-semibold">
          {title}
        </h2>
        {intro ? <p className="mt-5 max-w-measure text-lead text-muted">{intro}</p> : null}
      </header>
      {children}
    </section>
  )
}
