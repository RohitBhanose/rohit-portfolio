'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, site } from '@/content/site'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<string | null>(null)
  const activeRef = useRef<string | null>(null)

  // Hairline under the header once the page has scrolled. Written straight to the DOM: no re-render per scroll.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    let frame = 0
    const update = () => {
      frame = 0
      header.toggleAttribute('data-scrolled', window.scrollY > 8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Track which section sits in the middle band of the viewport. (Sections only exist on the home page.)
  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = nav.find(({ id }) => visible.has(id))
        setActive(current ? current.id : null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Slide the indicator under the active link. Stable (reads a ref), so the ResizeObserver below is
  // created once; re-creating it on every change fired an extra callback that cancelled the slide.
  const placeIndicator = useCallback((animate: boolean) => {
    const indicator = indicatorRef.current
    const list = listRef.current
    if (!indicator || !list) return
    const id = activeRef.current
    const link = id ? list.querySelector<HTMLElement>(`a[href="/#${id}"]`) : null
    if (!link) {
      indicator.style.opacity = '0'
      return
    }
    const transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`
    if (indicator.style.transform === transform) return
    const wasHidden = indicator.style.opacity !== '1'
    if (!animate || wasHidden) indicator.style.transition = 'none'
    indicator.style.transform = transform
    if (!animate || wasHidden) {
      void indicator.offsetWidth
      indicator.style.transition = ''
    }
    indicator.style.opacity = '1'
  }, [])

  useEffect(() => {
    activeRef.current = active
    placeIndicator(true)
  }, [active, placeIndicator])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const observer = new ResizeObserver(() => placeIndicator(false))
    observer.observe(list)
    return () => observer.disconnect()
  }, [placeIndicator])

  // The sheet is mobile-only. If the viewport grows past the breakpoint while it's open (rotating a tablet),
  // close it: a hidden modal dialog would otherwise leave the whole page inert.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches && dialogRef.current?.open) dialogRef.current.close()
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const openMenu = () => {
    dialogRef.current?.showModal()
    document.documentElement.style.overflow = 'hidden'
  }
  const closeMenu = () => dialogRef.current?.close()
  const onMenuClosed = () => {
    document.documentElement.style.overflow = ''
  }

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 h-[var(--header-h)] bg-bg">
      <div className="page flex h-full items-center justify-between gap-6">
        <a
          href="/#top"
          translate="no"
          className="brand -ml-1 flex min-h-11 items-center px-1 font-display text-[1.625rem] font-semibold leading-none"
        >
          Rohit Bhanose
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul ref={listRef} className="relative flex items-center gap-1">
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`/#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  className="nav-link flex min-h-11 items-center px-3 text-small font-medium text-muted"
                >
                  {label}
                </a>
              </li>
            ))}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="nav-indicator pointer-events-none absolute bottom-1 left-0 h-[3px] w-px origin-left bg-signal opacity-0"
            />
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={site.resume.href}
            target="_blank"
            rel="noopener"
            className="nav-link hidden min-h-11 items-center px-3 text-small font-medium text-muted sm:flex"
          >
            Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            className="ghost-button flex min-h-11 items-center gap-2 rounded-full px-3 text-small font-semibold lg:hidden"
          >
            <Menu aria-hidden="true" size={20} strokeWidth={2} />
            Menu
          </button>
        </div>
      </div>

      <dialog ref={dialogRef} className="menu-sheet lg:hidden" aria-label="Menu" onClose={onMenuClosed}>
        <div className="page flex h-[var(--header-h)] items-center justify-between">
          <span className="font-display text-[1.625rem] font-semibold leading-none" translate="no">
            Rohit Bhanose
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className="ghost-button flex min-h-11 items-center gap-2 rounded-full px-3 text-small font-semibold"
          >
            <X aria-hidden="true" size={20} strokeWidth={2} />
            Close
          </button>
        </div>
        <nav aria-label="Sections" className="page pt-6">
          <ul className="flex flex-col">
            {nav.map(({ id, label }, i) => (
              <li key={id} className="menu-item border-b border-line" style={{ '--i': i } as React.CSSProperties}>
                <a
                  href={`/#${id}`}
                  onClick={closeMenu}
                  className="menu-link flex min-h-16 items-center font-display text-[2.5rem] font-semibold leading-none"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-8 flex flex-wrap gap-3" style={{ '--i': nav.length } as React.CSSProperties}>
            <a href={site.resume.href} download={site.resume.fileName} className="btn btn-primary" onClick={closeMenu}>
              Download résumé
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-secondary">
              Email me
            </a>
          </div>
        </nav>
      </dialog>
    </header>
  )
}
