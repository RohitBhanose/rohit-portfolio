import { education } from '@/content/experience'
import Section from '@/components/ui/Section'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="grid gap-x-6 gap-y-10 border-t border-line pt-9 md:grid-cols-2">
        {education.map((item) => (
          <li key={item.institution}>
            <p className="tabular text-small font-semibold text-muted">{item.period}</p>
            <h3 className="mt-3 font-display text-[2.25rem] font-semibold leading-none">{item.institution}</h3>
            <p className="mt-3 text-lead">{item.program}</p>
            <p className="mt-2 text-small text-muted">
              {item.mode === 'Online' ? 'Online' : `${item.mode}, ${item.place}`}. {item.detail}.
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
