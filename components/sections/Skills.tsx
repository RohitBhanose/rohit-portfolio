import { Fragment } from 'react'
import { reference, skillGroups } from '@/content/skills'
import Section from '@/components/ui/Section'

/** A static index: every skill with the work that used it, readable without a tap, hover or off-screen panel. */
export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="Every skill links to the project or role where I used it.">
      <div className="skills-index">
        {skillGroups.map((group) => (
          <section key={group.name} aria-labelledby={`skills-${group.name.replace(/\W+/g, '-').toLowerCase()}`}>
            <h3
              id={`skills-${group.name.replace(/\W+/g, '-').toLowerCase()}`}
              className="border-b-2 border-ink pb-2 font-display text-[1.5rem] font-semibold leading-none"
            >
              {group.name}
            </h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill.name} className="skill-row">
                  <span className="font-semibold" translate="no">
                    {skill.name}
                  </span>
                  <span className="skill-used">
                    <span className="sr-only">used in </span>
                    {skill.usedIn.map((ref, i) => {
                      const { label, anchor } = reference(ref)
                      return (
                        <Fragment key={ref}>
                          {i > 0 ? <span aria-hidden="true">, </span> : null}
                          <a href={anchor} className="skill-link" translate="no">
                            {label}
                          </a>
                        </Fragment>
                      )
                    })}
                  </span>
                </li>
              ))}
            </ul>
            {group.familiar ? (
              <p className="mt-3 text-small text-muted">
                Also familiar with: <span translate="no">{group.familiar.join(', ')}</span>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </Section>
  )
}
