'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

interface TimelineItem {
  type: 'education' | 'experience'
  title: string
  organization: string
  period: string
  description: string[]
  icon: typeof Briefcase | typeof GraduationCap
}

const timeline: TimelineItem[] = [
  {
    type: 'experience',
    title: 'Digital Marketing and Social Media Head',
    organization: 'aiera mindlabs',
    period: '11/2025 - Present',
    description: [
      'Leading the digital presence of aiera mindlabs across Instagram, LinkedIn, and other platforms',
      'Planning and executing marketing strategies, managing brand communication',
      'Creating high-quality posts, carousels, and product launch creatives',
      'Handling both strategic direction and hands-on design execution for AI products and clients',
    ],
    icon: Briefcase,
  },
  {
    type: 'experience',
    title: 'Intern',
    organization: 'bizAmica Software',
    period: '05/2025 - 06/2025',
    description: [
      'Trained Deep learning models to process and extract information from documents and images',
      'Contributed to multiple projects including FASTag application processing',
      'Worked on insurance document verification and automated data sorting',
      'Improved accuracy and efficiency of workflows',
    ],
    icon: Briefcase,
  },
  {
    type: 'education',
    title: 'Computer Science Engineering (AI & DS)',
    organization: 'MIT World Peace University',
    period: '07/2025 - Present',
    description: [
      'Pursuing degree in Computer Science with specialization in AI & Data Science',
      'Building strong foundation in programming, statistics, and problem-solving',
      'Actively involved in academic projects and continuous skill development',
    ],
    icon: GraduationCap,
  },
  {
    type: 'education',
    title: 'BS Data Science and Applications (Foundation)',
    organization: 'IIT Madras Online BS Degree Program',
    period: '05/2025 - Present',
    description: [
      'Enrolled in IIT Madras Online BS Degree Program',
      'Foundation course in Data Science and Applications',
      'Learning from premier institution curriculum',
    ],
    icon: GraduationCap,
  },
  {
    type: 'education',
    title: 'HSC (Class XII)',
    organization: 'Kalmadi Shamarao Junior College',
    period: '08/2023 - 03/2025',
    description: [
      'Completed Higher Secondary Education',
      'Score: 76.33%',
    ],
    icon: GraduationCap,
  },
  {
    type: 'education',
    title: 'SSC (Class X)',
    organization: 'Abhinava Vidyalaya English Medium School',
    period: '06/2009 - 03/2023',
    description: [
      'Completed Secondary School Education',
      'Score: 90.00%',
    ],
    icon: GraduationCap,
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Section id="experience" title="Experience & Education" subtitle="My Journey">
      <div ref={ref} className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {timeline.map((item, index) => {
            const Icon = item.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={`${item.type}-${index}`}
                className="relative"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background transform md:-translate-x-1/2 -translate-y-1 z-10 shadow-neon-sm" />

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <Card className="h-full" hover glow>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${item.type === 'education' ? 'bg-primary/20' : 'bg-accent/20'}`}>
                        <Icon
                          className={item.type === 'education' ? 'text-primary' : 'text-accent'}
                          size={24}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              item.type === 'education'
                                ? 'bg-primary/20 text-primary border border-primary/50'
                                : 'bg-accent/20 text-accent border border-accent/50'
                            }`}
                          >
                            {item.type === 'education' ? 'Education' : 'Experience'}
                          </span>
                        </div>
                        <p className="text-accent font-semibold mb-2">{item.organization}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                          <Calendar size={16} />
                          <span>{item.period}</span>
                        </div>
                        <ul className="space-y-2">
                          {item.description.map((desc, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-accent mt-1.5">▸</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

