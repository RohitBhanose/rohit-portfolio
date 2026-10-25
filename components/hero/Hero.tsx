import { statSync } from 'node:fs'
import { join } from 'node:path'
import { Github, Linkedin, Mail } from 'lucide-react'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import type { Shot } from '@/content/types'
import { srcFor, srcSetFor } from '@/components/ui/Plate'
import ParkitDiagram from '@/components/work/ParkitDiagram'
import ProjectIndex, { type IndexItem } from './ProjectIndex'
import HeroRoad from './HeroRoad'

const resumeSize = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
  statSync(join(process.cwd(), 'public', site.resume.href)).size / 1024,
)

const DECK = 'I build full-stack and AI software for real places: restaurant tables, parking gates, event halls and city streets.'

function HeroLayer({ shot, first }: { shot: Shot; first: boolean }) {
  return (
    <img
      src={srcFor(shot)}
      srcSet={srcSetFor(shot)}
      sizes="(min-width: 1248px) 470px, (min-width: 1024px) 38vw, 100vw"
      width={shot.width}
      height={shot.height}
      alt=""
      decoding="async"
      fetchPriority={first ? 'high' : undefined}
      data-tone={shot.tone}
      className="h-full w-full object-cover object-top"
    />
  )
}

/** The name, one masked character at a time. Screen readers get the plain text instead. */
function Name() {
  let c = 0
  return (
    <h1 id="hero-title" className="font-display text-name font-semibold">
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true">
        {site.name.split(' ').map((word, w) => (
          <span key={word}>
            {w > 0 ? ' ' : null}
            <span className="hero-line">
              {[...word].map((ch) => (
                <span key={c} className="hero-char" style={{ '--c': c++ } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </h1>
  )
}

export default function Hero() {
  const items: IndexItem[] = projects.map((project, i) => {
    const shot = project.shots.find((s) => s.src === project.heroShot)
    return {
      slug: project.slug,
      name: project.name,
      place: project.place,
      tagline: project.tagline,
      live: project.live,
      source: project.source,
      layer: shot ? <HeroLayer shot={shot} first={i === 0} /> : <ParkitDiagram compact />,
    }
  })

  const socials = [
    { label: 'GitHub', href: site.social.github, Icon: Github, external: true },
    { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin, external: true },
    { label: 'Email', href: `mailto:${site.email}`, Icon: Mail, external: false },
  ]

  return (
    <div className="relative isolate overflow-x-clip">
      <HeroRoad />
      <section id="top" aria-labelledby="hero-title" className="page pb-section pt-[clamp(1.5rem,0.5rem+2.5vw,2.5rem)]">
        <Name />

        <div className="mt-[clamp(1.75rem,0.5rem+2.5vw,2.75rem)] grid gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-y-14">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="max-w-[30ch] text-deck font-medium">
              <span className="sr-only">{DECK}</span>
              <span aria-hidden="true">
                {DECK.split(' ').map((word, w) => (
                  <span key={w}>
                    {w > 0 ? ' ' : null}
                    <span className="hero-word">
                      <span style={{ '--w': w } as React.CSSProperties}>{word}</span>
                    </span>
                  </span>
                ))}
              </span>
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

            <a href="#work" className="scroll-cue hero-enter mt-10 hidden lg:inline-flex" style={{ '--i': 4 } as React.CSSProperties}>
              <span aria-hidden="true" className="scroll-cue-lane" />
              Scroll to explore the work
            </a>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ProjectIndex items={items} />
          </div>
        </div>
      </section>
    </div>
  )
}
