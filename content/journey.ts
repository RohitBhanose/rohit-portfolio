import type { ProjectSlug } from './types'

export type StopKind = 'study' | 'role' | 'launch'

export type Stop = {
  id: string
  /** Short date shown on the route. */
  date: string
  kind: StopKind
  /** Short label on the route. */
  label: string
  /** Full title in the detail panel. */
  title: string
  org?: { name: string; href?: string }
  period: string
  where?: string
  points: string[]
  project?: ProjectSlug
}

export const kindLabel: Record<StopKind, string> = {
  study: 'Study',
  role: 'Role',
  launch: 'Project',
}

/** Chronological. Every entry mirrors content already on the résumé or verified from the repositories. */
export const stops: Stop[] = [
  {
    id: 'bizamica',
    date: 'May 2025',
    kind: 'role',
    label: 'Intern, bizAmica',
    title: 'Intern',
    org: { name: 'bizAmica Software', href: 'https://www.bizamica.com/' },
    period: 'May–Jun 2025',
    where: 'Pune',
    points: [
      'Trained deep learning models to extract information from documents and images.',
      'Contributed to FASTag application processing, insurance document verification and automated data sorting.',
    ],
  },
  {
    id: 'mitwpu',
    date: 'Jul 2025',
    kind: 'study',
    label: 'B.Tech, MIT-WPU',
    title: 'B.Tech, Computer Science & Engineering (AI & Data Science)',
    org: { name: 'MIT World Peace University' },
    period: 'Jul 2025 – Apr 2029',
    where: 'On campus, Pune',
    points: ['Second year.', 'CGPA 8.4.'],
  },
  {
    id: 'iitm',
    date: 'Jul 2025',
    kind: 'study',
    label: 'BS, IIT Madras',
    title: 'BS in Data Science and Applications',
    org: { name: 'IIT Madras' },
    period: 'Jul 2025 – May 2029',
    where: 'Online',
    points: ['Foundation level.', 'Programming, mathematics and statistics coursework.'],
  },
  {
    id: 'aiera',
    date: 'Nov 2025',
    kind: 'role',
    label: 'Marketing head, Aiera',
    title: 'Digital Marketing & Social Media Head',
    org: { name: 'Aiera Mindlabs', href: 'https://www.aiera-mindlabs.com/' },
    period: 'Nov 2025 – Apr 2026',
    where: 'Part-time, hybrid, Pune',
    points: [
      'Owned social media strategy and brand communication across Instagram and LinkedIn.',
      'Planned and ran reach-focused Meta Ads campaigns, generating 100,000+ impressions.',
      'Created posts, carousels and product-launch creatives for the company’s AI products.',
    ],
  },
  {
    id: 'leftovera',
    date: 'Jan 2026',
    kind: 'launch',
    label: 'Leftovera',
    title: 'Shipped Leftovera',
    period: 'Jan 2026',
    points: ['A directory that helps restaurants find NGOs that redistribute surplus food.'],
    project: 'leftovera',
  },
  {
    id: 'parkit',
    date: 'Feb 2026',
    kind: 'launch',
    label: 'ParkIT',
    title: 'Started ParkIT',
    period: 'Feb–Oct 2026',
    points: ['A camera-based parking system that reads number plates and bills automatically.'],
    project: 'parkit',
  },
  {
    id: 'indiaguessr',
    date: 'Jun 2026',
    kind: 'launch',
    label: 'IndiaGuessr',
    title: 'Shipped IndiaGuessr',
    period: 'Jun 2026',
    points: ['A GeoGuessr-style game built end to end during a semester break.'],
    project: 'indiaguessr',
  },
  {
    id: 'swiftdineos',
    date: 'Jun 2026',
    kind: 'role',
    label: 'Co-founder, SwiftDineOS',
    title: 'Co-founder',
    org: { name: 'SwiftDineOS', href: 'https://www.swiftdineos.in/' },
    period: 'Jun 2026 – present',
    where: 'Self-employed, on-site in Pune',
    points: [
      'Co-founded the company; drive product strategy and business development.',
      'Coordinate product development across QR ordering, real-time table management, CRM and analytics, and build hands-on across the Next.js and PostgreSQL platform.',
    ],
    project: 'swiftdineos',
  },
  {
    id: 'levelup',
    date: 'Sep 2026',
    kind: 'launch',
    label: 'LevelUp',
    title: 'Shipped LevelUp',
    period: 'Sep 2026',
    points: ['A gamified event platform with QR attendance, XP and evolving companions, built as lead developer.'],
    project: 'levelup',
  },
]
