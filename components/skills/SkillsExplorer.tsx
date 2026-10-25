'use client'

import { useMemo, useRef, useState } from 'react'
import type { SkillGroup, SkillRef } from '@/content/types'

export type Evidence = { ref: SkillRef; label: string; anchor: string; detail: string; thumb?: string }

type Props = {
  groups: SkillGroup[]
  /** Label, anchor, one-line detail and optional thumbnail for every reference, resolved on the server. */
  evidence: Record<string, Evidence>
  initial: string
}

type Flat = { name: string; group: string; usedIn: SkillRef[] }

/** Roving-tabindex radio group: one Tab stop, arrows move and select. */
function useRoving(count: number, current: number, onChange: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = current
    if (e.key in step) next = (current + step[e.key] + count) % count
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = count - 1
    else return
    e.preventDefault()
    onChange(next)
    refs.current[next]?.focus()
  }
  return { refs, onKeyDown }
}

export default function SkillsExplorer({ groups, evidence, initial }: Props) {
  const all: Flat[] = useMemo(
    () => groups.flatMap((g) => g.skills.map((s) => ({ name: s.name, group: g.name, usedIn: s.usedIn ?? [] }))),
    [groups],
  )
  const filters = ['All', ...groups.map((g) => g.name)]
  const [filter, setFilter] = useState(0)
  const visible = filter === 0 ? all : all.filter((s) => s.group === filters[filter])
  const [selected, setSelected] = useState(initial)
  const [preview, setPreview] = useState<string | null>(null)

  const shown = all.find((s) => s.name === (preview ?? selected)) ?? all[0]
  const selectedIndex = Math.max(0, visible.findIndex((s) => s.name === selected))

  // Switching category keeps the selected skill if it's still listed, otherwise selects the first one.
  const chooseFilter = (i: number) => {
    setFilter(i)
    const list = i === 0 ? all : all.filter((s) => s.group === filters[i])
    if (!list.some((s) => s.name === selected)) setSelected(list[0].name)
  }
  const filterNav = useRoving(filters.length, filter, chooseFilter)
  const skillNav = useRoving(visible.length, selectedIndex, (i) => setSelected(visible[i].name))

  return (
    <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div role="radiogroup" aria-label="Skill category" className="flex flex-wrap gap-2" onKeyDown={filterNav.onKeyDown}>
          {filters.map((f, i) => (
            <button
              key={f}
              ref={(el) => {
                filterNav.refs.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={i === filter}
              tabIndex={i === filter ? 0 : -1}
              onClick={() => chooseFilter(i)}
              className="filter-chip m-press"
            >
              {f}
            </button>
          ))}
        </div>

        <div
          role="radiogroup"
          aria-label="Skills"
          className="mt-6 flex flex-wrap gap-2"
          onKeyDown={skillNav.onKeyDown}
          onPointerLeave={() => setPreview(null)}
        >
          {visible.map((s, i) => (
            <button
              key={s.name}
              ref={(el) => {
                skillNav.refs.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={s.name === selected}
              tabIndex={i === selectedIndex ? 0 : -1}
              onClick={() => setSelected(s.name)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setPreview(s.name)}
              data-evidence={s.usedIn.length > 0 ? '' : undefined}
              className="skill-chip m-press m-swap"
              style={{ '--i': Math.min(i, 12) } as React.CSSProperties}
              translate="no"
            >
              {s.name}
            </button>
          ))}
        </div>
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-fine text-muted">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="legend-chip" data-evidence="" /> Used in work on this page
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="legend-chip" /> Used in coursework or elsewhere
          </span>
        </p>
      </div>

      <div className="lg:col-span-5">
        {/* Announce deliberate selections only, not hover previews. */}
        <p role="status" className="sr-only">
          {(() => {
            const s = all.find((x) => x.name === selected)
            if (!s) return ''
            return s.usedIn.length
              ? `${s.name}: used in ${s.usedIn.map((r) => evidence[r].label).join(', ')}.`
              : `${s.name}: used in coursework or elsewhere.`
          })()}
        </p>
        <div className="evidence lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <div key={shown.name} className="m-swap">
            <p className="text-small text-muted">{shown.group}</p>
            <p className="mt-1 font-display text-[2.5rem] font-semibold leading-none" translate="no">
              {shown.name}
            </p>
            {shown.usedIn.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {shown.usedIn.map((ref) => {
                  const ev = evidence[ref]
                  return (
                    <li key={ref}>
                      <a href={ev.anchor} className="evidence-row group">
                        {ev.thumb ? (
                          <img src={ev.thumb} alt="" width={96} height={60} loading="lazy" decoding="async" className="evidence-thumb" />
                        ) : (
                          <span aria-hidden="true" className="evidence-thumb evidence-thumb-empty" />
                        )}
                        <span className="min-w-0">
                          <span className="block font-semibold" translate="no">
                            {ev.label}
                          </span>
                          <span className="block text-small text-muted">{ev.detail}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="mt-5 max-w-[34ch] text-muted">
                Used in coursework or outside the projects on this page, so there’s nothing to link to yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
