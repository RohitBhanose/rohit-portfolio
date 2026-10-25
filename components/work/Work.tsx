import { archive, projects } from '@/content/projects'
import Section from '@/components/ui/Section'
import ExternalLink from '@/components/ui/ExternalLink'
import FeaturedProject from './FeaturedProject'
import ProjectEntry from './ProjectEntry'

export default function Work() {
  const [featured, ...rest] = projects

  return (
    <Section
      id="work"
      title="Work"
      intro="A restaurant operating system I co-founded, and 4 projects I led. Each one links to its live site and code where they’re public, and says why when they aren’t."
    >
      <div className="space-y-[clamp(4rem,3rem+4vw,7rem)]">
        <FeaturedProject project={featured} />
        {rest.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>

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
