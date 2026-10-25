export type ExternalLink = { href: string; label: string }

/** A link that does not exist publicly, with the reason shown instead of a dead button. */
export type UnavailableLink = { unavailable: string }

export type MaybeLink = ExternalLink | UnavailableLink

export const isAvailable = (link: MaybeLink): link is ExternalLink => 'href' in link

export const projectSlugs = ['swiftdineos', 'levelup', 'parkit', 'indiaguessr', 'leftovera'] as const
export type ProjectSlug = (typeof projectSlugs)[number]

/** Experience and education entries that skills can point at (their ids in content/experience.ts). */
export const entryIds = ['role-swiftdineos', 'role-levelup', 'aiera', 'bizamica', 'mitwpu', 'iitm'] as const
export type EntryId = (typeof entryIds)[number]

/** Anything a skill can point at: a project or an experience/education entry. */
export type SkillRef = ProjectSlug | EntryId

export type Shot = {
  /** Path without width suffix, e.g. `/work/leftovera-home` → `/work/leftovera-home-960.webp` */
  src: string
  /** Every width generated in public/work, smallest first. */
  widths: number[]
  /** Real size of the largest file. */
  width: number
  height: number
  alt: string
  caption: string
  /** A mostly-white capture, dimmed slightly in dark mode so it doesn't glare. */
  tone?: 'light'
}

export type Highlight = { title: string; body: string }

/** A 2.4:1 crop of an already-public screen, shown in the hero's route board (public/work/hero/<slug>-600|1200.webp). */
export type HeroCrop = { alt: string; caption: string; tone?: 'light' }

export type Project = {
  slug: ProjectSlug
  name: string
  period: string
  /** His role, as on the résumé. */
  role: string
  /** What the project is, in a few words (hero index, stop header). */
  kind: string
  /** Where the project meets the physical world; the stop's sign destination. */
  place: string
  /** Verified status only. Keep it true: it is shown beside the live link. */
  status: string
  /** A two-or-three-word version of `status` for the hero's route board. */
  statusShort: string
  /** Team context, only where known. Never a size or a share of the work unless confirmed. */
  team?: string
  /** One-line value proposition. */
  tagline: string
  summary: string
  /** Why it exists; shown under "More context". Omit when it would need unapproved detail. */
  problem?: string
  /** His part, always visible. */
  contribution: string
  /** Heading for the highlights: engineering decisions, or product highlights where internals are private. */
  highlightsTitle: string
  highlights: Highlight[]
  stack: string[]
  live: MaybeLink
  source: MaybeLink
  /** Shown beside the links when a live site has a known problem. */
  notice?: string
  shots: Shot[]
  /** Rendered as an inline diagram instead of a screenshot. */
  diagram?: 'parkit'
  /** The verb that names the interactive demo, shown before it is opened. */
  demo: string
  heroCrop?: HeroCrop
}

export type SkillItem = { name: string; usedIn: SkillRef[] }

export type SkillGroup = {
  name: string
  skills: SkillItem[]
  /** Listed on the résumé but with no work on this page to point at. */
  familiar?: string[]
}
