# rohit-portfolio

The personal site of Rohit Bhanose: a single page that leads with real, linked work.

Built with Next.js 14 (App Router, static export), React 18, TypeScript and Tailwind CSS. No animation or UI
libraries: motion is CSS and the Web Animations API. The page ships about 7 kB (gzip) of its own JavaScript on top
of the React runtime.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Before pushing:

```bash
npm run check        # lint + type-check + production build
npm run preview      # serve the built ./out folder locally
```

## Edit the content

Everything on the page comes from typed files in [`content/`](content/). Change these, not the components.

| File | What it holds |
| --- | --- |
| `content/site.ts` | Name, email, social links, résumé path, page title and description, nav |
| `content/projects.ts` | Projects: tagline, problem, your part, highlights, stack, links, screenshots, hero place and shot |
| `content/experience.ts` | Roles and education |
| `content/skills.ts` | Skill groups, each pointing at the work where the skill was used |
| `content/vcard.ts` | The contact card behind the QR code and `/contact.vcf` |

Rules the content follows: every claim traces to the résumé, a public repository, the live site or (for private
codebases) the git history. A link that doesn't exist publicly is written as `{ unavailable: 'Private repository' }`
and renders as plain text with the reason, never as a dead button. Project slugs are typed, so a skill pointing at
a project that doesn't exist fails the type-check.

**Adding a project:** add its slug to `projectSlugs` in `content/types.ts`, then add the entry to
`content/projects.ts` with a `place` (shown in the hero) and a `heroShot` (or a `heroCaption` if it has no
screenshot).

**Résumé:** replace `public/resume.pdf`. The download size shown in the hero is read at build time.

**Screenshots:** WebP files in `public/work/`, named `<name>-<width>.webp`. Desktop captures are 640, 960 and
1600 px wide (16:10); phone captures are 320, 520 and 780 px wide (portrait). List the generated widths in the
shot's `widths` array and set `width`/`height` to the largest file's real size. Mark mostly-white captures with
`tone: 'light'` so they're dimmed in dark mode.

**Site URL:** canonical and social-preview URLs default to `https://rohitbhanose.vercel.app`. On another domain,
set `NEXT_PUBLIC_SITE_URL` at build time and update the domain in `public/robots.txt` and `public/sitemap.xml`.

## How it's built

```
app/            layout (font preloads, metadata, theme bootstrap), page, 404, /contact.vcf
components/
  site/         Header (scroll state, active-section indicator, mobile <dialog> menu), ThemeToggle,
                Footer, RevealObserver (one shared IntersectionObserver)
  hero/         Hero, ProjectIndex (hover/focus swaps the screenshot plate)
  work/         FeaturedProject, ProjectEntry, ParkitDiagram, Highlights, ProjectLinks, Stack
  sections/     Experience, Skills, Education, About, Contact
  contact/      CopyEmail, ContactQr (encoded at build time, no client JS)
  ui/           Section, Plate, ExternalLink
content/        all copy and data
public/fonts/   self-hosted Barlow (SIL Open Font License, see OFL.txt)
.claude/skills/ project-level Claude Code skills (see .claude/skills/SOURCES.md)
```

- **Design tokens** live in `app/globals.css` as CSS variables (light and dark), exposed to Tailwind in
  `tailwind.config.ts`. Theme follows the system until the visitor picks one; an inline script applies the choice
  before first paint.
- **Fonts** are self-hosted latin subsets with explicit preloads. Body text uses `font-display: optional` (no
  mid-view swap, so no layout shift); headings use `swap`. `next/font` isn't used because Next 14 emits no font
  preloads when the site is built on Windows.
- **Motion** uses the easing tokens `--ease-out`, `--ease-in-out` and `--ease-drawer`. One orchestrated load
  sequence in the hero; elsewhere motion only explains something (the ParkIT pipeline, screenshot reveals) or
  answers an action. `prefers-reduced-motion` removes movement and keeps short fades. Content is never hidden if
  JavaScript fails.
- **Images** are pre-sized WebP with explicit dimensions and `srcset` (a static export has no image optimiser).

## Deploy

`npm run build` writes a fully static site to `./out`.

- **Vercel** (where rohitbhanose.vercel.app is hosted): import the repository; the defaults detect Next.js and
  the static export. No environment variables are required.
- **Cloudflare Pages:** `npm run build && npm run deploy:pages` publishes `./out` to the Pages project
  `rohit-portfolio` with `wrangler pages deploy` (wrangler is fetched by `npx`). `wrangler.jsonc` is a separate
  Workers static-assets config; it's only used if you deploy with `npx wrangler deploy` instead.
- **Any static host:** upload the contents of `./out`.

## Before the next résumé export

The downloadable `public/resume.pdf` still contains a few things the site deliberately leaves out or that no
longer resolve:

- "boosting restaurant revenue by up to 40%" and "XGBoost" under SwiftDineOS (no source in the codebase or on the
  public site)
- ParkIT "detect vehicles": the code detects and reads number plates
- IIT Madras heading "BS in Data Science and Programming" (the programme is Data Science and Applications)
- Dead links: ParkIT "Website" (parkitsystem.vercel.app, 404), LevelUp "Github" (private repo, 404) and an
  accidental `http://b.tech/` autolink on "BTech"

## Known quirk

Next 14's metadata loaders break on project paths that contain an apostrophe (this folder is
`Rohit's Portfolio`). That's why `robots.txt`, `sitemap.xml`, the favicon and the social image are plain files in
`public/` instead of `app/robots.ts`-style conventions. If the folder is renamed, either approach works.
