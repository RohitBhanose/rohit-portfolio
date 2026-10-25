import { projects } from '@/content/projects'
import Section from '@/components/ui/Section'
import ProjectStop from './ProjectStop'
import StripMap from './StripMap'

export default function Work() {
  return (
    <Section
      id="work"
      title="Work"
      intro="My flagship is SwiftDineOS, the restaurant operating system I co-founded. After it come four projects where I was lead developer: an event platform, computer vision, a Street View game and an NGO directory."
    >
      <StripMap stops={projects.map(({ slug, name }) => ({ slug, name }))} />
      <ol className="stops">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <ProjectStop project={project} next={projects[i + 1]} />
          </li>
        ))}
      </ol>
    </Section>
  )
}
