'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Code, Clock, TrendingUp } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Project {
  title: string
  description: string
  tech: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  time: string
  impact: string
  github?: string
  demo?: string
  image?: string
}

const projects: Project[] = [
  {
    title: 'Student Manager WebApp',
    description: 'A unified platform for Students, Teachers, Schools and Colleges. Developed using Python Flask, Bootstrap HTML and SQLite Database. Features comprehensive student management system with user authentication and data management.',
    tech: ['Python', 'Flask', 'HTML', 'Bootstrap', 'SQLite'],
    difficulty: 'Intermediate',
    time: '2 months',
    impact: 'Full Stack App',
    github: 'https://github.com/RohitBhanose/Student-Manager-Project',
  },
]

const difficultyColors = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/50',
  Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/50',
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Section id="projects" title="Featured Projects" subtitle="My Work">
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col" hover glow>
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg mb-4 flex items-center justify-center">
                <Code size={48} className="text-white/30" />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 gradient-text">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 flex-1">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs glass rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-gray-400">
                    <TrendingUp size={14} />
                    <span>{project.impact}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={14} />
                    <span>{project.time}</span>
                  </div>
                  <div
                    className={`px-2 py-1 rounded border text-center ${difficultyColors[project.difficulty]}`}
                  >
                    {project.difficulty}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  {project.github && (
                    <Button
                      href={project.github}
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Github size={16} />
                      Code
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      href={project.demo}
                      variant="primary"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

