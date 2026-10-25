import { isAvailable, type MaybeLink } from '@/content/types'
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

function LinkItem({ label, name, link }: { label: string; name: string; link: MaybeLink }) {
  return (
    <li className="min-w-0">
      {isAvailable(link) ? (
        <>
          <ExternalLink href={link.href} className="link inline-flex min-h-11 items-center font-semibold">
            {label}
            {/* Screen-reader link lists show links out of context: "Live site for LevelUp". */}
            <span className="sr-only"> for {name}</span>
          </ExternalLink>
          <span className="block text-fine text-muted" translate="no">
            <Breakable text={link.label} />
          </span>
        </>
      ) : (
        <>
          <span className="flex min-h-11 items-center font-semibold text-muted">{label}</span>
          <span className="block text-fine text-muted">{link.unavailable}</span>
        </>
      )}
    </li>
  )
}

/** Live site and source links. A link that doesn't exist says why, instead of rendering a dead button. */
export default function ProjectLinks({ name, live, source }: { name: string; live: MaybeLink; source: MaybeLink }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:gap-x-12">
      <LinkItem label="Live site" name={name} link={live} />
      <LinkItem label="Source code" name={name} link={source} />
    </ul>
  )
}
