import Hero from '@/components/hero/Hero'
import Work from '@/components/work/Work'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <About />
      <Contact />
    </>
  )
}
