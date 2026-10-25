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
    'computer vision',
    'full-stack',
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
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Rohit Bhanose: I build software for real places.' }],
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

/** Runs before first paint so an explicit theme choice never flashes. "Auto" stays with the CSS media query. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
