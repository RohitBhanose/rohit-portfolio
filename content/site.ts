export const site = {
  name: 'Rohit Bhanose',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rohitbhanose.vercel.app',
  title: 'Rohit Bhanose — CSE (AI & Data Science) student and co-founder of SwiftDineOS',
  description:
    'Rohit Bhanose builds full-stack and AI software for real places: restaurant tables, parking gates, event halls and city streets. Co-founder of SwiftDineOS, an AI-powered restaurant operating system; B.Tech CSE (AI & Data Science) at MIT-WPU and BS in Data Science and Applications at IIT Madras.',
  location: 'Pune, India',
  email: 'rohit.bhanose@gmail.com',
  resume: { href: '/resume.pdf', fileName: 'Rohit-Bhanose-Resume.pdf' },
  social: {
    github: 'https://github.com/RohitBhanose',
    linkedin: 'https://www.linkedin.com/in/rohit-bhanose/',
    swiftdine: 'https://www.swiftdineos.in/',
  },
} as const

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const
