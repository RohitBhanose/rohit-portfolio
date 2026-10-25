import type { ReactNode } from 'react'
import type { Project } from '@/content/types'
import Plate, { srcFor } from '@/components/ui/Plate'
import Marker from '@/components/ui/Marker'
import ParkitDiagram from './ParkitDiagram'
import ProjectLinks from './ProjectLinks'
import Stack from './Stack'
import Gallery from './Gallery'
import Stage from './Stage'

function Preview({ project }: { project: Project }): ReactNode {
  if (project.shots.length === 0) return project.diagram === 'parkit' ? <ParkitDiagram /> : null
  const plates = project.shots.map((shot) => {
    const phone = shot.height > shot.width
    return (
      <Plate
        key={shot.src}
        shot={shot}
        reveal={false}
        sizes={phone ? '(min-width: 1024px) 272px, 17rem' : '(min-width: 1248px) 690px, (min-width: 1024px) 55vw, 92vw'}
        className={phone ? 'mx-auto max-w-[17rem]' : undefined}
      />
    )
  })
  if (plates.length === 1) return plates[0]
  const items = project.shots.map((s) => ({ caption: s.caption, thumb: srcFor(s), tone: s.tone, portrait: s.height > s.width }))
  return <Gallery name={project.name} items={items} plates={plates} />
}

type Props = { project: Project; index: number; total: number; next?: Project }

/**
 * One project, readable top to bottom without a click: what it is, his part, status and team, the highlights,
 * the stack and the links. The screenshots and the demo sit beside it on desktop (sticky) and after "My part" on
 * phones. Only the background ("Why it exists") is folded away.
 */
export default function ProjectStop({ project: p, index, total, next }: Props) {
  const facts = [
    { label: 'Role', value: p.role },
    ...(p.team ? [{ label: 'Team', value: p.team }] : []),
    { label: 'Status', value: p.status },
    { label: 'When', value: p.period },
  ]
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="stop">
      <header>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
          <Marker kind="project" />
          <span className="tabular font-semibold text-ink">
            Project {index + 1} of {total}
          </span>
          <span>{p.kind}</span>
        </p>
        <h3 id={`${p.slug}-title`} className="mt-3 font-display text-h3 font-semibold" translate="no">
          {p.name}
        </h3>
        <p className="mt-3 max-w-[38ch] text-deck font-medium">{p.tagline}</p>
      </header>

      <dl className="facts-strip">
        {facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="stop-grid">
        <div className="stop-part">
          <p className="max-w-measure text-muted">{p.summary}</p>
          <h4 className="mt-6 font-semibold">My part</h4>
          <p className="mt-1.5 max-w-measure">{p.contribution}</p>
        </div>

        <div className="stop-stage">
          <Stage
            slug={p.slug}
            name={p.name}
            previewLabel={p.shots.length > 0 ? 'Screenshots' : 'Pipeline'}
            demoName={p.demo}
            preview={<Preview project={p} />}
          />
        </div>

        <div className="stop-rest">
          <h4 className="font-semibold">{p.highlightsTitle}</h4>
          <ul className="mt-3 space-y-3">
            {p.highlights.map((h) => (
              <li key={h.title} className="highlight">
                <p className="font-semibold">{h.title}</p>
                <p className="mt-1 text-small text-muted">{h.body}</p>
              </li>
            ))}
          </ul>
          <Stack items={p.stack} className="mt-6" />
          <div className="mt-5">
            <ProjectLinks name={p.name} live={p.live} source={p.source} />
          </div>
          {p.notice ? (
            <p className="notice mt-4" role="note">
              {p.notice}
            </p>
          ) : null}
          {p.problem ? (
            <details className="more mt-5">
              <summary>Why it exists</summary>
              <p className="pb-2 pt-1 text-small text-muted">{p.problem}</p>
            </details>
          ) : null}
        </div>
      </div>

      <p className="stop-next">
        {next ? (
          <a href={`#${next.slug}`} className="link inline-flex min-h-11 items-center font-semibold">
            Next project: <span translate="no">&nbsp;{next.name}</span>
          </a>
        ) : (
          <a href="#experience" className="link inline-flex min-h-11 items-center font-semibold">
            Next: experience and education
          </a>
        )}
      </p>
    </article>
  )
}
