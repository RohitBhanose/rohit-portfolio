import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
  /** Show the outbound arrow. */
  icon?: boolean
  /** Arrow size; pass an em value for links set in large type. */
  iconSize?: number | string
  /**
   * How screen readers learn the link opens a new tab. `inline` adds it to the link name; `describe`
   * keeps it out of the name (for links inside headings, so the heading outline stays clean).
   */
  newTabNote?: 'inline' | 'describe'
}

/** Id of the shared, hidden "Opens in a new tab" description rendered once in app/layout.tsx. */
export const NEW_TAB_NOTE_ID = 'new-tab-note'

export default function ExternalLink({
  href,
  children,
  className,
  icon = true,
  iconSize = 16,
  newTabNote = 'inline',
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
      aria-describedby={newTabNote === 'describe' ? NEW_TAB_NOTE_ID : undefined}
    >
      {children}
      {icon ? (
        <ArrowUpRight aria-hidden="true" size={iconSize} strokeWidth={2.25} className="ml-0.5 inline-block shrink-0 align-[-0.15em]" />
      ) : null}
      {newTabNote === 'inline' ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}
