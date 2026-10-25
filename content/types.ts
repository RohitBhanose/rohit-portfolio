export type ExternalLink = { href: string; label: string }

/** A link that does not exist publicly, with the reason shown instead of a dead button. */
export type UnavailableLink = { unavailable: string }

export type MaybeLink = ExternalLink | UnavailableLink

export const isAvailable = (link: MaybeLink): link is ExternalLink => 'href' in link

export const projectSlugs = ['swiftdineos', 'levelup', 'parkit', 'indiaguessr', 'leftovera'] as const
export type ProjectSlug = (typeof projectSlugs)[number]

/** Anything a skill can point at: a project, an archived project or a role. */
export type SkillRef = ProjectSlug | 'student-manager' | 'aiera' | 'bizamica'

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

export type Project = {
  slug: ProjectSlug
  name: string
  period: string
  role: string
  /** Where the project meets the physical world; shown in the hero index. */
  place: string
  /** One-line value proposition. */
  tagline: string
  summary: string
  /** Why it exists. Omit when the tagline and summary already say it. */
  problem?: string
  contribution: string
  highlights: Highlight[]
  /** Product modules, as named on the public site. */
  modules?: string[]
  stack: string[]
  live: MaybeLink
  source: MaybeLink
  /** The first landscape shot leads; a portrait shot becomes the phone inset, a second landscape one the detail inset. */
  shots: Shot[]
  /** `src` of the shot shown in the hero plate. Projects without one show their diagram. */
  heroShot?: string
  /** Hero caption when the project has no screenshot. */
  heroCaption?: string
  /** Rendered as an inline diagram instead of a screenshot. */
  diagram?: 'parkit'
}

export type Role = {
  org: string
  orgHref?: string
  orgNote?: string
  title: string
  type: string
  period: string
  location: string
  points: string[]
}

export type SkillGroup = {
  name: string
  skills: { name: string; usedIn?: SkillRef[] }[]
  /** Render the whole group as one line, e.g. tools that all come from one role. */
  compact?: boolean
}
