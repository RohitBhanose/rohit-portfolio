'use client'

import { useId, useRef, useState, type CSSProperties } from 'react'
import { Check, Minus } from 'lucide-react'

/** Sample values throughout: XP per check-in and the stage thresholds are illustrative, not LevelUp's. */
const XP = 300
const SESSIONS = [1, 2, 3, 4, 5, 6, 7, 8]
const SCALE = XP * SESSIONS.length
const STAGES = [{ name: 'I', at: 0 }, { name: 'II', at: 600 }, { name: 'III', at: 1500 }]
const fmt = new Intl.NumberFormat('en-IN').format

type Row = { session: number; xp: number }
type Attempt = { session: number; ok: boolean }
type Scan = { id: number; race: boolean; attempts: Attempt[] }

const sum = (rows: Row[]) => rows.reduce((total, row) => total + row.xp, 0)
const stageOf = (xp: number) => STAGES.reduce((current, stage, i) => (xp >= stage.at ? i : current), 0)

/**
 * The idea in miniature: a pass can be checked in once per session, however many times (or however
 * simultaneously) it is scanned. A rejected attempt records nothing.
 * A rejected attempt writes nothing.
 */
const complete = (rows: Row[], session: number): Row[] | null =>
  rows.some((r) => r.session === session) ? null : [...rows, { session, xp: XP }]

const notes = {
  ok: 'Check-in recorded. The XP total and stage update from the recorded check-ins.',
  no: 'This pass is already checked in for this session, so nothing new is recorded and no XP is awarded.',
  race: 'Two scanners sent the same pass at the same moment. One check-in is recorded; the other is recognised as a duplicate and records nothing.',
}

const marker = (i: number, stage: number) =>
  i === stage ? 'border-ink bg-signal text-on-signal' : i < stage ? 'border-ink bg-ink text-bg' : 'border-line-strong bg-surface text-muted'

export default function LevelUpLedgerDemo() {
  const id = useId()
  const [rows, setRows] = useState<Row[]>([])
  const [scan, setScan] = useState<Scan | null>(null)
  const [message, setMessage] = useState({ n: 0, text: '' })
  const box = useRef<HTMLDivElement>(null)

  // Computed on read, as in LevelUp: nothing stores the total or the stage.
  const total = sum(rows)
  const stage = stageOf(total)
  const next = STAGES[stage + 1]
  const lastSession = scan ? scan.attempts[0].session : null
  const upcoming = SESSIONS.find((n) => !rows.some((r) => r.session === n))
  const overflow = rows.length > 6

  // Each message is a new node in the live region (keyed by n), so a repeated sentence is still announced.
  const announce = (text: string) => setMessage((m) => ({ n: m.n + 1, text }))

  const attempt = (session: number, race = false) => {
    let after = rows
    const attempts = (race ? [session, session] : [session]).map((s) => {
      const written = complete(after, s)
      if (written) after = written
      return { session: s, ok: written !== null }
    })
    setRows(after)
    setScan({ id: message.n, race, attempts })
    box.current?.scrollTo({ top: 0 })
    const newStage = stageOf(sum(after))
    const evolved = newStage > stage ? ` Companion evolved to stage ${STAGES[newStage].name}.` : ''
    const t = fmt(sum(after))
    announce(
      race
        ? `Two scans of session ${session} at once: one accepted, +${XP} XP; one rejected, no XP awarded. Total ${t} XP.${evolved}`
        : attempts[0].ok
          ? `Session ${session} check-in accepted: +${XP} XP. Total ${t} XP.${evolved}`
          : `Rejected. Already checked in for session ${session}: no XP awarded. Total stays ${t} XP.`,
    )
  }

  const reset = () => {
    setRows([])
    setScan(null)
    announce('Reset. No check-ins recorded: 0 XP, stage I.')
  }

  // A changed value swaps in (its key changes); at 0 it doesn't, so the demo arrives still and resets instantly.
  const stat = (value: number) => `${value ? 'm-swap ' : ''}font-display text-[2.25rem] font-semibold leading-none`
  const action = 'btn px-3 text-center leading-tight text-balance aria-disabled:opacity-50'

  return (
    <div className="flex min-h-[26rem] w-full flex-col p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-[1.75rem] font-semibold leading-none">Player 01</p>
          <p className="mt-2 text-fine text-muted">Sample player</p>
        </div>
        {/* Label first in the DOM so it reads "Stage II", value first on screen. */}
        <div className="flex gap-5 text-right">
          <p className="flex min-w-[2.5rem] flex-col-reverse">
            <span className="mt-1 text-fine text-muted">Stage</span>
            <span key={stage} className={stat(stage)}>{STAGES[stage].name}</span>
          </p>
          <p className="flex min-w-[5rem] flex-col-reverse">
            <span className="mt-1 text-fine text-muted">XP total</span>
            <span key={total} className={`tabular ${stat(total)}`}>{fmt(total)}</span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3 text-small">
          <p id={`${id}-evo`} className="font-semibold">Evolution</p>
          <p className="tabular text-muted">{next ? `${fmt(next.at - total)} XP to stage ${next.name}` : 'Final stage reached'}</p>
        </div>
        <div className="relative mx-4 mt-3 h-14">
          <div aria-hidden="true" className="absolute inset-x-0 top-[13px] h-1.5 overflow-hidden rounded-full bg-ink/10">
            {/* Moving on screen: ease-in-out, and instant under reduced motion. */}
            <div className="h-full w-full rounded-full bg-signal motion-safe:transition-transform motion-safe:duration-[var(--dur-base)] motion-safe:ease-in-out" style={{ transform: `translateX(${(total / SCALE) * 100 - 100}%)` }} />
          </div>
          <ol aria-labelledby={`${id}-evo`}>
            {STAGES.map((s, i) => (
              <li key={s.name} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${(s.at / SCALE) * 100}%` }}>
                <span aria-hidden="true" className={`grid h-8 w-8 place-items-center rounded-full border-2 font-display text-[1.0625rem] font-semibold leading-none ${marker(i, stage)}`}>
                  {s.name}
                </span>
                <span className="tabular mt-1 whitespace-nowrap text-fine text-muted">
                  <span className="sr-only">Stage {s.name} from </span>
                  {fmt(s.at)} XP
                  <span className="sr-only">{i === stage ? ', current' : i < stage ? ', reached' : ''}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div role="group" aria-labelledby={`${id}-scan`} className="mt-5">
        <p className="text-fine text-muted">Try it: 1. scan a pass · 2. scan the same pass again · 3. two scanners at once</p>
        <p id={`${id}-scan`} className="mt-2 text-small font-semibold">Scan pass at session</p>
        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {SESSIONS.map((n) => {
            const done = rows.some((r) => r.session === n)
            return (
              <button key={n} type="button" onClick={() => attempt(n)} aria-label={`Scan pass at session ${n}${done ? ', already checked in' : ''}`} className="btn btn-secondary tabular gap-1 px-0 font-display text-[1.375rem]">
                {n}
                {done ? <Check aria-hidden="true" size={16} strokeWidth={2.5} className="text-muted" /> : null}
              </button>
            )
          })}
        </div>
      </div>
      {/* aria-disabled rather than disabled, so focus stays put when a button runs out of things to do. */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" aria-disabled={lastSession === null || undefined} className={`btn-secondary aria-disabled:hover:border-line-strong ${action}`}
          onClick={() => (lastSession === null ? announce('Scan a pass first, then scan it again.') : attempt(lastSession))}>
          Scan the same pass again
        </button>
        <button type="button" aria-disabled={upcoming === undefined || undefined} className={`btn-secondary aria-disabled:hover:border-line-strong ${action}`}
          onClick={() => (upcoming === undefined ? announce(`All ${SESSIONS.length} sessions are checked in. Reset to start over.`) : attempt(upcoming, true))}>
          Two scanners at once
        </button>
      </div>

      {/* Both panels have fixed heights (the race case is the tallest), so no state moves the page. */}
      <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div className="border-t border-line pt-2">
          <p className="flex min-h-11 items-center text-small font-semibold">Last scan</p>
          <div className="mt-2 h-48">
            {scan ? (
              <div key={scan.id}>
                <ul className="space-y-2">
                  {scan.attempts.map((a, i) => (
                    <li key={i} style={{ '--i': i } as CSSProperties} className={`m-swap flex items-start gap-2.5 rounded-md border px-2.5 py-2 text-small ${a.ok ? 'border-line' : 'border-dashed border-line-strong text-muted'}`}>
                      <span aria-hidden="true" className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${a.ok ? 'bg-signal text-on-signal' : 'border border-line-strong'}`}>
                        {a.ok ? <Check size={13} strokeWidth={3} /> : <Minus size={13} strokeWidth={3} />}
                      </span>
                      <span>
                        <span className="sr-only">{a.ok ? 'Accepted: ' : 'Rejected: '}</span>
                        {a.ok ? `+${XP} XP, session ${a.session} check-in` : `Already checked in for session ${a.session}: no XP awarded`}
                      </span>
                    </li>
                  ))}
                </ul>
                <p style={{ '--i': scan.attempts.length } as CSSProperties} className="m-swap mt-2 text-fine text-muted">
                  {scan.race ? notes.race : notes[scan.attempts[0].ok ? 'ok' : 'no']}
                </p>
              </div>
            ) : (
              <p className="text-small text-muted">Scan a pass to see what the database accepts.</p>
            )}
          </div>
        </div>

        <div className="border-t border-line pt-2">
          <div className="flex min-h-11 items-center justify-between gap-3">
            <p id={`${id}-ledger`} className="text-small font-semibold">
              Check-ins recorded<span className="font-normal text-muted">, newest first</span>
            </p>
            <button type="button" onClick={reset} className="btn btn-secondary min-h-11 px-4">Reset</button>
          </div>
          {/* Six rows fit; past that the box scrolls, so it becomes a named, focusable region. */}
          <div ref={box} role={overflow ? 'region' : undefined} aria-labelledby={overflow ? `${id}-ledger` : undefined} tabIndex={overflow ? 0 : undefined} className="mt-2 h-48 overflow-y-auto max-sm:h-auto max-sm:overflow-visible">
            {rows.length ? (
              <ol>
                {[...rows].reverse().map((r, i) => (
                  <li key={r.session} className="m-swap flex h-8 items-center justify-between gap-3 border-t border-line text-small first:border-t-0">
                    <span className="min-w-0 truncate">+{r.xp} XP, session {r.session} check-in</span>
                    <span className="tabular shrink-0 text-fine text-muted">Row {rows.length - i}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-small text-muted">No rows yet, so the total is 0 XP.</p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-auto pt-4 text-fine text-muted">
        A simulation with sample data. It isn’t connected to <span translate="no">LevelUp</span>.
      </p>
      <p role="status" className="sr-only"><span key={message.n}>{message.text}</span></p>
    </div>
  )
}
