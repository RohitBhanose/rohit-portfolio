import type { Highlight } from '@/content/types'

export default function Highlights({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null
  const columns = items.length >= 4 ? 'md:grid-cols-2 xl:grid-cols-4' : items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  return (
    <ul className={`grid gap-x-8 gap-y-7 ${columns}`}>
      {items.map((item) => (
        <li key={item.title} className="border-t-2 border-ink pt-4">
          <p className="font-semibold">{item.title}</p>
          <p className="mt-2 text-small text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  )
}
