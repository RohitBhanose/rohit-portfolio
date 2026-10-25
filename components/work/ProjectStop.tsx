import type { ReactNode } from 'react'
import type { Flagship, Project } from '@/content/types'
import Plate, { srcFor } from '@/components/ui/Plate'
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

/** The flagship's feature areas: six parts of one platform, set as a grid of short entries under one rule. */
function Areas({ p, f }: { p: Project; f: Flagship }) {
  return (
    <div>
      <h4 className="font-display text-[1.875rem] font-semibold leading-none">{p.highlightsTitle}</h4>
      <p className="mt-3 max-w-measure text-muted">{f.areasIntro}</p>
      <ul className="areas">
        {p.highlights.map((h) => (
          <li key={h.title} className="area">
            <h5 className="font-display text-[1.375rem] font-semibold leading-tight">{h.title}</h5>
            <p className="mt-2 text-small text-muted">{h.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The idea that ties the areas together, on asphalt like the hero board. The loop is a real sequence, so it has stops. */
function CoreIdea({ slug, idea }: { slug: string; idea: Flagship['idea'] }) {
  return (
    <div className="idea">
      <div>
        <h4 className="font-display text-[clamp(1.75rem,1.35rem+1.4vw,2.5rem)] font-semibold leading-[1.02]">
          {idea.lead}
        </h4>
        <p className="mt-4 max-w-measure text-white/[0.82]">{idea.body}</p>
      </div>
      <div>
        <p id={`${slug}-loop`} className="text-small font-semibold text-signal">
          {idea.loopLabel}
        </p>
        <ol className="idea-loop" aria-labelledby={`${slug}-loop`}>
          {idea.loop.map((step) => (
            <li key={step.name}>
              <span aria-hidden="true" className="idea-stop" />
              <span className="block font-display text-[1.25rem] font-semibold leading-none">{step.name}</span>
              <span className="mt-1.5 block text-fine text-white/[0.72]">{step.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

type Props = { project: Project; next?: Project }

/**
 * One project, readable top to bottom without a click: what it is, the problem, his part, the facts, the
 * highlights, the stack and the links. Screenshots (or ParkIT's diagram and demo) sit beside it on desktop
 * (sticky) and after "My part" on phones.
 *
 * The flagship gets more room, not more decoration: a marked header, a fuller overview, its feature areas across
 * the full width and the idea that connects them.
 */
export default function ProjectStop({ project: p, next }: Props) {
  const f = p.flagship
  const facts = [
    { label: 'Role', value: f?.roleDetail ?? p.role },
    ...(p.team ? [{ label: 'Team', value: p.team }] : []),
    ...(p.status ? [{ label: 'Status', value: p.status }] : []),
    { label: 'When', value: p.period },
  ]

  const links = (
    <>
      <Stack items={p.stack} className="mt-7" />
      {p.live || p.source ? (
        <div className="mt-6">
          <ProjectLinks name={p.name} live={p.live} source={p.source} />
        </div>
      ) : null}
    </>
  )

  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className={f ? 'stop stop-flagship' : 'stop'}>
      <header>
        {f ? <p className="flag-plate mb-4">{f.label} project</p> : null}
        <h3
          id={`${p.slug}-title`}
          className={`font-display font-semibold ${f ? 'text-flagship' : 'text-h3'}`}
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
          {p.problem ? (
            <>
              <h4 className="mt-6 font-semibold">Why it exists</h4>
              <p className="mt-1.5 max-w-measure">{p.problem}</p>
            </>
          ) : null}
          <h4 className="mt-6 font-semibold">My part</h4>
          <p className="mt-1.5 max-w-measure">{p.contribution}</p>
        </div>

        <div className="stop-stage">
          {p.demo ? (
            <Stage slug={p.slug} name={p.name} previewLabel="Pipeline" demoName={p.demo} preview={<Preview project={p} />} />
          ) : (
            <Preview project={p} />
          )}
        </div>

        {f ? null : (
          <div className="stop-rest">
            <h4 className="font-semibold">{p.highlightsTitle}</h4>
            <ul className="mt-3 space-y-4">
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
          <div className="-mt-6">{links}</div>
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
