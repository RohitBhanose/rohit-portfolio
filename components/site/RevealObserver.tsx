'use client'

import { useEffect } from 'react'

/**
 * One shared observer for every `[data-reveal]` element. Hidden start states only apply after
 * `.reveal-ready` is set here, so content is never hidden when JavaScript doesn't run.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    // Read every position first, then write: anything already on screen is shown without animating.
    const height = window.innerHeight
    const onScreen = targets.map((el) => {
      const rect = el.getBoundingClientRect()
      return rect.top < height && rect.bottom > 0
    })
    targets.forEach((el, i) => onScreen[i] && el.setAttribute('data-visible', ''))
    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-visible', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    targets.forEach((el, i) => !onScreen[i] && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
