import type { ReactNode } from 'react'
import { Github, Linkedin } from 'lucide-react'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import { screening } from '@/content/screening'
import type { Project } from '@/content/types'
import ParkitDiagram from '@/components/work/ParkitDiagram'
import RouteBoard, { type BoardRow } from './RouteBoard'

/** A 2.4:1 crop of a public screen. `sizes` before `srcSet` before `src`: React sets props in order, and an early
 * `src` would start a second download. */
function Crop({ project, first }: { project: Project; first: boolean }) {
  const base = `/work/hero/${project.slug}`
  return (
    <img
      sizes="(min-width: 1248px) 560px, (min-width: 1024px) 45vw, 92vw"
      srcSet={`${base}-600.webp 600w, ${base}-1200.webp 1200w`}
      src={`${base}-600.webp`}
      width={1200}
      height={500}
      alt=""
      loading={first ? 'eager' : 'lazy'}
      decoding="async"
      data-tone={project.heroCrop?.tone}
      className="block h-full w-full object-cover"
    />
  )
}

/** The screening facts, set like a road sign. Unapproved facts are never rendered (see content/screening.ts). */
function Facts() {
  const { approved, classYear, cgpa } = screening
  const rows: { label: string; value: ReactNode; open?: boolean }[] = [
    {
      label: 'Studying',
      value: (
        <>
          B.Tech CSE (AI &amp; Data Science), <span className="whitespace-nowrap">MIT-WPU</span>, Pune, second year
          {approved.classYear ? <>, {classYear.label}</> : null}
        </>
      ),
    },
    ...(approved.cgpa ? [{ label: 'CGPA', value: cgpa }] : []),
    { label: 'Also', value: <>BS in Data Science and Applications, IIT&nbsp;Madras (online)</> },
    { label: 'Building', value: <>Co-founder of <span translate="no">SwiftDineOS</span>, since June 2026</> },
    {
      label: 'Open to',
      value: <>Internships in {site.availability.roles.join(', ').replace(/, ([^,]*)$/, ' and $1')}</>,
      open: true,
    },
  ]
  return (
    <dl className="sign mt-6">
      {rows.map((row) => (
        <div key={row.label} className="sign-row" data-open={row.open ? '' : undefined}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function Hero() {
  const rows: BoardRow[] = projects.map((project, i) => ({
    slug: project.slug,
    name: project.name,
    kind: project.kind,
    role: project.role,
    flag: project.flagship?.label,
    caption: project.heroCrop?.caption ?? `${project.name} pipeline, from camera frame to bill`,
    preview: project.heroCrop ? <Crop project={project} first={i === 0} /> : <ParkitDiagram compact />,
  }))

  return (
    <section id="top" aria-labelledby="hero-title" className="page pb-section pt-4 lg:pt-6">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="font-display text-name font-semibold" translate="no">
            {site.name}
          </h1>
          <p className="mt-3 max-w-[32ch] text-deck font-medium">{site.positioning}</p>
          <Facts />
          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            <a href="#work" className="btn btn-primary px-5 sm:px-6">
              View projects
            </a>
            <a href={site.resume.href} download={site.resume.fileName} className="btn btn-secondary px-5 sm:px-6">
              Résumé
              <span className="sr-only"> (PDF)</span>
            </a>
            <a href="#contact" className="btn btn-secondary px-5 sm:px-6">
              Contact
            </a>
          </div>
          <ul className="mt-3 hidden flex-wrap gap-x-5 text-small lg:flex">
            {[
              { label: 'GitHub', href: site.social.github, Icon: Github },
              { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener" className="ghost-link inline-flex min-h-11 items-center gap-2">
                  <Icon aria-hidden="true" size={17} strokeWidth={2} />
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <RouteBoard rows={rows} />
        </div>
      </div>
    </section>
  )
}
