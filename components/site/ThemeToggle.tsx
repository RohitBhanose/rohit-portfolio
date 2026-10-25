'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const query = '(prefers-color-scheme: dark)'

function effectiveTheme(): 'light' | 'dark' {
  const explicit = document.documentElement.getAttribute('data-theme')
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia(query).matches ? 'dark' : 'light'
}

/** Browser chrome follows an explicit choice too, not just the system setting. */
function syncThemeColor(theme: 'light' | 'dark') {
  const color = theme === 'dark' ? '#14181A' : '#EDEEEA'
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', color))
}

export default function ThemeToggle() {
  // Unknown until mounted: the server can't know the visitor's theme, so render a neutral state first.
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    const initial = effectiveTheme()
    setTheme(initial)
    if (document.documentElement.hasAttribute('data-theme')) syncThemeColor(initial)
    const media = window.matchMedia(query)
    const onChange = () => setTheme(effectiveTheme())
    // Safari 13 and older only have the deprecated addListener; calling addEventListener there throws.
    if (media.addEventListener) media.addEventListener('change', onChange)
    else media.addListener(onChange)
    return () => (media.removeEventListener ? media.removeEventListener('change', onChange) : media.removeListener(onChange))
  }, [])

  const toggle = () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('no-transitions')
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private mode or blocked storage: the switch still applies for this visit.
    }
    syncThemeColor(next)
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('no-transitions')))
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : isDark}
      className="flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:text-ink"
    >
      {isDark ? (
        <Sun aria-hidden="true" size={19} strokeWidth={2} />
      ) : (
        <Moon aria-hidden="true" size={19} strokeWidth={2} />
      )}
    </button>
  )
}
