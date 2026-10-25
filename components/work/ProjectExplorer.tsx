'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

export type ExplorerTab = { slug: string; name: string; place: string }

/**
 * The projects as tabs. Panels are server-rendered (ProjectPanel) and passed in; this only decides which one is
 * shown. Without JavaScript every panel is visible and the tabs are hidden.
 */
export default function ProjectExplorer({ tabs, panels }: { tabs: ExplorerTab[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const slugs = tabs.map((t) => t.slug)

  const show = useCallback((index: number, scroll: boolean) => {
    setActive(index)
    if (!scroll) return
    requestAnimationFrame(() => {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      rootRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    })
  }, [])

  // Links to a project anywhere on the page (hero, route map, skills) open its tab here.
  useEffect(() => {
    const fromHash = () => {
      const i = slugs.indexOf(window.location.hash.slice(1))
      if (i >= 0) show(i, true)
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest?.('a[href^="#"], a[href^="/#"]')
      if (!link) return
      const slug = (link.getAttribute('href') ?? '').replace(/^\/?#/, '')
      const i = slugs.indexOf(slug)
      if (i < 0) return
      e.preventDefault()
      history.pushState(null, '', `#${slug}`)
      show(i, true)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', fromHash)
      document.removeEventListener('click', onClick)
    }
    // slugs is derived from static props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (keys[e.key] + tabs.length) % tabs.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div ref={rootRef} className="explorer">
      <div role="tablist" aria-label="Projects" className="explorer-tabs" onKeyDown={onKeyDown}>
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`tab-${t.slug}`}
            aria-selected={i === active}
            aria-controls={t.slug}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="explorer-tab"
          >
            <span className="font-display text-[1.625rem] font-semibold leading-none" translate="no">
              {t.name}
            </span>
            <span className="mt-1 block text-fine text-muted">{t.place}</span>
          </button>
        ))}
      </div>

      {tabs.map((t, i) => (
        <section
          key={t.slug}
          id={t.slug}
          role="tabpanel"
          aria-labelledby={`tab-${t.slug}`}
          data-active={i === active ? '' : undefined}
          className="explorer-panel"
        >
          {panels[i]}
        </section>
      ))}
    </div>
  )
}
