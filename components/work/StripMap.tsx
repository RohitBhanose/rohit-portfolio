'use client'

import { useEffect, useState } from 'react'

/**
 * A sticky strip of the five projects (desktop only): plain links to each section, with the marker of the one in
 * view filled in. It only navigates; nothing is hidden behind it.
 */
export default function StripMap({ stops }: { stops: { slug: string; name: string }[] }) {
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    const sections = stops.map((s) => document.getElementById(s.slug)).filter((el): el is HTMLElement => el !== null)
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setCurrent(stops.find((s) => visible.has(s.slug))?.slug ?? null)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [stops])

  return (
    <nav aria-label="Projects" className="strip">
      <ol>
        {stops.map((stop) => (
          <li key={stop.slug}>
            <a href={`#${stop.slug}`} aria-current={current === stop.slug ? 'location' : undefined} translate="no">
              <span aria-hidden="true" className="strip-stop" />
              {stop.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
