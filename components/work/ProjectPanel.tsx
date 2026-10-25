import type { ReactNode } from 'react'
import type { Project, ProjectSlug } from '@/content/types'
import Plate, { srcFor } from '@/components/ui/Plate'
import ProjectLinks from './ProjectLinks'
import Stack from './Stack'
import Disclosure from './Disclosure'
import Gallery from './Gallery'
import Stage from './Stage'

const demoNames: Record<ProjectSlug, string> = {
  swiftdineos: 'Order from table 7',
  levelup: 'Scan a player pass',
  parkit: 'Follow a number plate',
  indiaguessr: 'Play with the scoring',
  leftovera: 'Filter the directory',
}

function Preview({ project, diagram }: { project: Project; diagram?: ReactNode }) {
  if (project.shots.length === 0) return <>{diagram}</>
  const plates = project.shots.map((shot) => {
    const phone = shot.height > shot.width
    return (
      <Plate
        key={shot.src}
        shot={shot}
        reveal={false}
        sizes={phone ? '(min-width: 1024px) 300px, 60vw' : '(min-width: 1248px) 710px, (min-width: 1024px) 57vw, 100vw'}
        className={phone ? 'mx-auto max-w-[17rem]' : undefined}
      />
    )
  })
  if (plates.length === 1) return plates[0]
  const items = project.shots.map((s) => ({ caption: s.caption, thumb: srcFor(s), tone: s.tone }))
  return <Gallery name={project.name} items={items} plates={plates} />
}

/** One project's panel, rendered on the server. The explorer only decides which panel is shown. */
export default function ProjectPanel({ project: p, diagram }: { project: Project; diagram?: ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="m-swap text-small font-semibold text-muted" style={{ '--i': 0 } as React.CSSProperties}>
          {p.role}, {p.period}
        </p>
        <h3 className="m-swap mt-3 font-display text-h3 font-semibold" style={{ '--i': 1 } as React.CSSProperties} translate="no">
          {p.name}
        </h3>
        <p className="m-swap mt-4 max-w-[26ch] text-deck font-medium" style={{ '--i': 2 } as React.CSSProperties}>
          {p.tagline}
        </p>
        <p className="m-swap mt-5 max-w-measure text-muted" style={{ '--i': 3 } as React.CSSProperties}>
          {p.summary}
        </p>
        <div className="m-swap mt-6" style={{ '--i': 4 } as React.CSSProperties}>
          <ProjectLinks name={p.name} live={p.live} source={p.source} />
        </div>
        <Disclosure id={`deep-${p.slug}`} label="How it’s built">
          <dl className="space-y-6 pb-2">
            {p.problem ? (
              <div>
                <dt className="font-semibold">Why it exists</dt>
                <dd className="mt-1.5 text-muted">{p.problem}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold">My part</dt>
              <dd className="mt-1.5 text-muted">{p.contribution}</dd>
            </div>
            <div>
              <dt className="font-semibold">Engineering decisions</dt>
              <dd>
                <ul className="mt-2 space-y-4">
                  {p.highlights.map((h) => (
                    <li key={h.title} className="border-l-2 border-signal pl-4">
                      <p className="font-semibold">{h.title}</p>
                      <p className="mt-1 text-small text-muted">{h.body}</p>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            {p.modules ? (
              <div>
                <dt className="font-semibold">What’s in it</dt>
                <dd className="mt-1.5 text-muted">{p.modules.join(', ')}</dd>
              </div>
            ) : null}
          </dl>
          <Stack items={p.stack} className="mt-6 pb-6" />
        </Disclosure>
      </div>
      <div className="m-swap lg:col-span-7" style={{ '--i': 2 } as React.CSSProperties}>
        <Stage
          slug={p.slug}
          name={p.name}
          previewLabel={p.shots.length > 0 ? 'Screenshots' : 'Pipeline'}
          demoName={demoNames[p.slug]}
          preview={<Preview project={p} diagram={diagram} />}
        />
      </div>
    </div>
  )
}
