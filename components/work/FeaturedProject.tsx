import type { Project } from '@/content/types'
import Plate from '@/components/ui/Plate'
import Highlights from './Highlights'
import ProjectLinks from './ProjectLinks'
import Stack from './Stack'

export default function FeaturedProject({ project }: { project: Project }) {
  const main = project.shots.find((s) => s.width > s.height) ?? project.shots[0]
  const phone = project.shots.find((s) => s.height > s.width)

  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`}>
      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-small font-semibold text-muted">
            {project.role}, {project.period}
          </p>
          <h3 id={`${project.slug}-title`} className="mt-3 font-display text-h3 font-semibold" translate="no">
            {project.name}
          </h3>
          <p className="mt-4 max-w-[24ch] text-deck font-medium">{project.tagline}</p>
          <p className="mt-5 max-w-measure text-muted">{project.summary}</p>
          <div className="mt-8">
            <ProjectLinks name={project.name} live={project.live} source={project.source} />
          </div>
        </div>

        <div className="relative lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-7 lg:self-start">
          <Plate shot={main} sizes="(min-width: 1248px) 710px, (min-width: 1024px) 57vw, 100vw" priority={false} />
          {phone ? (
            <Plate
              shot={phone}
              sizes="(min-width: 1024px) 160px, 22vw"
              caption={false}
              className="phone-inset absolute bottom-10 right-3 hidden w-[22%] sm:block"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h4 className="font-semibold">Why it exists</h4>
          <p className="mt-2">{project.problem}</p>
        </div>
        <div className="lg:col-span-4">
          <h4 className="font-semibold">My part</h4>
          <p className="mt-2">{project.contribution}</p>
        </div>
        {project.modules ? (
          <div className="md:col-span-2 lg:col-span-4">
            <h4 className="font-semibold">What’s in it</h4>
            <ul className="mt-2 grid grid-cols-2 gap-x-6">
              {project.modules.map((m) => (
                <li key={m} className="border-b border-line py-2 text-small">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-14">
        <Highlights items={project.highlights} />
      </div>

      <Stack items={project.stack} className="mt-10" />
    </article>
  )
}
