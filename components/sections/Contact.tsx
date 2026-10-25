import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import ExternalLink from '@/components/ui/ExternalLink'
import ContactQr from '@/components/contact/ContactQr'
import CopyEmail from '@/components/contact/CopyEmail'

const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      intro="I’m open to internships in software engineering, AI/ML and data science. Email is the fastest way to reach me, for internships, collaborations or SwiftDineOS."
    >
      <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <a
            id="contact-email"
            href={`mailto:${site.email}`}
            className="link inline font-display text-[clamp(2rem,0.75rem+4.4vw,4.25rem)] font-semibold leading-[1.1]"
          >
            {/* Break after the @ if it has to wrap, never mid-word. */}
            {site.email.split('@')[0]}@<wbr />
            {site.email.split('@')[1]}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-primary">
              Email me
            </a>
            <CopyEmail email={site.email} targetId="contact-email" />
          </div>

          <ul className="mt-14 grid gap-x-8 border-t border-line sm:grid-cols-2">
            <li className="border-b border-line py-3">
              <a href={mailto('Internship enquiry')} className="link inline-flex min-h-11 items-center font-semibold">
                Internship enquiry
              </a>
              <p className="text-small text-muted">Opens an email with the subject filled in.</p>
            </li>
            <li className="border-b border-line py-3">
              <a href={mailto('SwiftDineOS partnership')} className="link inline-flex min-h-11 items-center font-semibold">
                SwiftDineOS for your restaurant
              </a>
              <p className="text-small text-muted">Or see the product at swiftdineos.in.</p>
            </li>
            <li className="border-b border-line py-3">
              <ExternalLink href={site.social.linkedin} className="link inline-flex min-h-11 items-center font-semibold">
                LinkedIn
              </ExternalLink>
              <p className="text-small text-muted" translate="no">
                in/rohit-bhanose
              </p>
            </li>
            <li className="border-b border-line py-3">
              <ExternalLink href={site.social.github} className="link inline-flex min-h-11 items-center font-semibold">
                GitHub
              </ExternalLink>
              <p className="text-small text-muted" translate="no">
                RohitBhanose
              </p>
            </li>
          </ul>
        </div>

        <figure className="lg:col-span-3 lg:col-start-10">
          <div className="hidden max-w-[15rem] rounded-plate bg-white p-2 shadow-[inset_0_0_0_1px_rgb(var(--line))] lg:block">
            <ContactQr />
          </div>
          <figcaption className="text-small text-muted lg:mt-4">
            <p className="hidden lg:block">Scan with your phone to save my contact card.</p>
            <a href="/contact.vcf" download="Rohit-Bhanose.vcf" className="link inline-flex min-h-11 items-center font-semibold text-ink">
              Download contact card (.vcf)
            </a>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
