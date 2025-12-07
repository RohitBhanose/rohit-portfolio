'use client'

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  download?: boolean
  // target, rel, etc. are available via anchor attributes if needed
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
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyles =
    'relative font-semibold rounded-full transition-all duration-300 overflow-hidden group inline-block'

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-neon hover:shadow-neon-lg',
    secondary: 'bg-background-light glass border border-primary/50 text-primary hover:border-primary',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  }

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const commonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  // Button element
  const buttonEl = (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${commonClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.button>
  )

  // Anchor element (for href). If disabled, prevent navigation.
  if (href) {
    return (
      <motion.a
        href={disabled ? undefined : href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        download={download}
        className={`${commonClass} ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
          }
          if (onClick) onClick()
        }}
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        aria-disabled={disabled}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={false}
        />
      </motion.a>
    )
  }

  return buttonEl
}
