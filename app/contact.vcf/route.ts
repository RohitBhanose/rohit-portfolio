import { vcard } from '@/content/vcard'

export const dynamic = 'force-static'

// Emitted as the static file out/contact.vcf. Static hosts set the type from the .vcf extension, and the
// download attribute on the link in Contact.tsx supplies the filename, so no response headers are needed here.
export function GET() {
  return new Response(vcard)
}
