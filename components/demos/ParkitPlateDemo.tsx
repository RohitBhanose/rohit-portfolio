'use client'

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'

/**
 * ParkIT has no hosted demo, so this walks a drawn car with a sample plate through the real pipeline (from the
 * repository): OpenCV frame, YOLOv8 box, EasyOCR read, format repair, 2-frame agreement, entry and bill.
 * The stage is decorative (aria-hidden); the readout under it carries the meaning in text.
 */
const LAST = 5
const TICK = 1600
const PLATE = 'MH 12 AB 1234'
// Sample stay of 90 minutes, leaving at 19:00. ₹ per minute: peak on weekends and 18:00–22:00 daily, base otherwise.
const [STAY, PEAK, BASE] = [90, 0.8, 0.67]
const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n)
const bill = (rate: number) => `${STAY} × ${inr(rate)} = ${inr(STAY * rate)}`
const at = (i: number) => ({ '--i': i }) as CSSProperties
const mark = 'rounded-sm bg-signal px-0.5 text-on-signal'

type Step = { title: string; say: string; big?: ReactNode; frames?: boolean; lines: ReactNode[]; note?: ReactNode }

const steps: Step[] = [
  {
    title: 'Capture',
    say: 'OpenCV captures a frame from the webcam.',
    lines: ['OpenCV captures a frame from the webcam.'],
    note: 'Here the frame is a drawing of a car with a sample plate.',
  },
  {
    title: 'Detect',
    say: 'YOLOv8 with custom weights finds the plate box. Its single class is license_plate.',
    lines: ['YOLOv8 with custom weights finds the plate and returns its box.'],
    note: <>The model has a single class: <span translate="no">license_plate</span>.</>,
  },
  {
    title: 'Read',
    say: 'EasyOCR reads MH12AB I234. The letter I looks suspect.',
    big: <>MH12AB <mark className={mark}>I</mark>234</>,
    lines: ['EasyOCR returns the raw text. The highlighted I looks suspect.'],
  },
  {
    title: 'Repair',
    say: 'The 4th character from the end must be a digit, so I becomes 1. MH 12 AB 1234.',
    big: <>MH 12 AB <mark className={mark}>1</mark>234</>,
    lines: ['The 4th character from the end must be a digit, so I becomes 1.'],
    note: 'Reads are fitted to 8 Indian plate formats, Bharat series included. O/0, I/1 and B/8 swap only where a position needs the other kind, with at most 2 fixes.',
  },
  {
    title: 'Agree',
    say: 'Two frames read MH 12 AB 1234. Accepted after 2 matching frames.',
    frames: true,
    lines: [<strong key="ok" className="font-semibold">Accepted after 2 matching frames</strong>],
    note: 'A plate is accepted only after it wins in 2 separate frames.',
  },
  {
    title: 'Record',
    say: `Entry logged, slot 07 assigned. Exit after ${STAY} minutes at 19:00 costs ${inr(STAY * PEAK)} at the peak rate, or ${inr(STAY * BASE)} at the off-peak base rate.`,
    lines: [
      <>Entry logged, first free slot: <span className="inline-block rounded-md bg-signal px-2 font-display text-[1.25rem] font-semibold leading-7 text-on-signal">Slot 07</span></>,
      <>Exit after {STAY} minutes at 19:00, peak rate: <span className="tabular font-semibold">{bill(PEAK)}</span></>,
    ],
    note: <>Off-peak, the base rate gives <span className="tabular">{bill(BASE)}</span>. Peak covers weekends and 18:00–22:00 daily. Records go to CSV or MySQL.</>,
  },
]

function Panel({ i }: { i: number }) {
  const s = steps[i]
  const lead = (s.big ? 1 : 0) + (s.frames ? 2 : 0)
  return (
    <>
      <p style={at(0)} className="m-swap flex items-baseline gap-2">
        <span className="font-display text-deck font-semibold leading-none">{s.title}</span>
        <span className="text-fine text-muted">Step {i + 1} of 6</span>
      </p>
      {s.big ? (
        <p translate="no" style={at(1)} className="m-swap mt-2 font-display text-[1.75rem] font-semibold leading-none tracking-[0.04em]">{s.big}</p>
      ) : null}
      {s.frames ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {['Frame 1', 'Frame 2'].map((frame, k) => (
            <li key={frame} style={at(k + 1)} className="m-swap flex items-baseline gap-2 rounded-md border border-line-strong px-2.5 py-1.5">
              <span className="text-fine text-muted">{frame}</span>
              <span translate="no" className="font-display text-[1.25rem] font-semibold leading-none">{PLATE}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {s.lines.map((line, k) => (
        <p key={k} style={at(lead + k + 1)} className="m-swap mt-2 text-small">{line}</p>
      ))}
      {s.note ? (
        <p style={at(lead + s.lines.length + 1)} className="m-swap mt-2 text-fine text-muted">{s.note}</p>
      ) : null}
    </>
  )
}

const corners = ['left-0 top-0 rounded-tl-md border-l-2 border-t-2', 'right-0 top-0 rounded-tr-md border-r-2 border-t-2',
  'bottom-0 left-0 rounded-bl-md border-b-2 border-l-2', 'bottom-0 right-0 rounded-br-md border-b-2 border-r-2']

/** A flat car rear in token colours. Only the plate keeps its physical colours: white, black, IND blue. */
function Stage({ step }: { step: number }) {
  const boxed = step >= 1
  return (
    <div aria-hidden="true" className="relative h-44 overflow-hidden rounded-md bg-bg sm:h-48">
      <span className={`absolute inset-3 transition-opacity duration-[var(--dur-base)] ${step === 0 ? 'opacity-100' : 'opacity-40'}`}>
        {corners.map((c) => <span key={c} className={`absolute h-5 w-5 border-ink ${c}`} />)}
      </span>
      <span className="absolute left-10 top-3 text-fine text-muted">Sample frame</span>
      <div className="absolute bottom-4 left-1/2 h-32 w-52 -translate-x-1/2">
        {['left-4', 'right-4'].map((p) => <span key={p} className={`absolute bottom-0 ${p} h-6 w-10 rounded-md bg-ink/70`} />)}
        <span className="absolute inset-x-0 bottom-3 top-10 rounded-2xl bg-line-strong" />
        <span className="absolute inset-x-7 top-0 h-12 rounded-t-[2.5rem] bg-line-strong">
          <span className="absolute inset-x-3 bottom-1.5 top-2.5 rounded-b-sm rounded-t-[2rem] bg-ink/25" />
        </span>
        {['left-3', 'right-3'].map((p) => <span key={p} className={`absolute ${p} top-[3.25rem] h-3 w-10 rounded-full bg-ink/30`} />)}
        <span className="absolute inset-x-1 bottom-1 h-4 rounded-md bg-ink/15" />
        <div translate="no" className="absolute left-1/2 top-[4.25rem] -translate-x-1/2">
          <div className="flex h-9 overflow-hidden rounded-[4px] border-2 border-black bg-white">
            <span className="flex w-[1.125rem] flex-col items-center justify-end bg-[#1f4aa8] pb-[3px] text-[0.4375rem] font-semibold leading-none text-white">IND</span>
            <span className="flex items-center whitespace-nowrap px-2 font-display text-[1.375rem] font-semibold leading-none tracking-[0.04em] text-black">{PLATE}</span>
          </div>
          {/* The box draws out from its top-left corner, then its label fades in. Reduced motion: instant. */}
          <span className={`absolute -inset-1.5 rounded-[5px] border-2 border-signal motion-safe:transition-[clip-path] motion-safe:duration-[var(--dur-slow)] motion-safe:ease-in-out ${boxed ? '[clip-path:inset(0)]' : '[clip-path:inset(0_100%_100%_0)]'}`} />
          <span className={`absolute -left-1.5 -top-[1.625rem] whitespace-nowrap rounded-t-sm bg-signal px-1.5 text-fine font-semibold leading-5 text-on-signal motion-safe:transition-opacity motion-safe:duration-[var(--dur-base)] ${boxed ? 'opacity-100 motion-safe:delay-[var(--dur-fast)]' : 'opacity-0'}`}>
            license_plate
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ParkitPlateDemo() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [live, setLive] = useState(false) // stay silent until the visitor does something

  // One timeout per step: pausing, a manual jump or unmounting clears it.
  useEffect(() => {
    if (!playing || step >= LAST) return
    const t = window.setTimeout(() => {
      setStep(step + 1)
      if (step + 1 === LAST) setPlaying(false)
    }, TICK)
    return () => window.clearTimeout(t)
  }, [playing, step])

  const go = (n: number) => {
    setPlaying(false)
    setLive(true)
    setStep(Math.min(LAST, Math.max(0, n)))
  }
  const toggle = () => {
    setLive(true)
    if (!playing && step === LAST) setStep(0) // Play at the end starts over
    setPlaying(!playing)
  }
  const Icon = playing ? Pause : Play

  return (
    <div className="flex min-h-[26rem] w-full flex-col gap-4 p-4 sm:p-6">
      <ol aria-label="Pipeline steps" className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1} ${s.title}`}
              aria-current={i === step ? 'step' : undefined}
              className={`m-press flex min-h-11 w-full flex-col items-center justify-center rounded-md border px-1 py-1.5 ${
                i === step ? 'border-signal bg-signal text-on-signal' : `border-line-strong hover:border-ink ${i < step ? 'text-ink' : 'text-muted'}`
              }`}
            >
              <span className="tabular font-display text-[1.25rem] font-semibold leading-none">{i + 1}</span>
              <span className="sr-only text-fine font-medium sm:not-sr-only sm:mt-1 sm:max-w-full sm:truncate">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <Stage step={step} />

      {/* Every panel sits invisibly in the same cell, so the readout is as tall as the longest step. */}
      <div className="grid">
        {steps.map((s, i) => (
          <div key={s.title} className="invisible [grid-area:1/1]">
            <Panel i={i} />
          </div>
        ))}
        <div key={step} className="[grid-area:1/1]">
          <Panel i={step} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={toggle} className="btn btn-primary min-w-[7.5rem] px-5">
          <Icon aria-hidden="true" size={18} strokeWidth={2.25} />
          {playing ? 'Pause' : 'Play'}
        </button>
        {/* aria-disabled, not disabled, so focus stays put at either end; go() clamps and still stops Play. */}
        <div className="flex gap-2">
          {([['Back', -1, 0], ['Next', 1, LAST]] as const).map(([label, d, end]) => (
            <button key={label} type="button" onClick={() => go(step + d)} aria-disabled={step === end} className="btn btn-secondary px-4 aria-disabled:opacity-50">
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-auto text-fine text-muted">
        An illustration of the pipeline with a sample plate. The real system runs locally with a webcam and a trained model.
      </p>
      <span role="status" className="sr-only">{live ? `Step ${step + 1} of 6, ${steps[step].title}. ${steps[step].say}` : ''}</span>
    </div>
  )
}
