import { archive, projects } from '@/content/projects'
import Section from '@/components/ui/Section'
import ExternalLink from '@/components/ui/ExternalLink'
import ParkitDiagram from './ParkitDiagram'
import ProjectExplorer from './ProjectExplorer'
import ProjectPanel from './ProjectPanel'

export default function Work() {
  return (
    <Section
      id="work"
      title="Work"
      intro="A restaurant operating system I co-founded, and 4 projects I led. Each has screenshots, the engineering behind it, and a small interactive version to try."
    >
      <ProjectExplorer
        tabs={projects.map(({ slug, name, place }) => ({ slug, name, place }))}
        panels={projects.map((p) => (
          <ProjectPanel key={p.slug} project={p} diagram={p.slug === 'parkit' ? <ParkitDiagram /> : undefined} />
        ))}
      />

      <div className="mt-[clamp(4rem,3rem+4vw,7rem)] border-t border-line pt-10">
        <h3 className="font-display text-[2rem] font-semibold leading-none">Earlier</h3>
        <ul className="mt-6 divide-y divide-line">
          {archive.map((item) => (
            <li key={item.slug} id={item.slug} className="grid gap-2 py-5 md:grid-cols-12 md:gap-6">
              <p className="font-semibold md:col-span-3">
                <span translate="no">{item.name}</span> <span className="font-normal text-muted">{item.period}</span>
              </p>
              <p className="md:col-span-5">{item.description}</p>
              <p className="text-small text-muted md:col-span-2" translate="no">
                {item.stack.join(', ')}
              </p>
              <p className="md:col-span-2 md:text-right">
                <ExternalLink href={item.source.href} className="link inline-flex min-h-11 items-center text-small font-semibold">
                  Source code<span className="sr-only"> for {item.name}</span>
                </ExternalLink>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
