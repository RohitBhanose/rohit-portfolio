'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${glow ? 'shadow-neon-sm' : ''} ${className}`}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}



