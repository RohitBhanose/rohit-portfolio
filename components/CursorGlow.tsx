'use client'

import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 150,
        top: mousePosition.y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        transition: 'transform 0.1s ease-out',
      }}
    />
  )
}



