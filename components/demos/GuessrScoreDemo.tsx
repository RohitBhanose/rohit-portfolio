'use client'

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

/**
 * IndiaGuessr's round score as the backend computes it: round(5000 × e^(−d / k)), clamped to 0–5,000,
 * where d is the Haversine distance in km and k is 200 km (India mode) or 2,000 km (World mode).
 * Each mode's slider runs to 5 × k, so both share one curve: only the distance scale changes.
 */
const MODES = {
  india: { label: 'India mode', k: 200, max: 1000, step: 5 },
  world: { label: 'World mode', k: 2000, max: 10000, step: 50 },
} as const
type Mode = keyof typeof MODES
const KEYS = Object.keys(MODES) as Mode[]

const MAX = 5000
const ROUNDS = 5
const nf = new Intl.NumberFormat('en-IN')
const km = (d: number) => `${nf.format(d)} km`
const halfAt = (k: number) => Math.round(k * Math.LN2)
const scoreAt = (d: number, k: number) => Math.min(MAX, Math.max(0, Math.round(MAX * Math.exp(-d / k))))
const say = (mode: Mode, d: number) =>
  `${MODES[mode].label}: ${km(d)} away scores ${nf.format(scoreAt(d, MODES[mode].k))} points.`

// Chart space is 0–100 on both axes: x = d / max (so d / k = x / 20), y = 100 − score as a percentage.
const HALF_X = ((Math.LN2 / 5) * 100).toFixed(2)
const CURVE = Array.from({ length: 81 }, (_, i) => {
  const x = (i / 80) * 100
  return `${x.toFixed(2)},${(100 - Math.exp(-x / 20) * 100).toFixed(2)}`
}).join(' ')

export default function GuessrScoreDemo() {
  const id = useId()
  const [mode, setMode] = useState<Mode>('india')
  const [distance, setDistance] = useState(100)
  const [message, setMessage] = useState('')
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const m = MODES[mode]
  const score = scoreAt(distance, m.k)
  const half = halfAt(m.k)
  const x = ((distance / m.max) * 100).toFixed(2)
  const y = (100 - (score / MAX) * 100).toFixed(2)

  // Switching mode keeps the slider at the same fraction of its range.
  const choose = (next: Mode) => {
    const n = MODES[next]
    const d = Math.round(((distance / m.max) * n.max) / n.step) * n.step
    window.clearTimeout(timer.current)
    setMode(next)
    setDistance(d)
    setMessage(say(next, d))
  }

  // Announce only once the slider has rested, not on every step.
  const slide = (d: number) => {
    setDistance(d)
    setMessage('')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(say(mode, d)), 400)
  }

  return (
    <div className="flex min-h-[26rem] w-full flex-col gap-5 p-4 sm:p-6">
      <fieldset className="w-full max-w-sm">
        <legend className="sr-only">Game mode</legend>
        <div className="relative grid grid-cols-2 rounded-full border border-line-strong p-1">
          {/* Dark keyline: the yellow alone is under 3:1 against a white surface. */}
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full border border-on-signal bg-signal motion-safe:transition-transform motion-safe:duration-[var(--dur-base)] motion-safe:ease-in-out ${
              mode === 'world' ? 'translate-x-full' : ''
            }`}
          />
          {KEYS.map((key) => (
            <label key={key} className="relative flex min-h-11 items-center justify-center">
              <input
                type="radio"
                name={id}
                value={key}
                checked={key === mode}
                onChange={() => choose(key)}
                className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-full"
              />
              <span
                className={`pointer-events-none relative text-small font-semibold transition-colors duration-[var(--dur-base)] ${
                  key === mode ? 'text-on-signal' : 'text-muted peer-hover:text-ink'
                }`}
              >
                {MODES[key].label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <p className="font-display text-[3.75rem] font-semibold leading-none tabular-nums text-ink sm:text-[4.5rem]">
          {nf.format(score)}
        </p>
        <p className="mt-1 text-small text-muted">
          Points out of {nf.format(MAX)} this round. A game has {ROUNDS} rounds, so {nf.format(MAX * ROUNDS)} at most.
        </p>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3 text-small">
          <label htmlFor={`${id}d`} className="font-semibold text-ink">
            Distance from the target
          </label>
          <span className="tabular-nums text-ink">{km(distance)}</span>
        </div>
        <input
          id={`${id}d`}
          type="range"
          min={0}
          max={m.max}
          step={m.step}
          value={distance}
          aria-valuetext={km(distance)}
          onChange={(e) => slide(Number(e.target.value))}
          className="mt-1 h-11 w-full cursor-pointer accent-ink"
        />
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between gap-3 text-fine text-muted">
          <span>Points</span>
          <span key={mode} className="m-swap">
            <span aria-hidden="true">
              {nf.format(MAX)} × e<sup>−d/{nf.format(m.k)}</sup>, d in km
            </span>
            <span className="sr-only">
              Points equal {nf.format(MAX)} times e to the power of minus d over {nf.format(m.k)}, with d the distance
              in km.
            </span>
          </span>
        </div>
        <div
          role="img"
          aria-label={`Points against distance in ${m.label}: ${nf.format(MAX)} at ${km(0)}, half points (${nf.format(
            MAX / 2,
          )}) at about ${km(half)}, ${nf.format(scoreAt(m.max, m.k))} at ${km(m.max)}. Marker at ${km(
            distance,
          )}, ${nf.format(score)} points.`}
          className="grid grid-cols-[2.5rem_1fr] text-fine text-muted"
        >
          <div className="relative">
            {[MAX, MAX / 2, 0].map((v, i) => (
              <span key={v} className="absolute right-1.5 -translate-y-1/2 tabular-nums" style={{ top: `${i * 50}%` }}>
                {nf.format(v)}
              </span>
            ))}
          </div>
          <div className="relative aspect-[2/1] sm:aspect-[5/2]">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              className="absolute inset-0 h-full w-full overflow-visible [&_*]:[vector-effect:non-scaling-stroke]"
            >
              <path d="M0 0V100H100" className="text-line-strong" />
              <path d={`M${HALF_X} 0V100M0 50H100`} className="text-muted" strokeDasharray="3 4" strokeOpacity={0.6} />
              <path d={`M${x} ${y}V100M0 ${y}H${x}`} className="text-muted" strokeOpacity={0.5} />
              <polyline points={CURVE} className="text-ink" strokeWidth={2} strokeLinejoin="round" />
            </svg>
            <span
              key={mode}
              className="m-swap absolute top-0 whitespace-nowrap pl-1.5 leading-none"
              style={{ left: `${HALF_X}%`, '--i': 1 } as CSSProperties}
            >
              Half points at {km(half)}
            </span>
            <span
              aria-hidden="true"
              className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-signal"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          </div>
          <div />
          <div key={mode} className="relative mt-1.5 h-5 tabular-nums">
            <span className="absolute left-0">{km(0)}</span>
            <span className="m-swap absolute inset-x-0 text-center" style={{ '--i': 1 } as CSSProperties}>
              {km(m.max / 2)}
            </span>
            <span className="m-swap absolute right-0" style={{ '--i': 2 } as CSSProperties}>
              {km(m.max)}
            </span>
          </div>
        </div>
      </div>

      {/* Both modes' lines share one grid cell, so the taller one sets the height and switching never shifts layout. */}
      <p className="grid text-small text-ink">
        {KEYS.map((key) => (
          <span
            key={key}
            className={`[grid-area:1/1] ${key === mode ? 'm-swap' : 'invisible'}`}
            style={{ '--i': 2 } as CSSProperties}
          >
            Every extra {km(halfAt(MODES[key].k))} halves the score again, so points drop fastest near the target.
          </span>
        ))}
      </p>

      <p className="mt-auto text-fine text-muted">
        The scoring function from the <span translate="no">IndiaGuessr</span> backend, recalculated in your browser.
      </p>
      <p role="status" className="sr-only">
        {message}
      </p>
    </div>
  )
}
