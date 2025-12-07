'use client'

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type ButtonBaseProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// All button props (no href)
type RealButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

// All anchor props (with href, download etc.)
type AnchorButtonProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export type ButtonProps = RealButtonProps | AnchorButtonProps

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled,
    ...rest
  } = props

  const baseStyles =
    'relative font-semibold rounded-full transition-all duration-300 overflow-hidden group inline-block'

  const variants: Record<NonNullable<ButtonBaseProps['variant']>, string> = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-neon hover:shadow-neon-lg',
    secondary: 'bg-background-light glass border border-primary/50 text-primary hover:border-primary',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  }

  const sizes: Record<NonNullable<ButtonBaseProps['size']>, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const commonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  const motionProps = disabled
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }

  // If href exists, render as <a>
  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorButtonProps

    return (
      <motion.a
        href={disabled ? undefined : href}
        className={`${commonClass} ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        aria-disabled={disabled}
        {...motionProps}
        {...anchorRest}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={false}
        />
      </motion.a>
    )
  }

  // Otherwise render as <button>
  const buttonRest = rest as RealButtonProps

  return (
    <motion.button
      type={buttonRest.type ?? 'button'}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${commonClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      {...motionProps}
      {...buttonRest}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.button>
  )
}
