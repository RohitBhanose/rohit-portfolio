'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

const skillData = [
  { name: 'C++', level: 90, color: '#6C63FF' },
  { name: 'HTML', level: 90, color: '#00E5FF' },
  { name: 'Python', level: 75, color: '#6C63FF' },
  { name: 'C', level: 80, color: '#00E5FF' },
  { name: 'Digital Marketing', level: 85, color: '#6C63FF' },
  { name: 'Content Creation', level: 85, color: '#00E5FF' },
]

const proficiencyData = [
  { name: 'Programming', value: 85, color: '#6C63FF' },
  { name: 'Web Development', value: 80, color: '#00E5FF' },
  { name: 'Digital Marketing', value: 85, color: '#6C63FF' },
  { name: 'AI/ML', value: 70, color: '#00E5FF' },
]

const SkillBar = ({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-semibold">{name}</span>
        <span className="text-gray-400 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-background-light rounded-full h-3 overflow-hidden">
        <motion.div
          ref={ref}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Section id="skills" title="Skills & Expertise" subtitle="What I Do Best">
      <div ref={ref} className="grid md:grid-cols-2 gap-8">
        {/* Left: Skill Bars */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-full" glow>
            <h3 className="text-2xl font-bold mb-6 gradient-text">Technical Skills</h3>
            {skillData.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
                delay={index * 0.1}
              />
            ))}
          </Card>
        </motion.div>

        {/* Right: Radial Charts */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full" glow>
            <h3 className="text-2xl font-bold mb-6 gradient-text text-center">Proficiency Levels</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={proficiencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {proficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#141B2E',
                      border: '1px solid rgba(108, 99, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {proficiencyData.map((item) => (
                <div key={item.name} className="text-center">
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-sm text-gray-300">{item.name}</p>
                  <p className="text-lg font-bold text-white">{item.value}%</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Additional Skills Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {['Flask', 'SQLite', 'Bootstrap', 'Canva', 'Figma', 'Deep Learning', 'Social Media', 'Analytics'].map(
          (skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
            >
              <Card className="text-center" hover>
                <p className="text-white font-semibold">{skill}</p>
              </Card>
            </motion.div>
          )
        )}
      </motion.div>
    </Section>
  )
}

