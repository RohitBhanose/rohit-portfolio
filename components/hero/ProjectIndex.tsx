'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { isAvailable, type MaybeLink } from '@/content/types'
import ExternalLink from '@/components/ui/ExternalLink'

export type IndexItem = {
  slug: string
  name: string
  place: string
  tagline: string
  live: MaybeLink
  source: MaybeLink
  /** Server-rendered preview: a screenshot or a diagram. */
  layer: ReactNode
}

const INTENT_DELAY = 80

/**
 * The hero's project selector: a tablist. Hover (mouse, after a short intent delay), focus or a tap selects a
 * project; its screenshot wipes in and its description and links change with it. The panel only updates once
 * the new image has decoded, so preview and text never disagree.
 */
export default function ProjectIndex({ items }: { items: IndexItem[] }) {
  // `active` is the tab asked for; `shown` is what the preview currently displays.
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [primed, setPrimed] = useState(false)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const shownRef = useRef(0)
  const intent = useRef<number>()
  const running = useRef<Animation | null>(null)
  const generation = useRef(0)

  useEffect(() => {
    const token = ++generation.current // cancels a show() still waiting on a decode
    const from = shownRef.current
    if (from === active) return
    const layer = layerRefs.current[active]
    if (!layer) return

    const show = () => {
      if (token !== generation.current) return
      running.current?.cancel()
      layerRefs.current.forEach((el, i) => {
        if (!el) return
        el.toggleAttribute('data-on', i === active || i === from)
        el.style.zIndex = i === active ? '2' : i === from ? '1' : '0'
      })
      shownRef.current = active
      setShown(active)
      const done = () => layerRefs.current.forEach((el, i) => el?.toggleAttribute('data-on', i === active))
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
      const down = active > from
      running.current = layer.animate(
        [{ clipPath: down ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
        { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      )
      running.current.onfinish = done
    }

    const img = layer.querySelector('img')
    if (!img || (img.complete && img.naturalWidth > 0)) show()
    else img.decode().then(show, show)
  }, [active])

  useEffect(() => () => window.clearTimeout(intent.current), [])

  const choose = (i: number, delay = 0) => {
    setPrimed(true)
    window.clearTimeout(intent.current)
    if (delay === 0) setActive(i)
    else intent.current = window.setTimeout(() => setActive(i), delay)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = items.length - 1
    const keys: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (keys[e.key] + items.length) % items.length
    choose(next)
    tabRefs.current[next]?.focus()
  }

  const item = items[shown]

  return (
    <div onPointerEnter={() => setPrimed(true)} onFocus={() => setPrimed(true)}>
      <div className="hero-unveil">
        <div aria-hidden="true" className="hero-preview">
          {items.map((it, i) => (
            <div
              key={it.slug}
              ref={(el) => {
                layerRefs.current[i] = el
              }}
              data-on={i === 0 ? '' : undefined}
              className="index-layer absolute inset-0"
            >
              {i === 0 || primed ? it.layer : null}
            </div>
          ))}
        </div>
        <div role="tabpanel" id="hero-panel" aria-labelledby={`hero-tab-${item.slug}`} className="hero-info">
          <div key={item.slug}>
            <p className="m-swap text-small" style={{ '--i': 0 } as React.CSSProperties}>
              {item.tagline}
            </p>
            <p className="m-swap mt-1 flex flex-wrap items-center gap-x-5" style={{ '--i': 1 } as React.CSSProperties}>
              <a href={`#${item.slug}`} className="link inline-flex min-h-11 items-center text-small font-semibold">
                Explore<span className="sr-only"> {item.name}</span>
              </a>
              {isAvailable(item.live) ? (
                <ExternalLink href={item.live.href} className="link inline-flex min-h-11 items-center text-small font-semibold">
                  Live site<span className="sr-only"> for {item.name}</span>
                </ExternalLink>
              ) : null}
              {isAvailable(item.source) ? (
                <ExternalLink href={item.source.href} className="link inline-flex min-h-11 items-center text-small font-semibold">
                  Source<span className="sr-only"> for {item.name}</span>
                </ExternalLink>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Preview a project"
        aria-orientation="vertical"
        className="hero-enter mt-4 border-t border-line"
        style={{ '--i': 3 } as React.CSSProperties}
        onKeyDown={onKeyDown}
        onPointerLeave={() => window.clearTimeout(intent.current)}
      >
        {items.map((it, i) => (
          <button
            key={it.slug}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`hero-tab-${it.slug}`}
            aria-selected={i === active}
            aria-controls="hero-panel"
            tabIndex={i === active ? 0 : -1}
            data-active={i === active ? '' : undefined}
            onPointerEnter={(e) => e.pointerType === 'mouse' && choose(i, INTENT_DELAY)}
            onClick={() => choose(i)}
            className="index-row flex min-h-[3rem] w-full items-baseline justify-between gap-4 border-b border-line py-2 text-left"
          >
            <span className="font-display text-[1.75rem] font-semibold leading-none" translate="no">
              {it.name}
            </span>
            <span className="text-small text-muted">{it.place}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
