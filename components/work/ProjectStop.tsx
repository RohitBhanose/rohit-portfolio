import type { ReactNode } from 'react'
import type { Flagship, Project } from '@/content/types'
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

/** The flagship's feature areas: numbered stops on one lane, so they read as parts of one system. */
function Areas({ p, f }: { p: Project; f: Flagship }) {
  return (
    <div>
      <h4 className="font-display text-[1.75rem] font-semibold leading-none">{p.highlightsTitle}</h4>
      <p className="mt-2 max-w-measure text-muted">{f.areasIntro}</p>
      <ol className="areas mt-6">
        {p.highlights.map((h, i) => (
          <li key={h.title} className="area">
            <span aria-hidden="true" className="area-no tabular">
              {i + 1}
            </span>
            <h5 className="text-[1.0625rem] font-semibold leading-snug">{h.title}</h5>
            <p className="col-span-2 mt-2 text-small text-muted">{h.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** The idea that ties the areas together, on asphalt like the hero board. Framed as design, with its caveat visible. */
function CoreIdea({ slug, idea }: { slug: string; idea: Flagship['idea'] }) {
  return (
    <div className="idea">
      <div className="idea-text">
        <h4 className="idea-title">{idea.title}</h4>
        <p className="mt-3 font-display text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)] font-semibold leading-[1.05]">
          {idea.lead}
        </p>
        <p className="mt-3 max-w-measure text-white/[0.82]">{idea.body}</p>
      </div>
      <div className="idea-route">
        <p id={`${slug}-loop`} className="text-small font-semibold">
          {idea.loopLabel}
        </p>
        <ol className="idea-loop" aria-labelledby={`${slug}-loop`}>
          {idea.loop.map((step) => (
            <li key={step.name}>
              <span aria-hidden="true" className="idea-stop" />
              <span className="block font-display text-[1.25rem] font-semibold leading-none">{step.name}</span>
              <span className="mt-1 block text-fine text-white/[0.72]">{step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-fine text-white/[0.72]">{idea.caveat}</p>
      </div>
    </div>
  )
}

type Props = { project: Project; index: number; total: number; next?: Project }

/**
 * One project, readable top to bottom without a click: what it is, his part, status and team, the highlights,
 * the stack and the links. The screenshots and the demo sit beside it on desktop (sticky) and after "My part" on
 * phones. Only the background ("Why it exists") is folded away.
 *
 * The flagship gets more room, not more decoration: a marked header, a fuller overview, its feature areas across
 * the full width and the idea that connects them.
 */
export default function ProjectStop({ project: p, index, total, next }: Props) {
  const f = p.flagship
  const facts = [
    { label: 'Role', value: f?.roleDetail ?? p.role },
    ...(p.team ? [{ label: 'Team', value: p.team }] : []),
    { label: 'Status', value: p.status },
    { label: 'When', value: p.period },
  ]

  const links = (
    <>
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
    </>
  )

  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className={f ? 'stop stop-flagship' : 'stop'}>
      <header>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
          {f ? <span className="flag-plate">{f.label} project</span> : <Marker kind="project" />}
          <span className="tabular font-semibold text-ink">
            Project {index + 1} of {total}
          </span>
          <span>{p.kind}</span>
        </p>
        <h3
          id={`${p.slug}-title`}
          className={`mt-3 font-display font-semibold ${f ? 'text-flagship' : 'text-h3'}`}
          translate="no"
        >
          {p.name}
        </h3>
        <p className="mt-3 max-w-[38ch] text-deck font-medium">{p.tagline}</p>
      </header>

      <dl className="facts-strip">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="stop-grid">
        <div className="stop-part">
          <p className={f ? 'max-w-measure text-lead' : 'max-w-measure text-muted'}>{p.summary}</p>
          <h4 className="mt-6 font-semibold">My part</h4>
          <p className="mt-1.5 max-w-measure">{p.contribution}</p>
        </div>

        <div className="stop-stage">
          <Stage
            slug={p.slug}
            name={p.name}
            previewLabel={p.shots.length > 0 ? 'Screenshots' : 'Pipeline'}
            demoName={p.demo}
            demoNote={p.demoNote}
            preview={<Preview project={p} />}
          />
        </div>

        {f ? null : (
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
            {links}
          </div>
        )}
      </div>

      {f ? (
        <div className="flagship-body">
          <Areas p={p} f={f} />
          <CoreIdea slug={p.slug} idea={f.idea} />
          <div>{links}</div>
        </div>
      ) : null}

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
