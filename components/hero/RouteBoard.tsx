'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type BoardRow = {
  slug: string
  name: string
  kind: string
  role: string
  status: string
  caption: string
  /** Server-rendered crop or diagram for the preview. */
  preview: ReactNode
}

const INTENT_DELAY = 90

/**
 * The hero's route board: every project is a plain link to its section, so a click, tap or Enter always goes
 * there. Hovering (mouse only, after a short intent delay) or focusing a row swaps the passive preview above it.
 * The preview holds no links, so moving the pointer towards it can never change where a click lands.
 */
export default function RouteBoard({ rows }: { rows: BoardRow[] }) {
  const [active, setActive] = useState(0)
  // Only the first preview is in the HTML; the rest are added once the visitor reaches for the board.
  const [primed, setPrimed] = useState(false)
  const intent = useRef<number>()

  useEffect(() => () => window.clearTimeout(intent.current), [])

  const choose = (i: number, delay: number) => {
    setPrimed(true)
    window.clearTimeout(intent.current)
    if (delay === 0) setActive(i)
    else intent.current = window.setTimeout(() => setActive(i), delay)
  }

  return (
    <div className="board" onPointerEnter={() => setPrimed(true)}>
      <ol className="board-rows" aria-label="Featured projects" onPointerLeave={() => window.clearTimeout(intent.current)}>
        {rows.map((row, i) => (
          <li key={row.slug}>
            <a
              href={`#${row.slug}`}
              className="board-row"
              data-active={i === active ? '' : undefined}
              onPointerEnter={(e) => e.pointerType === 'mouse' && choose(i, INTENT_DELAY)}
              onFocus={() => choose(i, 0)}
            >
              <span aria-hidden="true" className="board-stop" />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="board-name" translate="no">
                    {row.name}
                  </span>
                  <span className="board-role">{row.role}</span>
                </span>
                <span className="board-meta">
                  {row.kind}
                  <span aria-hidden="true"> · </span>
                  <span className="sr-only">, </span>
                  {row.status}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <figure className="board-preview" aria-hidden="true">
        <div className="board-frame">
          {rows.map((row, i) => (
            <div key={row.slug} className="board-layer" data-on={i === active ? '' : undefined}>
              {i === 0 || primed ? row.preview : null}
            </div>
          ))}
        </div>
        <figcaption className="board-caption">{rows[active].caption}</figcaption>
      </figure>
    </div>
  )
}
