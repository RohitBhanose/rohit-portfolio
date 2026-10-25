import { experience } from '@/content/experience'
import Section from '@/components/ui/Section'
import ExternalLink from '@/components/ui/ExternalLink'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="border-t border-line">
        {experience.map((role) => (
          <li key={role.org} className="grid gap-x-6 gap-y-3 border-b border-line py-9 lg:grid-cols-12">
            <div className="text-small text-muted lg:col-span-3">
              <p className="tabular font-semibold text-ink">{role.period}</p>
              <p className="mt-1">{role.type}</p>
              <p>{role.location}</p>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-display text-[2rem] font-semibold leading-[1.05]">
                {role.title},{' '}
                {role.orgHref ? (
                  <ExternalLink href={role.orgHref} className="link" iconSize="0.6em" newTabNote="describe">
                    <span translate="no">{role.org}</span>
                  </ExternalLink>
                ) : (
                  role.org
                )}
              </h3>
              {role.orgNote ? <p className="mt-2 text-small text-muted">{role.orgNote}</p> : null}
              <ul className="mt-5 max-w-measure space-y-2.5">
                {role.points.map((point) => (
                  <li key={point} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-[3px] before:w-2.5 before:rounded-full before:bg-signal">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
