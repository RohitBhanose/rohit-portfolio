export type MarkerKind = 'project' | 'role' | 'study'

/**
 * The road-sign shapes the whole page shares: a diamond for a project, a ring for a role, a circle for study.
 * Decorative: the text next to a marker always says what it is.
 */
export default function Marker({ kind, className = '' }: { kind: MarkerKind; className?: string }) {
  return <span aria-hidden="true" className={`marker marker-${kind} ${className}`} />
}
