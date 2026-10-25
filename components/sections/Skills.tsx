import { archive, projects } from '@/content/projects'
import { reference, skillGroups } from '@/content/skills'
import type { Project, SkillRef } from '@/content/types'
import Section from '@/components/ui/Section'
import SkillsExplorer, { type Evidence } from '@/components/skills/SkillsExplorer'

function thumbFor(project: Project) {
  const shot = project.shots.find((s) => s.src === project.heroShot) ?? project.shots[0]
  return shot ? `${shot.src}-${shot.widths[0]}.webp` : undefined
}

const details: Record<Exclude<SkillRef, Project['slug']>, string> = {
  'student-manager': archive[0].description,
  aiera: 'Digital Marketing & Social Media Head, Nov 2025 – Apr 2026',
  bizamica: 'Intern, May–Jun 2025',
}

function evidenceFor(ref: SkillRef): Evidence {
  const { label, anchor } = reference(ref)
  const project = projects.find((p) => p.slug === ref)
  return project
    ? { ref, label, anchor, detail: project.tagline, thumb: thumbFor(project) }
    : { ref, label, anchor, detail: details[ref as keyof typeof details] }
}

export default function Skills() {
  const refs = Array.from(new Set(skillGroups.flatMap((g) => g.skills.flatMap((s) => s.usedIn ?? []))))
  const evidence = Object.fromEntries(refs.map((r) => [r, evidenceFor(r)]))

  return (
    <Section id="skills" title="Skills" intro="Pick a skill to see the work behind it.">
      <SkillsExplorer groups={skillGroups} evidence={evidence} initial="Python" />
      {/* Without JavaScript the explorer can't switch, so list every skill with its evidence. */}
      <noscript>
        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.name}>
              <h3 className="border-b-2 border-ink pb-2 font-display text-[1.5rem] font-semibold">{g.name}</h3>
              <ul className="mt-2 space-y-1 text-small">
                {g.skills.map((s) => (
                  <li key={s.name}>
                    <span className="font-semibold">{s.name}</span>
                    {s.usedIn ? <span className="text-muted">: {s.usedIn.map((r) => reference(r).label).join(', ')}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </noscript>
    </Section>
  )
}
