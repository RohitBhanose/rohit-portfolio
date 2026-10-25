# Project skills — provenance

Project-level Claude Code skills for this portfolio. Each folder was copied by hand from a
pinned upstream commit after reading every file; nothing here runs scripts, installs hooks,
or fetches instructions at runtime. To update a skill, diff the upstream folder at a newer
commit against the copy here and review the change before replacing it.

| Skill | Upstream | Commit | License | Changes made here |
| --- | --- | --- | --- | --- |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) `skills/frontend-design` | `dbd4588f9e1033efb41dad4bef2f7947c8993d44` | Apache-2.0 (`LICENSE.txt`) | None |
| `animate` | [emilkowalski/skills](https://github.com/emilkowalski/skills) `skills/animate` | `2d228630ba1446365f614a108cb8252f1feda202` | MIT (repo `LICENSE` copied in) | None |
| `animation-performance` | [emilkowalski/skills](https://github.com/emilkowalski/skills) `skills/animation-performance` | `2d228630ba1446365f614a108cb8252f1feda202` | MIT (repo `LICENSE` copied in) | None |
| `web-interface-guidelines` | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) `command.md` | `434b7f91364665f2f733b310ec54809bf8f37937` | MIT | Wrapped as a skill (frontmatter, `$ARGUMENTS` placeholder replaced). Three rules patched, see below. |
| `accessibility` | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) `skills/accessibility` | `afa8da942115f2961fdbfa80807ea0b232ff6c00` | MIT (repo `LICENSE` copied in) | Large-text contrast threshold corrected, see below. |
| `core-web-vitals` | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) `skills/core-web-vitals` | `afa8da942115f2961fdbfa80807ea0b232ff6c00` | MIT (repo `LICENSE` copied in) | `MEASUREMENT.md` and `RUM.md` copied in from the sibling `skills/performance/references/` and links repointed to `references/`. |

## Why these, and not others

- **Vendored, not fetched.** Vercel's official `web-design-guidelines` skill downloads its rules from an
  unpinned `main` branch on every run, so the same rules are pinned here instead.
- **Not installed:** `impeccable` (downloads and executes a native binary, installs session hooks,
  opt-out telemetry), `ui-ux-pro-max` (large bundled datasets and scripts, overlaps `frontend-design`),
  GSAP / Motion skills (this site uses CSS and WAAPI only — no animation library), and
  `review-animations` (manual-invocation only; `animate` already carries its standards).

## Local patches (re-apply after any upstream update)

- `accessibility/SKILL.md` contrast table: upstream says large text is "≥ 18px / ≥ 14px bold". WCAG 1.4.3
  means **18pt (≈ 24px) / 14pt bold (≈ 18.66px)**; corrected so 3:1 isn't wrongly accepted on 18–23px text.
- `web-interface-guidelines/SKILL.md`:
  - "Title Case for headings/buttons" → **sentence case** (matches `frontend-design` and this site).
  - "Interactive elements need keyboard handlers" → limited to **custom** controls; adding key handlers to
    native `<button>`/`<a>` double-fires (the `accessibility` skill agrees).
  - "`autocomplete="off"` on non-auth fields" → limited to fields where autofill is wrong; personal-data
    fields keep their purpose tokens (WCAG 1.3.5).

## Known caveats (not patched)

- `accessibility` suggests a global `animation-duration: 0.01ms` reduced-motion kill switch. This site
  follows `animate` instead: reduced motion is **gentler, not zero** — movement is removed per component,
  short opacity fades stay.
- `core-web-vitals` Next.js snippets assume a server (getServerSideProps, edge runtime, next/image
  optimisation). This site is a static export: images are pre-sized WebP with explicit dimensions.
- `animate` says Motion's `x`/`y` shorthands are not hardware-accelerated; Motion's own docs disagree.
  Irrelevant here (no Motion), noted for future changes.
