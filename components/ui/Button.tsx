'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
  download?: boolean
  target?: string
  rel?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  type = 'button',
  download,
  target,
  rel,
}: ButtonProps) {
  const baseStyles = 'relative font-semibold rounded-full transition-all duration-300 overflow-hidden group'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-neon hover:shadow-neon-lg',
    secondary: 'bg-background-light glass border border-primary/50 text-primary hover:border-primary',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} target={target || '_blank'} rel={rel || 'noopener noreferrer'} download={download}>
        {buttonContent}
      </a>
    )
  }

  return buttonContent
}

