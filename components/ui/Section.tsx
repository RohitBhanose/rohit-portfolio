'use client'

import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface SectionProps {
  children: ReactNode
  id: string
  title?: string
  subtitle?: string
  className?: string
}

export default function Section({ children, id, title, subtitle, className = '' }: SectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id={id} className={`section-padding ${className}`} ref={ref}>
      <div className="container-custom">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}



