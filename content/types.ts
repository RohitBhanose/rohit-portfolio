/** `label` is the address shown under the link; `cta` overrides the link text (e.g. "Visit the event site"). */
export type ExternalLink = { href: string; label: string; cta?: string }

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

/** Extra editorial depth for the one flagship project. Its `highlights` are its feature areas. */
export type Flagship = {
  /** Shown on the flagship marker in the hero and the project header. */
  label: string
  /** The facts strip's role line; `role` stays short for the hero board. */
  roleDetail: string
  /** One line under the feature areas' heading. */
  areasIntro: string
  /** The product idea that ties the areas together, framed as how the platform is designed. */
  idea: {
    lead: string
    body: string
    loopLabel: string
    loop: { name: string; detail: string }[]
  }
}

/** A 2.4:1 crop of an already-public screen, shown in the hero's route board (public/work/hero/<slug>-600|1200.webp). */
export type HeroCrop = { alt: string; caption: string; tone?: 'light' }

export type Project = {
  slug: ProjectSlug
  name: string
  period: string
  /** His role, as on the résumé. */
  role: string
  /** What the project is, in a few words (hero route board). */
  kind: string
  /** A verified, positive status (e.g. where it is live). Omit it rather than guess or list a limitation. */
  status?: string
  /** Team context, only where known. Never a size or a share of the work unless confirmed. */
  team?: string
  /** One-line value proposition. */
  tagline: string
  summary: string
  /** The problem it addresses, shown above "My part". Omit when it would need unapproved detail. */
  problem?: string
  /** His part, always visible. */
  contribution: string
  /** Heading for the highlights: engineering decisions, or product highlights where internals are private. */
  highlightsTitle: string
  highlights: Highlight[]
  stack: string[]
  /** Only links that are public and verified to work; a missing one is simply not shown. */
  live?: ExternalLink
  source?: ExternalLink
  shots: Shot[]
  /** Rendered as an inline diagram instead of a screenshot. */
  diagram?: 'parkit'
  /** Names the interactive demo, for the one project that has one (it needs a loader in components/work/Stage.tsx). */
  demo?: string
  heroCrop?: HeroCrop
  flagship?: Flagship
}

export type SkillItem = { name: string; usedIn: SkillRef[] }

export type SkillGroup = {
  name: string
  skills: SkillItem[]
  /** Listed on the résumé but with no work on this page to point at. */
  familiar?: string[]
}
