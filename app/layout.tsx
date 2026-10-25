import type { Metadata, Viewport } from 'next'
import './globals.css'
import { site } from '@/content/site'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import RevealObserver from '@/components/site/RevealObserver'
import { NEW_TAB_NOTE_ID } from '@/components/ui/ExternalLink'

/** Every face is used above the fold, so all four are preloaded (about 62 kB in total). See globals.css. */
const fonts = ['barlow-400', 'barlow-500', 'barlow-600', 'barlow-condensed-600']

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'Rohit Bhanose',
    'SwiftDineOS',
    'software engineering',
    'AI',
    'AI/ML',
    'data science',
    'computer vision',
    'internship',
    'MIT-WPU',
    'IIT Madras',
    'Pune',
  ],
  alternates: { canonical: '/' },
  // Served from /public rather than app-dir file conventions: Next 14's metadata loaders break on
  // project paths containing an apostrophe (this folder is "Rohit's Portfolio").
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `Rohit Bhanose: ${site.positioning}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og.png'],
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EDEEEA' },
    { media: '(prefers-color-scheme: dark)', color: '#14181A' },
  ],
  colorScheme: 'light dark',
}

/**
 * Runs before first paint: marks JavaScript as available, applies an explicit theme choice without a flash, and
 * hands content back if a page script fails to load (CSS only hides things behind `.js`). Smooth scrolling starts
 * after load, so a shared link such as /#contact opens in place instead of gliding through the whole page.
 */
const headScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}addEventListener('error',function(e){var s=e.target;if(s&&s.tagName==='SCRIPT'&&(s.src||'').indexOf('/_next/')>-1)d.classList.remove('js')},true);addEventListener('load',function(){d.classList.add('smooth')})})()`

/** Structured data built only from facts shown on the page. */
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: 'Co-founder, SwiftDineOS',
  worksFor: { '@type': 'Organization', name: 'SwiftDineOS', url: site.social.swiftdine },
  affiliation: [
    { '@type': 'CollegeOrUniversity', name: 'MIT World Peace University' },
    { '@type': 'CollegeOrUniversity', name: 'IIT Madras' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
  sameAs: [site.social.github, site.social.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        {fonts.map((name) => (
          <link
            key={name}
            rel="preload"
            href={`/fonts/${name}-latin.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        {/* Padding is set in the focus state: `not-sr-only` resets padding to 0 and would otherwise win. */}
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-signal font-semibold text-on-signal focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:px-5 focus:py-3"
        >
          Skip to content
        </a>
        <span id={NEW_TAB_NOTE_ID} hidden>
          Opens in a new tab
        </span>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
