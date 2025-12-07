/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Brain, Database, TrendingUp } from 'lucide-react' // Removed Download
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
// Removed Button import as it is no longer used in this file

const facts = [
  {
    icon: Code,
    label: 'Languages',
    value: 'C++, Python, C',
    color: 'text-primary',
  },
  {
    icon: Brain,
    label: 'Education',
    value: 'MITWPU & IIT Madras',
    color: 'text-accent',
  },
  {
    icon: Database,
    label: 'Web Development',
    value: 'HTML, Flask',
    color: 'text-primary',
  },
  {
    icon: TrendingUp,
    label: 'Experience',
    value: 'Digital Marketing Head',
    color: 'text-accent',
  },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Section id="about" title="About Me" subtitle="Get to Know Me">
      <div ref={ref} className="grid md:grid-cols-2 gap-8">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-full" glow>
            <h3 className="text-2xl font-bold mb-4 gradient-text">Who I Am</h3>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              I'm <span className="text-white font-bold">Rohit Bhanose</span>, a first-year <span className="text-accent font-medium">Computer Science (AI & Data Science)</span> student with a strong 
              foundation in <span className="text-primary">programming, statistics, and problem-solving</span>. I'm passionate about applying 
              <span className="text-accent"> AI concepts</span> to real-world challenges, building impactful projects, and expanding my technical expertise.
            </p>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Currently pursuing my degree at <span className="text-white font-medium">MIT World Peace University</span> and <span className="text-white font-medium">IIT Madras Online BS Degree Program</span>, 
              I'm actively involved in academic projects and continuous skill development through online courses 
              and certifications. I also lead digital marketing efforts at <span className="text-accent">Aiera Mindlabs</span> and have experience 
              training AI models using <span className="text-primary font-medium">Deep Learning</span>.
            </p>

            {/* Button Removed Here */}
          </Card>
        </motion.div>

        {/* Right: Infographic Facts */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {facts.map((fact, index) => {
              const Icon = fact.icon
              return (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="text-center h-full" hover>
                    <div className={`${fact.color} mb-3 flex justify-center`}>
                      <Icon size={32} />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{fact.label}</p>
                    <p className="text-white font-bold text-lg">{fact.value}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Additional Info Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card hover>
          <h4 className="text-xl font-bold mb-2 text-primary">Education</h4>
          <p className="text-gray-300 text-sm">
            CSE (AI & DS) at MIT World Peace University & BS Data Science at IIT Madras Online
          </p>
        </Card>
        <Card hover>
          <h4 className="text-xl font-bold mb-2 text-accent">Interests</h4>
          <p className="text-gray-300 text-sm">
            Coding, Music Production, Gaming, Chess, Formula 1, and Cooking
          </p>
        </Card>
        <Card hover>
          <h4 className="text-xl font-bold mb-2 text-primary">Skills</h4>
          <p className="text-gray-300 text-sm">
            Leadership, Team Management, Creative Direction, Communication, and Strategic Thinking
          </p>
        </Card>
      </motion.div>
    </Section>
  )
}
