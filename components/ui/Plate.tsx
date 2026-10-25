import type { Shot } from '@/content/types'

type PlateProps = {
  shot: Shot
  /** The `sizes` attribute for this placement, so the browser picks the right width. */
  sizes: string
  priority?: boolean
  caption?: boolean
  reveal?: boolean
  className?: string
}

export function srcSetFor(shot: Shot) {
  return shot.widths.map((w) => `${shot.src}-${w}.webp ${w}w`).join(', ')
}

export function srcFor(shot: Shot) {
  return `${shot.src}-${shot.widths[0]}.webp`
}

/** A framed screenshot. Images are pre-sized WebP (this is a static export, so there's no image optimiser). */
export default function Plate({ shot, sizes, priority = false, caption = true, reveal = true, className }: PlateProps) {
  return (
    <figure className={className}>
      <div
        className="plate"
        data-reveal={reveal ? 'plate' : undefined}
        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
      >
        <img
          src={srcFor(shot)}
          srcSet={srcSetFor(shot)}
          sizes={sizes}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          data-tone={shot.tone}
        />
      </div>
      {caption ? <figcaption className="mt-3 text-fine text-muted">{shot.caption}</figcaption> : null}
    </figure>
  )
}
