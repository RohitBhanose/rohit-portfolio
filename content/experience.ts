import type { EntryId, ProjectSlug } from './types'
import { screening } from './screening'

export type EntryKind = 'role' | 'study'

export type Entry = {
  id: EntryId
  kind: EntryKind
  title: string
  org: { name: string; href?: string }
  period: string
  where?: string
  points: string[]
  /** Tools used in the role, shown as one line. */
  tools?: string[]
  /** The project section that shows this work. */
  project?: ProjectSlug
}

/** Newest first, current role on top. Every point mirrors the résumé (bizAmica: kept as previously published). */
export const experience: Entry[] = [
  {
    id: 'role-swiftdineos',
    kind: 'role',
    title: 'Co-founder',
    org: { name: 'SwiftDineOS', href: 'https://www.swiftdineos.in/' },
    period: 'Jun 2026 – present',
    where: 'Self-employed · on-site, Pune',
    points: [
      'Co-founded SwiftDineOS, an AI-powered restaurant operating system; I drive product strategy and business development.',
      'Coordinate product development for QR ordering, real-time table management, CRM and analytics.',
    ],
    project: 'swiftdineos',
  },
  {
    id: 'role-levelup',
    kind: 'role',
    title: 'Lead developer',
    org: { name: 'LevelUp by SquadUp' },
    period: 'Sep 2026',
    where: 'Team project · event platform',
    points: ['Led development of the event’s registration, QR check-in, player dashboard and organiser portals.'],
    project: 'levelup',
  },
  {
    id: 'aiera',
    kind: 'role',
    title: 'Digital Marketing & Social Media Head',
    org: { name: 'Aiera Mindlabs', href: 'https://www.aiera-mindlabs.com/' },
    period: 'Nov 2025 – Apr 2026',
    where: 'Part-time · hybrid, Pune',
    points: [
      'Managed social media strategy and executed reach-focused Meta Ads campaigns.',
      'Generated 100,000+ impressions, strengthening brand visibility and audience reach.',
    ],
    tools: ['Meta Ads Manager', 'Meta Business Suite', 'Canva', 'Buffer'],
  },
  {
    id: 'bizamica',
    kind: 'role',
    title: 'Intern',
    org: { name: 'bizAmica Software', href: 'https://www.bizamica.com/' },
    period: 'May – Jun 2025',
    where: 'Pune',
    points: [
      'Trained deep learning models to extract information from documents and images.',
      'Contributed to FASTag application processing, insurance document verification and automated data sorting.',
    ],
  },
]

const { approved, classYear, cgpa } = screening

export const education: Entry[] = [
  {
    id: 'mitwpu',
    kind: 'study',
    title: 'B.Tech, Computer Science & Engineering (AI & Data Science)',
    org: { name: 'MIT World Peace University' },
    period: approved.classYear ? `Jul 2025 – ${classYear.mitwpu}` : 'Jul 2025 – present',
    where: 'On campus, Pune',
    points: ['Second-year student.', ...(approved.cgpa ? [`CGPA ${cgpa}.`] : [])],
  },
  {
    id: 'iitm',
    kind: 'study',
    title: 'BS in Data Science and Applications',
    org: { name: 'IIT Madras' },
    period: approved.classYear ? `Jul 2025 – ${classYear.iitm}` : 'Jul 2025 – present',
    where: 'Online',
    points: ['Foundation level: programming, mathematics and statistics coursework.'],
  },
]

export const kindLabel: Record<EntryKind, string> = { role: 'Role', study: 'Study' }
