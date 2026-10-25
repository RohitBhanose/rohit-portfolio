export const site = {
  name: 'Rohit Bhanose',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rohitbhanose.vercel.app',
  title: 'Rohit Bhanose: software, AI/ML and data science',
  description:
    'Rohit Bhanose: CSE (AI & Data Science) student at MIT-WPU and co-founder of SwiftDineOS. Open to software engineering, AI/ML and data science internships.',
  /** The hero's one-line positioning statement. */
  positioning: 'I build software products end to end, with AI where it earns its place.',
  availability: {
    roles: ['Software Engineering', 'AI/ML', 'Data Science'],
    line: 'Open to internships',
  },
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
