'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Stop } from '@/content/journey'
import Marker from './Marker'

export type RouteStop = Pick<Stop, 'id' | 'kind' | 'date' | 'label'>

/*
 * The route: a serpentine road through every stop in date order. Geometry is in SVG user units and the
 * stop buttons are positioned with the same numbers as percentages, so the HTML and the drawing line up
 * at any width. Lengths along the road are computed analytically, so the puck knows where each stop is.
 */
const W = 1200
const H = 560
const R = 95
const ROWS = [90, 280, 470]
const COLS = [200, 600, 1000]
const ARC = Math.PI * R
const ROAD = `M 40 ${ROWS[0]} H 1100 A ${R} ${R} 0 0 1 1100 ${ROWS[1]} H 100 A ${R} ${R} 0 0 0 100 ${ROWS[2]} H 1160`
const TOTAL = 1060 + ARC + 1000 + ARC + 1060

/** Position and distance along the road for stop i (3 per row, rows alternate direction). */
function place(i: number) {
  const row = Math.floor(i / 3)
  const col = i % 3
  const x = row === 1 ? COLS[2 - col] : COLS[col]
  const y = ROWS[row]
  const length = row === 0 ? x - 40 : row === 1 ? 1060 + ARC + (1100 - x) : 1060 + ARC + 1000 + ARC + (x - 100)
  return { x, y, length }
}

/** Close to the --ease-in-out token, cubic-bezier(0.77, 0, 0.175, 1): moving on screen. */
const easeInOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - 8 * (1 - t) ** 4)

/**
 * The desktop route map. Only the geometry and the tabs live here; each stop's detail panel and the legend are
 * rendered on the server and passed in, so the copy ships as HTML rather than JavaScript.
 */
export default function JourneyMap({ stops, details, legend }: { stops: RouteStop[]; details: ReactNode[]; legend: ReactNode }) {
  const last = stops.length - 1
  const [active, setActive] = useState(last)
  const mapRef = useRef<HTMLDivElement>(null)
  const roadRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const puckRef = useRef<SVGGElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const position = useRef(0)
  const frame = useRef(0)
  const arrived = useRef(false)

  // Writes go straight to the SVG: no React render per frame.
  const setPosition = useCallback((length: number) => {
    const road = roadRef.current
    if (!road) return
    const point = road.getPointAtLength(length)
    puckRef.current?.setAttribute('transform', `translate(${point.x} ${point.y})`)
    if (trailRef.current) trailRef.current.style.strokeDashoffset = String(TOTAL - length)
    position.current = length
  }, [])

  const travelTo = useCallback(
    (index: number) => {
      cancelAnimationFrame(frame.current)
      const from = position.current
      const to = place(index).length
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setPosition(to)
      const duration = Math.min(1100, Math.max(350, Math.abs(to - from) * 0.35))
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setPosition(from + (to - from) * easeInOut(t))
        if (t < 1) frame.current = requestAnimationFrame(step)
      }
      frame.current = requestAnimationFrame(step)
    },
    [setPosition],
  )

  // First time the map is on screen, drive the whole route to the latest stop: the section's one moment.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    setPosition(0)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || arrived.current) return
        arrived.current = true
        travelTo(active)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(map)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
    }
    // Runs once; later selections are handled by select().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (index: number, focus = false) => {
    setActive(index)
    arrived.current = true
    travelTo(index)
    if (focus) tabRefs.current[index]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: last,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    select(Math.min(last, Math.max(0, keys[e.key])), true)
  }

  return (
    <div className="journey-map">
      <div ref={mapRef} className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <path d={ROAD} className="road-band" />
          <path ref={roadRef} d={ROAD} className="road-lane" />
          <path ref={trailRef} d={ROAD} className="road-trail" style={{ strokeDasharray: TOTAL, strokeDashoffset: TOTAL }} />
          <g ref={puckRef} className="road-puck">
            <circle r="15" />
            <circle r="6" />
          </g>
        </svg>

        <div role="tablist" aria-label="Experience and education, in date order" onKeyDown={onKeyDown}>
          {stops.map((s, i) => {
            const { x, y } = place(i)
            const selected = i === active
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`stop-${s.id}`}
                aria-selected={selected}
                aria-controls="journey-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className="route-stop"
                data-selected={selected ? '' : undefined}
                style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
              >
                <Marker kind={s.kind} />
                <span className="route-label">
                  <span className="tabular block text-fine text-muted">{s.date}</span>
                  <span className="block font-semibold leading-tight">{s.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {legend}

      <div
        id="journey-panel"
        role="tabpanel"
        aria-labelledby={`stop-${stops[active].id}`}
        className="mt-8 min-h-[15rem] border-t border-line pt-8"
      >
        <div key={stops[active].id}>{details[active]}</div>
      </div>
    </div>
  )
}
