import { site } from '@/content/site'

const updated = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date())

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="page flex flex-col gap-8 py-10 text-small text-muted md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="font-display text-[1.625rem] font-semibold leading-none text-ink">Rohit Bhanose</p>
          <p>Pune, India. Last updated {updated}.</p>
        </div>
        <ul className="flex flex-wrap gap-x-1 gap-y-1">
          <li>
            <a href={site.social.github} target="_blank" rel="noopener" className="flex min-h-11 items-center px-2 hover:text-ink">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={site.social.linkedin} target="_blank" rel="noopener" className="flex min-h-11 items-center px-2 hover:text-ink">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center px-2 hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <a href="#top" className="flex min-h-11 items-center px-2 hover:text-ink">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
