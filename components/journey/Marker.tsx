import type { StopKind } from '@/content/journey'

export default function Marker({ kind }: { kind: StopKind }) {
  return <span aria-hidden="true" className={`stop-marker stop-${kind}`} />
}
