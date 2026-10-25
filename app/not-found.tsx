import type { Metadata } from 'next'
import { projects } from '@/content/projects'

export const metadata: Metadata = { title: 'Page not found · Rohit Bhanose', robots: { index: false } }

export default function NotFound() {
  return (
    <section id="top" className="page flex min-h-[60vh] flex-col justify-center py-section">
      <p className="tabular text-small font-semibold text-muted">404</p>
      <h1 className="mt-3 font-display text-h2 font-semibold">The road ends here.</h1>
      <p className="mt-5 max-w-measure text-lead text-muted">
        There’s nothing at this address. Everything on this site lives on one page; these are the five projects.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6">
        {projects.map((p) => (
          <li key={p.slug}>
            {/* Plain links: next/link would add its runtime to every page for this one list. */}
            <a href={`/#${p.slug}`} className="link inline-flex min-h-11 items-center font-semibold" translate="no">
              {p.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <a href="/" className="btn btn-primary">
          Go to the home page
        </a>
      </p>
    </section>
  )
}
