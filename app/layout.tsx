import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import CursorGlow from '@/components/CursorGlow'
import ParticleBackground from '@/components/ParticleBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rohit Bhanose | CSE AI & DS Engineering Student',
  description: 'Portfolio of Rohit Bhanose - CSE AI & DS Engineering Student at MIT World Peace University. Passionate about AI, Machine Learning, and Data Science.',
  keywords: 'Rohit Bhanose, AI Engineer, Data Scientist, Machine Learning, Python, C++, MITWPU, IIT Madras',
  authors: [{ name: 'Rohit Bhanose' }],
  openGraph: {
    title: 'Rohit Bhanose | CSE AI & DS Engineering Student',
    description: 'Portfolio of Rohit Bhanose - CSE AI & DS Engineering Student',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-white antialiased`}>
        <CursorGlow />
        <ParticleBackground />
        <Navigation />
        {children}
      </body>
    </html>
  )
}

