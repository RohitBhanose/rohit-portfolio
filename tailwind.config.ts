import type { Config } from 'tailwindcss'

/** Colours are CSS variables (RGB channels) defined in app/globals.css, so both themes share one set of class names. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  // `hover:` utilities only on devices that can hover, so a tapped link doesn't stay "hovered" on touch.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        'line-strong': token('line-strong'),
        signal: token('signal'),
        'on-signal': token('on-signal'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        name: ['clamp(6rem, 2.4rem + 15vw, 11rem)', { lineHeight: '0.84', letterSpacing: '-0.012em' }],
        h2: ['clamp(2.75rem, 1.9rem + 3.6vw, 5.25rem)', { lineHeight: '0.92', letterSpacing: '-0.008em' }],
        h3: ['clamp(2.25rem, 1.7rem + 2.3vw, 3.75rem)', { lineHeight: '0.95', letterSpacing: '-0.006em' }],
        deck: ['clamp(1.375rem, 1.15rem + 0.95vw, 2rem)', { lineHeight: '1.25', letterSpacing: '-0.005em' }],
        lead: ['clamp(1.125rem, 1.06rem + 0.28vw, 1.3125rem)', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        small: ['0.9375rem', { lineHeight: '1.5' }],
        fine: ['0.8125rem', { lineHeight: '1.45' }],
      },
      maxWidth: {
        page: '78rem',
        measure: '65ch',
      },
      spacing: {
        gutter: 'clamp(1rem, 4vw, 3rem)',
        section: 'clamp(3.5rem, 2rem + 4.5vw, 6.5rem)',
      },
      borderRadius: {
        plate: '0.875rem',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}

export default config
