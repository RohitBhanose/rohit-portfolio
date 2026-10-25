import { kindLabel, stops, type Stop } from '@/content/journey'
import { projects } from '@/content/projects'
import ExternalLink from '@/components/ui/ExternalLink'
import JourneyMap from './JourneyMap'
import Marker from './Marker'

const projectName = Object.fromEntries(projects.map((p) => [p.slug, p.name]))

function StopDetail({ stop }: { stop: Stop }) {
  return (
    <>
      <p className="m-swap flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="inline-flex items-center gap-2 font-semibold text-ink">
          <Marker kind={stop.kind} />
          {kindLabel[stop.kind]}
        </span>
        <span className="tabular">{stop.period}</span>
        {stop.where ? <span>{stop.where}</span> : null}
      </p>
      <h3 className="m-swap mt-3 font-display text-[2rem] font-semibold leading-[1.05]" style={{ '--i': 1 } as React.CSSProperties}>
        {stop.title}
        {stop.org ? (
          <>
            ,{' '}
            {/* "Opens in a new tab" is a description here, not part of the name, so the heading reads cleanly. */}
            {stop.org.href ? (
              <span translate="no">
                <ExternalLink href={stop.org.href} className="link" iconSize="0.6em" newTabNote="describe">
                  {stop.org.name}
                </ExternalLink>
              </span>
            ) : (
              <span translate="no">{stop.org.name}</span>
            )}
          </>
        ) : null}
      </h3>
      <ul className="m-swap mt-4 max-w-measure space-y-2" style={{ '--i': 2 } as React.CSSProperties}>
        {stop.points.map((point) => (
          <li key={point} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-[3px] before:w-2.5 before:rounded-full before:bg-signal">
            {point}
          </li>
        ))}
      </ul>
      {stop.project ? (
        <p className="m-swap mt-5" style={{ '--i': 3 } as React.CSSProperties}>
          <a href={`#${stop.project}`} className="link inline-flex min-h-11 items-center font-semibold">
            <span>
              Explore <span translate="no">{projectName[stop.project]}</span>
            </span>
          </a>
        </p>
      ) : null}
    </>
  )
}

/** Desktop: the route map (client). Phones and no-JS: the same journey as a vertical road of native disclosures. */
export default function Journey() {
  const legend = (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-small text-muted" aria-hidden="true">
      {(['study', 'role', 'launch'] as const).map((kind) => (
        <span key={kind} className="inline-flex items-center gap-2">
          <Marker kind={kind} />
          {kindLabel[kind]}
        </span>
      ))}
    </div>
  )

  return (
    <>
      <JourneyMap
        stops={stops.map(({ id, kind, date, label }) => ({ id, kind, date, label }))}
        details={stops.map((s) => <StopDetail key={s.id} stop={s} />)}
        legend={legend}
      />

      <ol className="journey-list">
        {stops.map((s) => (
          <li key={s.id} className="journey-item">
            <details>
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 py-3">
                <Marker kind={s.kind} />
                <span>
                  <span className="tabular block text-fine text-muted">{s.date}</span>
                  <span className="block font-semibold leading-tight">{s.label}</span>
                </span>
              </summary>
              <div className="pb-6 pl-9">
                <StopDetail stop={s} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  )
}
