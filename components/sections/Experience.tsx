import { education, experience, kindLabel, type Entry } from '@/content/experience'
import { projects } from '@/content/projects'
import Section from '@/components/ui/Section'
import Marker from '@/components/ui/Marker'
import ExternalLink from '@/components/ui/ExternalLink'

function Timeline({ title, entries }: { title: string; entries: Entry[] }) {
  return (
    <div>
      <h3 className="font-display text-[1.75rem] font-semibold leading-none">{title}</h3>
      <ol className="timeline mt-6">
        {entries.map((e) => {
          const project = e.project ? projects.find((p) => p.slug === e.project) : undefined
          return (
            <li key={e.id} id={e.id} className="timeline-item">
              <Marker kind={e.kind} className="timeline-marker" />
              <p className="flex flex-wrap gap-x-4 text-small">
                <span className="tabular font-semibold">
                  <span className="sr-only">{kindLabel[e.kind]}, </span>
                  {e.period}
                </span>
                {e.where ? (
                  <span className="text-muted">
                    <span className="sr-only">, </span>
                    {e.where}
                  </span>
                ) : null}
              </p>
              <h4 className="mt-1 text-[1.25rem] font-semibold leading-snug">
                {e.title},{' '}
                {/* "Opens in a new tab" is a description here, not part of the heading's name. */}
                {e.org.href ? (
                  <span translate="no">
                    <ExternalLink href={e.org.href} className="link" iconSize="0.8em" newTabNote="describe">
                      {e.org.name}
                    </ExternalLink>
                  </span>
                ) : (
                  <span translate="no">{e.org.name}</span>
                )}
              </h4>
              <ul className="mt-2 max-w-measure space-y-1.5">
                {e.points.map((point) => (
                  <li key={point} className="bullet">
                    {point}
                  </li>
                ))}
              </ul>
              {e.tools ? (
                <p className="mt-2 text-small text-muted">
                  <span className="font-semibold text-ink">Tools</span> {e.tools.join(', ')}
                </p>
              ) : null}
              {project ? (
                <p className="mt-1">
                  <a href={`#${project.slug}`} className="link inline-flex min-h-11 items-center text-small font-semibold">
                    <span>
                      See the project: <span translate="no">{project.name}</span>
                    </span>
                  </a>
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience and education"
      intro="Co-founder of SwiftDineOS since June 2026, studying CSE (AI & Data Science) at MIT-WPU and data science online at IIT Madras."
    >
      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Timeline title="Experience" entries={experience} />
        </div>
        <div className="lg:col-span-5">
          <Timeline title="Education" entries={education} />
        </div>
      </div>
    </Section>
  )
}
