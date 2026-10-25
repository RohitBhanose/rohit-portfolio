import type { ExternalLink as Link } from '@/content/types'
import ExternalLink from '@/components/ui/ExternalLink'

/** Let long hostnames and repository paths wrap after a slash rather than mid-word. */
function Breakable({ text }: { text: string }) {
  const parts = text.split('/')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? (
            <>
              /<wbr />
            </>
          ) : null}
        </span>
      ))}
    </>
  )
}

function LinkItem({ label, name, link }: { label: string; name: string; link: Link }) {
  return (
    <li className="min-w-0">
      <ExternalLink href={link.href} className="link inline-flex min-h-11 items-center font-semibold">
        {label}
        {/* Screen-reader link lists show links out of context: "Visit the live site for LevelUp". */}
        <span className="sr-only"> for {name}</span>
      </ExternalLink>
      <span className="block text-fine text-muted" translate="no">
        <Breakable text={link.label} />
      </span>
    </li>
  )
}

/** The project's public links. Only links that exist are listed. */
export default function ProjectLinks({ name, live, source }: { name: string; live?: Link; source?: Link }) {
  return (
    <ul className="flex flex-wrap gap-x-12 gap-y-2">
      {live ? <LinkItem label={live.cta ?? 'Visit the live site'} name={name} link={live} /> : null}
      {source ? <LinkItem label={source.cta ?? 'View source'} name={name} link={source} /> : null}
    </ul>
  )
}
