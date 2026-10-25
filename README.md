# rohit-portfolio

The personal site of Rohit Bhanose: a single page that leads with real, linked work.

Built with Next.js 14 (App Router, static export), React 18, TypeScript and Tailwind CSS. No animation or UI
libraries: motion is CSS. The page ships about 3 kB (gzip) of its own JavaScript on top of the React runtime
(about 91 kB first load). Each project demo is a separate 2–3.5 kB chunk, fetched only when a visitor opens it.

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
| `content/site.ts` | Name, positioning line, availability, links, title, description, nav |
| `content/screening.ts` | Class year and CGPA, with their approval switches (server-only, so unapproved values never ship) |
| `content/projects.ts` | The five featured projects: status, role, team, contribution, highlights, stack, links, screenshots, demo name, hero crop. SwiftDineOS also has a `flagship` block (role line, feature-area intro, core idea), and its `highlights` render as the six numbered feature areas |
| `content/experience.ts` | Roles and education, newest first |
| `content/skills.ts` | Skill groups, each skill pointing at the project or role where it was used |
| `content/vcard.ts` | The contact card behind the QR code and `/contact.vcf` |

Rules the content follows: every claim traces to the résumé, a public repository or a public page. Private codebases
are described at the level of the résumé and their public sites only. A link that doesn't exist publicly is written as
`{ unavailable: 'Private repository' }` and renders as plain text with the reason. Status lines must stay true: update
them (and `notice`) when a live site changes. No percentages, ratings or unverified numbers.

**Screening facts:** class year and CGPA appear only when `screening.approved` (content/screening.ts) allows them.

**Adding a project:** add its slug to `projectSlugs` in `content/types.ts`, then the entry to `content/projects.ts`.
For the hero board, add a 2.4:1 crop of a public screen as `public/work/hero/<slug>-600.webp` and `-1200.webp`.

**Résumé:** replace `public/resume.pdf`. The download size shown in the hero is read at build time.

**Screenshots:** WebP files in `public/work/`, named `<name>-<width>.webp`. Desktop captures are 640, 960 and
1600 px wide (16:10); phone captures are 320, 520 and 780 px wide (portrait). List the generated widths in the
shot's `widths` array and set `width`/`height` to the largest file's real size. Mark mostly-white captures with
`tone: 'light'` so they're dimmed in dark mode.

**Site URL:** canonical and social-preview URLs default to `https://rohitbhanose.vercel.app`. On another domain,
set `NEXT_PUBLIC_SITE_URL` at build time and update the domain in `public/robots.txt` and `public/sitemap.xml`.

## How it's built

```
app/            layout (font preloads, metadata, structured data, head script), page, 404, /contact.vcf
components/
  site/         Header (RB plate, active-section indicator, mobile <dialog> menu), ThemeToggle, Footer,
                RevealObserver
  hero/         Hero (name, positioning, facts sign, actions) and RouteBoard (project links + passive preview)
  work/         Work, ProjectStop (one evidence-first section per project), StripMap (sticky desktop index),
                Stage (screenshots or the lazy demo), Gallery, ParkitDiagram, ProjectLinks, Stack
  demos/        One self-contained, lazy-loaded demo per project, each labelled as a simulation
  sections/     Experience (road-spine timeline), Skills (static index), About, Contact
  contact/      CopyEmail, ContactQr (encoded at build time, no client JS)
  ui/           Section, Plate, Marker, ExternalLink
content/        all copy and data
public/fonts/   self-hosted Barlow (SIL Open Font License, see OFL.txt)
.claude/skills/ project-level Claude Code skills (see .claude/skills/SOURCES.md)
```

- **Design system:** tokens in `app/globals.css` (light and dark), exposed to Tailwind in `tailwind.config.ts`.
  Yellow has three jobs: the primary action, "you are here", and signage on asphalt. Selected states on the page
  background use `--mark` (ink in light, yellow in dark) so they stay at 3:1 or better. One marker vocabulary
  (`components/ui/Marker.tsx`): diamond = project, ring = role, circle = study.
- **Everything readable without a click:** project sections are plain anchors (`#swiftdineos` …), experience and
  skills are static. Only "Why it exists" is folded away (native `<details>`).
- **Fonts** are self-hosted latin subsets with explicit preloads. Body text uses `font-display: optional` (no
  layout shift); headings use `swap`. `vercel.json` caches `/fonts` as immutable, so rename a font file if it ever
  changes.
- **Motion:** tokens in `app/globals.css`. Nothing on load hides or delays text; the only load moment is the route
  board's lane drawing in. `prefers-reduced-motion` removes movement. Smooth scrolling starts after load, so deep
  links open in place.
- **Resilience:** the head script adds `.js` before paint and removes it if a page script fails to load, so content
  hidden for the interactive layout comes back. With JavaScript off, everything is readable.
- **Demos** load only when a visitor opens "Try it" (`React.lazy`), can be retried if a chunk fails, use sample data,
  say so on screen, and never call a network service.
- **Images** are pre-sized WebP with explicit dimensions and `srcset` (a static export has no image optimiser). Set
  `sizes` before `srcSet` before `src` on client-rendered images, or the browser downloads twice.

## Deploy

`npm run build` writes a fully static site to `./out`.

- **Vercel** (where rohitbhanose.vercel.app is hosted): import the repository; the defaults detect Next.js and
  the static export. No environment variables are required. `vercel.json` adds cache and security headers.
- **Cloudflare Pages:** `npm run build && npm run deploy:pages` publishes `./out` with `wrangler pages deploy`.
  `wrangler.jsonc` is only used for `npx wrangler deploy`.
- **Any static host:** upload the contents of `./out`.

## Known quirk

Next 14's metadata loaders break on project paths that contain an apostrophe (this folder is
`Rohit's Portfolio`). That's why `robots.txt`, `sitemap.xml`, the favicon and the social image are plain files in
`public/` instead of `app/robots.ts`-style conventions. If the folder is renamed, either approach works.
