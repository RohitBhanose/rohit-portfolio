import QRCode from 'qrcode'
import { vcard } from '@/content/vcard'

const QUIET_ZONE = 4

/** Encodes the contact card at build time and draws it as one SVG path. Ships no JavaScript. */
function qrPath() {
  const { modules } = QRCode.create(vcard, { errorCorrectionLevel: 'M' })
  const size = modules.size
  let d = ''
  for (let y = 0; y < size; y++) {
    let x = 0
    while (x < size) {
      if (!modules.get(y, x)) {
        x++
        continue
      }
      const start = x
      while (x < size && modules.get(y, x)) x++
      d += `M${start + QUIET_ZONE} ${y + QUIET_ZONE}h${x - start}v1h-${x - start}z`
    }
  }
  return { d, extent: size + QUIET_ZONE * 2 }
}

export default function ContactQr() {
  const { d, extent } = qrPath()
  // Always dark modules on white, in both themes: phone cameras read inverted codes unreliably.
  return (
    <svg
      viewBox={`0 0 ${extent} ${extent}`}
      role="img"
      aria-label="QR code that saves Rohit Bhanose’s contact card"
      shapeRendering="crispEdges"
      className="block h-auto w-full rounded-plate"
    >
      <rect width={extent} height={extent} fill="#FFFFFF" />
      <path d={d} fill="#1B2023" />
    </svg>
  )
}
