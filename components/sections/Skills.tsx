import { Fragment } from 'react'
import { reference, skillGroups } from '@/content/skills'
import type { SkillRef } from '@/content/types'
import Section from '@/components/ui/Section'

function References({ refs }: { refs: SkillRef[] }) {
  return (
    <span className="text-small text-muted">
      {refs.map((ref, i) => {
        const { label, anchor } = reference(ref)
        return (
          <Fragment key={ref}>
            {i > 0 ? ', ' : null}
            <a href={anchor} translate="no" className="skill-ref">
              {label}
            </a>
          </Fragment>
        )
      })}
    </span>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="Each skill links to the work where I used it. The rest of each group I’ve used in coursework or elsewhere."
    >
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const linked = group.skills.filter((s) => s.usedIn)
          const other = group.skills.filter((s) => !s.usedIn)
          return (
            <div key={group.name}>
              <h3 className="border-b-2 border-ink pb-3 font-display text-[1.875rem] font-semibold leading-none">
                {group.name}
              </h3>
              <ul>
                {group.compact ? (
                  <li className="border-b border-line py-3">
                    <span className="font-semibold" translate="no">
                      {group.skills.map((s) => s.name).join(', ')}
                    </span>
                    <span className="block">
                      <References refs={Array.from(new Set(group.skills.flatMap((s) => s.usedIn ?? [])))} />
                    </span>
                  </li>
                ) : (
                  <>
                    {linked.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3"
                      >
                        <span className="font-semibold" translate="no">
                          {skill.name}
                        </span>
                        <References refs={skill.usedIn ?? []} />
                      </li>
                    ))}
                    {other.length > 0 ? (
                      <li className="border-b border-line py-3 text-small text-muted">
                        Also{' '}
                        <span className="text-ink" translate="no">
                          {other.map((s) => s.name).join(', ')}
                        </span>
                      </li>
                    ) : null}
                  </>
                )}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
