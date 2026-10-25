/**
 * A faint road behind the hero: two edges and a dashed lane line, drawn once on load and then still.
 * The coordinates are Pune's. Purely decorative, so it's hidden from assistive technology.
 */
const CENTER = 'M -60 880 C 260 870 420 640 700 600 S 1150 360 1500 170'
const LEFT = 'M -60 830 C 250 820 400 590 680 550 S 1130 310 1500 120'
const RIGHT = 'M -60 930 C 270 920 440 690 720 650 S 1170 410 1500 220'

export default function HeroRoad() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="hero-road h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d={LEFT} pathLength={1} className="road-edge" />
        <path d={RIGHT} pathLength={1} className="road-edge" />
        <path d={CENTER} className="road-center" />
      </svg>
      <p className="hero-coords tabular absolute bottom-6 right-[max(1rem,4vw)] text-fine text-muted">
        18.52°&nbsp;N, 73.86°&nbsp;E
      </p>
    </div>
  )
}
