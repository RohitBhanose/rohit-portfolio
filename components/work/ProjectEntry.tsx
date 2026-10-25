import type { Project } from '@/content/types'
import Plate from '@/components/ui/Plate'
import Highlights from './Highlights'
import ParkitDiagram from './ParkitDiagram'
import ProjectLinks from './ProjectLinks'
import Stack from './Stack'

/**
 * Grid order is header → media → details, so phones see the product right after the summary.
 * On desktop the media spans two rows beside the header and details, and stays in view while they scroll.
 * The sticky region has its own grid: a sticky grid item is held within its whole container, so sharing
 * the article's grid let the plate slide over the highlights below (hiding focused links).
 */
export default function ProjectEntry({ project }: { project: Project }) {
  const [main, detail] = project.shots.filter((s) => s.width > s.height)

  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="space-y-12 border-t border-line pt-[clamp(3rem,2rem+3vw,5rem)]"
    >
      <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-y-8">
        <div className="lg:col-span-5">
          <p className="text-small font-semibold text-muted">
            {project.role}, {project.period}
          </p>
          <h3 id={`${project.slug}-title`} className="mt-3 font-display text-h3 font-semibold" translate="no">
            {project.name}
          </h3>
          <p className="mt-4 max-w-[26ch] text-deck font-medium">{project.tagline}</p>
          <p className="mt-5 max-w-measure text-muted">{project.summary}</p>
          <div className="mt-6">
            <ProjectLinks name={project.name} live={project.live} source={project.source} />
          </div>
        </div>

        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-7 lg:row-span-2 lg:self-start">
          {project.diagram === 'parkit' ? (
            <ParkitDiagram />
          ) : main ? (
            <div className="relative">
              <Plate shot={main} sizes="(min-width: 1248px) 710px, (min-width: 1024px) 57vw, 100vw" />
              {detail ? (
                <Plate
                  shot={detail}
                  sizes="(min-width: 1024px) 290px, 40vw"
                  caption={false}
                  className="detail-inset absolute bottom-10 right-3 hidden w-[40%] sm:block"
                />
              ) : null}
            </div>
          ) : null}
        </div>

        <dl className="space-y-6 lg:col-span-5">
          {project.problem ? (
            <div>
              <dt className="font-semibold">Why it exists</dt>
              <dd className="mt-1.5">{project.problem}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-semibold">My part</dt>
            <dd className="mt-1.5">{project.contribution}</dd>
          </div>
        </dl>
      </div>

      <Highlights items={project.highlights} />

      <Stack items={project.stack} />
    </article>
  )
}
