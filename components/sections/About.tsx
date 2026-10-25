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
            I learn by building things people can use. IndiaGuessr started as a semester-break project to learn full-stack
            development end to end. LevelUp started with a brief to make signing up for an event feel like starting a game
            rather than filling in a form. SwiftDineOS exists because restaurants juggle a POS, a loyalty app and
            spreadsheets at once.
          </p>
          <p>
            The parts I enjoy most are the unglamorous ones: the database constraint that stops XP being awarded twice,
            the fallback for when a maps API fails. Running social media and Meta Ads campaigns at Aiera Mindlabs taught me
            the other half of the job: getting the work in front of people.
          </p>
          <p className="text-muted">
            I’m based in Pune, and I study at <span className="whitespace-nowrap">MIT-WPU</span> and, online, at
            IIT&nbsp;Madras.
          </p>
        </div>

        <div className="space-y-12 lg:col-span-4 lg:col-start-9">
          <div>
            <h3 className="border-b-2 border-ink pb-3 font-display text-[1.875rem] font-semibold leading-none">
              Off the clock
            </h3>
            <ul>
              {offTheClock.map((item) => (
                <li key={item.name} className="border-b border-line py-3">
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
                <li key={language.name} className="flex items-baseline justify-between border-b border-line py-3">
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
