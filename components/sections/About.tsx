import { spokenLanguages } from '@/content/skills'
import Section from '@/components/ui/Section'

const offTheClock: { name: string; detail?: string }[] = [
  { name: 'Music production', detail: 'FL Studio, BandLab and the harmonium' },
  { name: 'Gaming', detail: 'Counter-Strike 2 and Valorant' },
  { name: 'Chess' },
  { name: 'Formula 1' },
  { name: 'Cooking' },
]

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
        <div className="max-w-measure space-y-5 text-lead lg:col-span-7">
          <p>
            I’m a second-year CSE (AI &amp; Data Science) student at <span className="whitespace-nowrap">MIT-WPU</span>{' '}
            in Pune, also enrolled in IIT&nbsp;Madras’s online BS in Data Science and Applications, and a co-founder of{' '}
            <span translate="no">SwiftDineOS</span>.
          </p>
          <p>
            IndiaGuessr began as a semester-break project to learn full-stack development end to end. Before SwiftDineOS, I
            ran social media and Meta Ads campaigns at Aiera Mindlabs and interned at bizAmica.
          </p>
        </div>

        <div className="space-y-12 lg:col-span-4 lg:col-start-9">
          <div>
            <h3 className="border-b-2 border-ink pb-3 font-display text-[1.875rem] font-semibold leading-none">
              Off the clock
            </h3>
            <ul>
              {offTheClock.map((item) => (
                <li key={item.name} className="about-row">
                  <p className="font-semibold">{item.name}</p>
                  {item.detail ? <p className="text-small text-muted">{item.detail}</p> : null}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="border-b-2 border-ink pb-3 font-display text-[1.875rem] font-semibold leading-none">
              Languages
            </h3>
            <ul>
              {spokenLanguages.map((language) => (
                <li key={language.name} className="about-row about-row-split">
                  <span className="font-semibold">{language.name}</span>
                  {language.native ? (
                    <span lang={language.lang} className="text-muted">
                      {language.native}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
