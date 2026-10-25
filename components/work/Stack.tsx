import { Fragment } from 'react'

/** "Built with" line. Each tool name is marked translate="no" so page translation leaves it alone. */
export default function Stack({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <p className={`max-w-4xl text-small text-muted ${className}`}>
      <span className="font-semibold text-ink">Built with</span>{' '}
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 ? ', ' : null}
          <span translate="no">{item}</span>
        </Fragment>
      ))}
    </p>
  )
}
