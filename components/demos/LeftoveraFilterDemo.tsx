'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * A miniature of Leftovera's directory filters. The organisations are fictional sample data; the city and
 * category options are derived from it, and search and both filters combine in one memoised pass.
 */
type Org = { name: string; description: string; city: string; category: string }

const SAMPLE: Org[] = [
  { name: 'Northside food bank', description: 'Collects cooked surplus from restaurants', city: 'Pune', category: 'Human consumption' },
  { name: 'Riverside community kitchen', description: 'Cooks donated produce into daily meals', city: 'Mumbai', category: 'Human consumption' },
  { name: 'Campus meal share', description: 'Students pass on sealed canteen meals', city: 'Mumbai', category: 'Packaged rations' },
  { name: 'Old town shelter meals', description: 'Evening meals for a night shelter', city: 'Delhi', category: 'Human consumption' },
  { name: 'Market surplus collective', description: 'Unsold vegetables go to cattle sheds', city: 'Mumbai', category: 'Animal feed' },
  { name: 'Lakeside animal feed project', description: 'Kitchen scraps become feed for strays', city: 'Pune', category: 'Animal feed' },
  { name: 'Hillview rations drive', description: 'Packs dry rations for families', city: 'Delhi', category: 'Packaged rations' },
  { name: 'Station road compost co-op', description: 'Composts food that can’t be eaten', city: 'Pune', category: 'Compost' },
]

const unique = (data: Org[], key: 'city' | 'category') => [...new Set(data.map((org) => org[key]))].sort()
const noun = (n: number) => (n === 1 ? 'organisation' : 'organisations')

const field = 'h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-small font-normal text-ink'
const label = 'flex min-w-0 grow basis-40 flex-col gap-1 text-small font-medium text-ink'

export default function LeftoveraFilterDemo() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const intent = useRef<'type' | 'pick' | null>(null)
  const region = useRef<HTMLDivElement>(null)

  // Filter options come from the data, so a new organisation (or a new city) appears in them on its own.
  const cities = useMemo(() => unique(SAMPLE, 'city'), [])
  const categories = useMemo(() => unique(SAMPLE, 'category'), [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SAMPLE.filter(
      (org) =>
        (!q || `${org.name} ${org.description}`.toLowerCase().includes(q)) &&
        (!city || org.city === city) &&
        (!category || org.category === category),
    )
  }, [query, city, category])

  const count = results.length

  // One polite announcement per settled change: typing waits for a pause, picks are announced straight away.
  // Clearing first means an unchanged count is still read out after a new filter.
  useEffect(() => {
    if (!intent.current) return
    const delay = intent.current === 'type' ? 400 : 100
    intent.current = null
    setMessage('')
    const timer = window.setTimeout(
      () => setMessage(count ? `${count} ${noun(count)} found.` : 'No organisations found. Clear filters to start again.'),
      delay,
    )
    return () => window.clearTimeout(timer)
  }, [count, query, city, category])

  const clear = () => {
    intent.current = 'pick'
    setQuery('')
    setCity('')
    setCategory('')
    // The button leaves with the empty state, so focus stays on the results it was in (no phone keyboard pops up).
    region.current?.focus()
  }

  return (
    <div className="flex min-h-[26rem] w-full flex-col gap-4 p-4 sm:p-6">
      <div>
        {/* Search breaks onto its own line before the selects do, so no control is left alone on a row. */}
        <div className="flex flex-wrap gap-3">
          <label className="flex min-w-0 grow-[2] basis-60 flex-col gap-1 text-small font-medium text-ink">
            Search organisations
            <input
              type="search"
              name="q"
              autoComplete="off"
              spellCheck={false}
              placeholder="Try “kitchen”…"
              value={query}
              onChange={(e) => {
                intent.current = 'type'
                setQuery(e.target.value)
              }}
              className={`${field} placeholder:text-muted`}
            />
          </label>
          <div className="flex min-w-0 grow basis-[20.75rem] flex-wrap gap-3">
            <label className={label}>
              City
              <select
                name="city"
                value={city}
                onChange={(e) => {
                  intent.current = 'pick'
                  setCity(e.target.value)
                }}
                className={field}
              >
                <option value="">All cities</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className={label}>
              Category
              <select
                name="category"
                value={category}
                onChange={(e) => {
                  intent.current = 'pick'
                  setCategory(e.target.value)
                }}
                className={field}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p className="mt-2 text-fine text-muted">
          Options built from the data: {cities.length} cities, {categories.length} categories
        </p>
      </div>

      <p className="flex items-center gap-2 text-small text-muted">
        <span className="tabular min-w-[2.25rem] rounded-md bg-signal px-2 py-1 text-center font-display text-[1.5rem] font-semibold leading-none text-on-signal">
          {count}
        </span>
        {noun(count)} found
      </p>

      {/* Fixed height: all 8 rows fit two to a line, so switching between results and the empty state never shifts layout. */}
      <div
        ref={region}
        role="region"
        aria-label="Sample results"
        tabIndex={0}
        className="h-[21rem] overflow-y-auto overscroll-contain rounded-md"
      >
        {count ? (
          <ul role="list" className="grid grid-cols-[repeat(auto-fill,minmax(min(15rem,100%),1fr))] content-start gap-2">
            {results.map((org, i) => (
              <li
                key={org.name}
                style={{ '--i': Math.min(i, 4) } as React.CSSProperties}
                className="m-swap flex min-w-0 flex-col rounded-md bg-bg px-3 py-2"
              >
                <span className="truncate text-small font-semibold text-ink">{org.name}</span>
                <span className="truncate text-fine text-muted">{org.description}</span>
                <span className="flex gap-3 text-fine font-medium text-ink">
                  <span>{org.city}</span>
                  <span className="sr-only">, </span>
                  <span>{org.category}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="m-fade flex h-full flex-col items-center justify-center gap-3 rounded-md bg-bg px-4 text-center">
            <p className="font-display text-[1.5rem] font-semibold leading-none text-ink">No organisations match</p>
            <p className="text-small text-muted">Try a different search, city or category.</p>
            <button type="button" onClick={clear} className="btn btn-secondary">
              Clear filters
            </button>
          </div>
        )}
      </div>

      <p className="mt-auto text-fine text-muted">
        A miniature with sample data. The live directory lists real organisations.
      </p>

      <span role="status" className="sr-only">
        {message}
      </span>
    </div>
  )
}
