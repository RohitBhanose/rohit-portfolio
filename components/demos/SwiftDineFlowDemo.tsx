'use client'

import { useEffect, useId, useReducer, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { Check, Minus, Plus, QrCode } from 'lucide-react'

/**
 * SwiftDineOS's table ordering flow in three panes: guest phone, kitchen display, bill. Steps and wording follow the
 * public walkthrough; the menu is its sample data. One reducer holds everything; nothing talks to SwiftDineOS.
 */
const MENU = [{ name: 'Paneer Tikka', price: 320 }, { name: 'Butter Naan', price: 60 }, { name: 'Cold Coffee', price: 120 }] as const
const MAX = 9
// minimumFractionDigits too: older engines reject a maximum below INR's default minimum of 2.
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 })

type Ticket = 'new' | 'preparing' | 'ready'
type State = { open: boolean; qty: number[]; ticket: Ticket | null; settled: boolean; say: string }
type Action = { type: 'scan' | 'place' | 'start' | 'ready' | 'settle' | 'reset' } | { type: 'add' | 'remove'; i: number }
type Ref = RefObject<HTMLButtonElement>

const initial: State = { open: false, qty: [0, 0, 0], ticket: null, settled: false, say: '' }
const sum = (qty: number[]) => qty.reduce((t, q, i) => t + q * MENU[i].price, 0)
const LABEL: Record<Ticket, string> = { new: 'New', preparing: 'Preparing', ready: 'Ready' }
const PILL: Record<Ticket, string> = { new: 'border-line-strong', preparing: 'border-transparent bg-ink text-bg', ready: 'border-transparent bg-signal text-on-signal' }
const title = 'font-display text-[1.375rem] font-semibold leading-none'

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'scan':
      return { ...s, open: true, say: 'QR verified. Table 7 resolved and its dining session is open.' }
    case 'add':
    case 'remove': {
      const q = s.qty[a.i] + (a.type === 'add' ? 1 : -1)
      if (s.ticket || q < 0 || q > MAX) return s
      const qty = s.qty.map((v, j) => (j === a.i ? q : v))
      return { ...s, qty, say: `${MENU[a.i].name}: ${q}. Total ${inr.format(sum(qty))}.` }
    }
    case 'place':
      return s.ticket || !sum(s.qty) ? s : { ...s, ticket: 'new', say: 'Order sent to the kitchen. New ticket for table 7.' }
    case 'start':
      return s.ticket === 'new' ? { ...s, ticket: 'preparing', say: 'Ticket started. Preparing.' } : s
    case 'ready':
      return s.ticket === 'preparing' ? { ...s, ticket: 'ready', say: 'Ticket marked ready. Served, and the bill is open.' } : s
    case 'settle':
      return s.ticket === 'ready' ? { ...s, settled: true, say: 'Bill settled.' } : s
    case 'reset':
      return { ...initial, say: 'Demo reset. Scan the table QR to begin.' }
  }
}

/** One screen of the flow. The 3px signal bar marks the step waiting on the visitor; reduced motion only fades it. */
function Pane(p: { title: string; note?: string; active: boolean; className: string; children: ReactNode }) {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id} aria-current={p.active ? 'step' : undefined}
      className={`relative flex flex-col overflow-hidden rounded-md border border-line bg-bg p-3 ${p.className}`}>
      <span aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] origin-left bg-signal transition-[transform,opacity] duration-[var(--dur-base)] ease-out motion-reduce:scale-x-100 motion-reduce:transition-opacity ${p.active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
      <div className="flex items-baseline justify-between gap-2">
        <p id={id} className={title}>{p.title}</p>
        {/* leading-none keeps the row at the title's height, so a note appearing (the bill's "Settled") moves nothing. */}
        {p.note ? <p className="text-fine leading-none text-muted">{p.note}</p> : null}
      </div>
      {p.children}
    </div>
  )
}

const Waiting = ({ heading, text }: { heading: string; text: string }) => (
  <div className="m-swap flex flex-1 flex-col items-center justify-center gap-1 px-2 text-center">
    <p className="text-small font-semibold">{heading}</p>
    <p className="text-fine text-muted">{text}</p>
  </div>
)

const Total = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-baseline justify-between gap-2 border-t border-line pt-3">
    <span className="text-small text-muted">{label}</span>
    <span className="tabular font-display text-[1.75rem] font-semibold leading-none">{inr.format(value)}</span>
  </div>
)

export default function SwiftDineFlowDemo() {
  const [s, dispatch] = useReducer(reducer, initial)
  const scanRef = useRef<HTMLButtonElement>(null)
  const addRef = useRef<HTMLButtonElement>(null)
  const kitchenRef = useRef<HTMLButtonElement>(null)
  const billRef = useRef<HTMLButtonElement>(null)
  const focusNext = useRef<Ref | null>(null)

  // A finished step's button leaves the page, so focus moves to the next step's control instead of falling to <body>.
  useEffect(() => {
    focusNext.current?.current?.focus()
    focusNext.current = null
  }, [s])

  // Buttons that change action in place check e.detail < 2, so a double-click can't settle and then start over.
  const go = (action: Action, focus: Ref | null = null) => {
    focusNext.current = focus
    dispatch(action)
  }

  const t = s.ticket
  const total = sum(s.qty)
  const count = s.qty.reduce((a, b) => a + b, 0)
  const lines = MENU.map((m, i) => ({ ...m, q: s.qty[i] })).filter((l) => l.q > 0)
  const step = !t ? 0 : t === 'ready' ? 2 : 1
  const phoneNote = s.settled ? 'Bill settled' : t === 'ready' ? 'Served at the table' : 'Order sent to the kitchen'

  // Range ends stay focusable (aria-disabled) so focus isn't dropped; once ordered, the menu is locked outright.
  const stepper = (type: 'add' | 'remove', i: number) => {
    const end = s.qty[i] === (type === 'add' ? MAX : 0)
    const Icon = type === 'add' ? Plus : Minus
    return (
      <button ref={type === 'add' && i === 0 ? addRef : undefined} type="button" disabled={!!t} aria-disabled={end}
        aria-label={`${type === 'add' ? 'Add' : 'Remove'} ${MENU[i].name}`} onClick={() => go({ type, i })}
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong ${end || t ? 'pointer-events-none opacity-40' : 'm-press hover:border-ink'}`}>
        <Icon aria-hidden="true" size={18} strokeWidth={2.25} />
      </button>
    )
  }

  return (
    <div className="flex min-h-[26rem] w-full flex-col p-4 [container-type:inline-size] sm:p-6">
      <div className="grid gap-3 [@container_(min-width:36rem)]:grid-cols-2">
        <Pane title="Table 7" note="Guest phone" active={step === 0} className="min-h-[27rem] [@container_(min-width:36rem)]:row-span-2">
          {!s.open ? (
            <div key="arrive" className="m-swap flex flex-1 flex-col pt-4">
              <QrCode aria-hidden="true" size={44} strokeWidth={1.75} />
              <p className="mt-3 text-small text-muted">
                The QR code on the table is server-issued table proof. The guest never picks a table, and everyone at
                the table shares one dining session.
              </p>
              <button ref={scanRef} type="button" onClick={() => go({ type: 'scan' }, addRef)} className="btn btn-primary mt-auto w-full">Scan table QR</button>
            </div>
          ) : (
            <div key="order" className="m-swap flex flex-1 flex-col pt-3">
              <ul className="space-y-0.5 text-fine text-muted">
                {['QR verified', 'Table 7 resolved', 'Dining session open'].map((item) => (
                  <li key={item} className="flex items-center gap-1.5"><Check aria-hidden="true" size={14} strokeWidth={2.5} className="text-ink" /> {item}</li>
                ))}
              </ul>
              <ul aria-label="Sample menu" className="mt-2 divide-y divide-line">
                {MENU.map((m, i) => (
                  <li key={m.name} className="flex items-center gap-2 py-1">
                    <div className="min-w-0 flex-1">
                      <p className="text-small font-semibold">{m.name}</p>
                      <p className="tabular text-fine text-muted">{inr.format(m.price)}</p>
                    </div>
                    {stepper('remove', i)}
                    <span className={`tabular w-5 text-center ${title}`}>{s.qty[i]}</span>
                    {stepper('add', i)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-3">
                <Total label={count ? `${count} ${count === 1 ? 'item' : 'items'}` : 'Add an item to order'} value={total} />
                {t ? (
                  <p key={phoneNote} className="m-swap mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-line text-small font-semibold">
                    <Check aria-hidden="true" size={16} strokeWidth={2.5} />
                    {phoneNote}
                  </p>
                ) : (
                  <button type="button" aria-disabled={!count} onClick={() => (count ? go({ type: 'place' }, kitchenRef) : undefined)}
                    className={`btn btn-primary mt-3 w-full ${count ? '' : 'pointer-events-none opacity-50'}`}>
                    Place order
                  </button>
                )}
              </div>
            </div>
          )}
        </Pane>

        <Pane title="Kitchen display" active={step === 1} className="min-h-[16.5rem]">
          {t ? (
            <div key="ticket" className="m-swap mt-3 flex flex-1 flex-col rounded-md border border-line-strong bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <p className={title}>Table 7</p>
                <span key={t} className={`m-swap rounded-full border px-2.5 py-1 text-fine font-semibold leading-none ${PILL[t]}`}>{LABEL[t]}</span>
              </div>
              <ul className="mt-2 text-small">
                {lines.map((l) => <li key={l.name}><span className="tabular font-semibold">{l.q} ×</span> {l.name}</li>)}
              </ul>
              <div className="mt-auto pt-3">
                {t === 'ready' ? (
                  <p className="flex min-h-12 items-center text-small text-muted">Served to table 7</p>
                ) : (
                  <button ref={kitchenRef} type="button" className="btn btn-primary w-full"
                    onClick={(e) => e.detail < 2 && (t === 'new' ? go({ type: 'start' }) : go({ type: 'ready' }, billRef))}>
                    {t === 'new' ? 'Start' : 'Mark ready'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Waiting heading="No tickets yet" text="Orders hit the kitchen screen the moment they are placed." />
          )}
        </Pane>

        <Pane title="Bill" note={s.settled ? 'Settled' : undefined} active={step === 2} className="min-h-[16.5rem]">
          {t === 'ready' ? (
            <div key="bill" className="mt-3 flex flex-1 flex-col">
              <ul className="text-small">
                {lines.map((l, i) => (
                  <li key={l.name} style={{ '--i': i } as CSSProperties} className="m-swap flex justify-between gap-3 py-0.5">
                    <span className="min-w-0">{`${l.name} × ${l.q}`}</span>
                    <span className="tabular">{inr.format(l.q * l.price)}</span>
                  </li>
                ))}
              </ul>
              <div style={{ '--i': lines.length } as CSSProperties} className="m-swap mt-auto pt-3">
                <Total label="Total" value={total} />
                <button ref={billRef} type="button" className={`btn mt-3 w-full ${s.settled ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={(e) => e.detail < 2 && (s.settled ? go({ type: 'reset' }, scanRef) : go({ type: 'settle' }))}>
                  {s.settled ? 'Start over' : 'Settle bill'}
                </button>
              </div>
            </div>
          ) : (
            <Waiting heading="Nothing to bill yet" text="The bill opens once the order is served." />
          )}
        </Pane>
      </div>

      <p className="mt-auto pt-4 text-fine text-muted">A simplified illustration with sample data. It isn&apos;t connected to <span translate="no">SwiftDineOS</span>.</p>
      <p role="status" className="sr-only">{s.say}</p>
    </div>
  )
}
