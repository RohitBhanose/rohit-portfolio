import { statSync } from 'node:fs'
import { join } from 'node:path'
import { Github, Linkedin, Mail } from 'lucide-react'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import type { Shot } from '@/content/types'
import { srcFor, srcSetFor } from '@/components/ui/Plate'
import ParkitDiagram from '@/components/work/ParkitDiagram'
import ProjectIndex, { type IndexItem } from './ProjectIndex'

const resumeSize = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
  statSync(join(process.cwd(), 'public', site.resume.href)).size / 1024,
)

/** A 1×1 transparent GIF: below the desktop breakpoint the plate is hidden, so phones skip the download. */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

function HeroLayer({ shot, first }: { shot: Shot; first: boolean }) {
  return (
    <picture>
      <source media="(max-width: 1023px)" srcSet={BLANK} />
      <img
        src={srcFor(shot)}
        srcSet={srcSetFor(shot)}
        sizes="(min-width: 1248px) 470px, 38vw"
        width={shot.width}
        height={shot.height}
        alt=""
        decoding="async"
        fetchPriority={first ? 'high' : undefined}
        data-tone={shot.tone}
        className="h-full w-full object-cover object-top"
      />
    </picture>
  )
}

export default function Hero() {
  const items: IndexItem[] = projects.map((project, i) => {
    const shot = project.shots.find((s) => s.src === project.heroShot)
    return {
      slug: project.slug,
      name: project.name,
      place: project.place,
      caption: shot?.caption ?? project.heroCaption ?? '',
      layer: shot ? <HeroLayer shot={shot} first={i === 0} /> : <ParkitDiagram compact />,
    }
  })

  const socials = [
    { label: 'GitHub', href: site.social.github, Icon: Github, external: true },
    { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin, external: true },
    { label: 'Email', href: `mailto:${site.email}`, Icon: Mail, external: false },
  ]

  return (
    <section id="top" aria-labelledby="hero-title" className="page pb-section pt-[clamp(1.5rem,0.5rem+3vw,3rem)]">
      <h1 id="hero-title" className="font-display text-name font-semibold">
        <span className="hero-line">
          <span style={{ '--i': 0 } as React.CSSProperties}>Rohit</span>
        </span>{' '}
        <span className="hero-line">
          <span style={{ '--i': 1 } as React.CSSProperties}>Bhanose</span>
        </span>
      </h1>

      <div className="mt-[clamp(1.75rem,0.5rem+2.5vw,2.75rem)] grid gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-y-14">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="hero-settle max-w-[30ch] text-deck font-medium" style={{ '--i': 0 } as React.CSSProperties}>
            I build full-stack and AI software for real places: restaurant tables, parking gates, event halls and city
            streets.
          </p>
          <p className="hero-settle mt-6 max-w-[52ch] text-lead text-muted" style={{ '--i': 1 } as React.CSSProperties}>
            I’m a second-year CSE (AI &amp; Data Science) student at{' '}
            <span className="whitespace-nowrap">MIT-WPU</span>, Pune, also studying data science at IIT&nbsp;Madras. I
            co-founded{' '}
            <a href={site.social.swiftdine} target="_blank" rel="noopener" className="link text-ink" translate="no">
              SwiftDineOS<span className="sr-only"> (opens in a new tab)</span>
            </a>
            , an AI-powered restaurant operating system, and I’ve led the development of every project on this page.
          </p>

          <div className="hero-enter mt-9 flex flex-wrap items-center gap-3" style={{ '--i': 2 } as React.CSSProperties}>
            <a href="#work" className="btn btn-primary">
              View projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact me
            </a>
            <a
              href={site.resume.href}
              download={site.resume.fileName}
              className="link-group inline-flex min-h-12 items-center text-small font-semibold"
            >
              <span className="link">Download résumé</span>
              <span className="ml-1.5 font-normal text-muted">PDF, {resumeSize}&nbsp;KB</span>
            </a>
          </div>

          <ul className="hero-enter -ml-2 mt-8 flex flex-wrap gap-x-2" style={{ '--i': 3 } as React.CSSProperties}>
            {socials.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="flex min-h-11 items-center gap-2 px-2 text-small font-medium text-muted transition-colors duration-150 hover:text-ink"
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={2} />
                  {label}
                  {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ProjectIndex items={items} />
        </div>
      </div>
    </section>
  )
}
