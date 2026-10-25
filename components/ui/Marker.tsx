export type MarkerKind = 'role' | 'study'

/**
 * The timeline's sign shapes: a ring for a role, a circle for study (projects are diamonds on the board and strip).
 * Decorative: the text next to a marker always says what it is.
 */
export default function Marker({ kind, className = '' }: { kind: MarkerKind; className?: string }) {
  return <span aria-hidden="true" className={`marker marker-${kind} ${className}`} />
}
