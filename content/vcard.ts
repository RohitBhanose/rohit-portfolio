import { site } from './site'

/**
 * RFC 6350 needs CRLF after every line, including the last. Built at runtime on purpose: a literal '\r\n'
 * gets folded into a template literal by the minifier, and template literals normalise CRLF to LF.
 */
const CRLF = String.fromCharCode(13, 10)

/** vCard 3.0 contact card, shared by the QR code and the downloadable .vcf. No phone number by design. */
export const vcard = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Bhanose;Rohit;;;',
  'FN:Rohit Bhanose',
  'TITLE:Co-founder\\, SwiftDineOS',
  `EMAIL;TYPE=INTERNET:${site.email}`,
  `URL:${site.url}`,
  `URL:${site.social.linkedin}`,
  'END:VCARD',
]
  .map((line) => line + CRLF)
  .join('')
