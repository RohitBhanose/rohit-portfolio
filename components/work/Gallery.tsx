'use client'

import { useState, type ReactNode } from 'react'

export type GalleryItem = { caption: string; thumb: string; tone?: string }

/**
 * Several screenshots of one project: one shown, the rest one tap away as thumbnails. The plates (with their
 * visible captions) are server-rendered; each thumbnail is named by its caption for screen readers.
 */
export default function Gallery({ name, items, plates }: { name: string; items: GalleryItem[]; plates: ReactNode[] }) {
  const [index, setIndex] = useState(0)
  return (
    <div>
      <div key={index} className="m-fade">
        {plates[index]}
      </div>
      <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label={`${name} screenshots`}>
        {items.map((item, i) => (
          <button key={item.thumb} type="button" aria-pressed={i === index} onClick={() => setIndex(i)} className="shot-thumb m-press">
            <img src={item.thumb} alt="" width={96} height={60} loading="lazy" decoding="async" data-tone={item.tone} />
            <span className="sr-only">
              Show screenshot {i + 1}: {item.caption}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
