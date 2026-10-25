'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type IndexItem = {
  slug: string
  name: string
  place: string
  caption: string
  /** Server-rendered plate content: a screenshot or a diagram. */
  layer: ReactNode
}

const INTENT_DELAY = 80

/**
 * The hero's project index. Hovering or focusing a row shows that project's real screenshot in the plate.
 * Rows are ordinary links to each project, so touch, keyboard and no-JS visitors lose nothing.
 */
export default function ProjectIndex({ items }: { items: IndexItem[] }) {
  // `active` is the row the visitor asked for; `shownIndex` is the layer actually on screen.
  const [active, setActive] = useState(0)
  const [shownIndex, setShownIndex] = useState(0)
  const [primed, setPrimed] = useState(false)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const shown = useRef(0)
  const intent = useRef<number>()
  const running = useRef<Animation | null>(null)
  const generation = useRef(0)

  // Wipe the requested layer in from the direction the pointer travelled, once its image has decoded.
  // Until then the current screenshot stays put, so the plate is never blank.
  useEffect(() => {
    const token = ++generation.current // cancels any show() still waiting on a decode
    const from = shown.current
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
      shown.current = active
      setShownIndex(active)
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

  const choose = (i: number, delay: number) => {
    window.clearTimeout(intent.current)
    if (delay === 0) setActive(i)
    else intent.current = window.setTimeout(() => setActive(i), delay)
  }

  return (
    <div
      className="grid gap-6"
      // Start fetching the other screenshots as soon as the pointer or focus reaches this column.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPrimed(true)}
      onFocus={() => setPrimed(true)}
    >
      <figure aria-hidden="true" className="hidden lg:block">
        <div className="plate hero-unveil aspect-[16/9]">
          {items.map((item, i) => (
            <div
              key={item.slug}
              ref={(el) => {
                layerRefs.current[i] = el
              }}
              data-on={i === 0 ? '' : undefined}
              className="index-layer absolute inset-0"
            >
              {i === 0 || primed ? item.layer : null}
            </div>
          ))}
        </div>
        {/* Every caption shares one grid cell, so the tallest reserves the height and the list never moves. */}
        <figcaption className="mt-3 grid text-fine text-muted">
          {items.map((item, i) => (
            <span key={item.slug} className={`[grid-area:1/1] ${i === shownIndex ? '' : 'invisible'}`}>
              {item.caption}
            </span>
          ))}
        </figcaption>
      </figure>

      <nav aria-label="Projects" className="hero-enter" style={{ '--i': 3 } as React.CSSProperties}>
        <ul className="border-t border-line" onPointerLeave={() => window.clearTimeout(intent.current)}>
          {items.map((item, i) => (
            <li key={item.slug} className="border-b border-line">
              <a
                href={`#${item.slug}`}
                data-active={i === active ? '' : undefined}
                onPointerEnter={(e) => e.pointerType === 'mouse' && choose(i, INTENT_DELAY)}
                onFocus={() => choose(i, 0)}
                className="index-row group flex min-h-[3.25rem] items-baseline justify-between gap-4 py-2"
              >
                <span className="font-display text-[1.75rem] font-semibold leading-none" translate="no">
                  {item.name}
                </span>
                <span className="text-small text-muted">{item.place}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
