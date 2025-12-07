'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouse = { x: -1000, y: -1000 }
    let isMouseDown = false
    let cooldownUntil = 0

    // EXPLOSION SYSTEM
    const explosions: Array<{
      x: number
      y: number
      radius: number
      alpha: number
    }> = []

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const handleMouseDown = (event: MouseEvent) => { 
      isMouseDown = true 
      explosions.push({
        x: event.clientX,
        y: event.clientY,
        radius: 1, 
        alpha: 0.8
      })
    }
    
    const handleMouseUp = () => { 
      isMouseDown = false 
      cooldownUntil = Date.now() + 1500 
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Configuration
    const particleCount = 400
    const mouseDistance = 250
    const scatterDistance = 350

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      baseAlpha: number
    }> = []

    const colors = [
      'rgba(255, 255, 255, ', // White
      'rgba(255, 255, 255, ', // White
      'rgba(0, 217, 255, ',   // Cyan
      'rgba(147, 51, 234, '   // Purple
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() < 0.8 ? Math.random() * 1.5 : Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentTime = Date.now()
      const isCalm = !isMouseDown && currentTime > cooldownUntil

      // --- 1. ANIMATE EXPLOSIONS ---
      for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i]
        explosion.radius += 12 
        explosion.alpha -= 0.03 

        if (explosion.alpha <= 0) {
          explosions.splice(i, 1)
        } else {
          ctx.beginPath()
          ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            explosion.x, explosion.y, explosion.radius * 0.8,
            explosion.x, explosion.y, explosion.radius
          )
          gradient.addColorStop(0, `rgba(0, 217, 255, 0)`)
          gradient.addColorStop(1, `rgba(0, 217, 255, ${explosion.alpha})`)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      // --- 2. ANIMATE PARTICLES ---
      particles.forEach((particle) => {
        const dxMouse = mouse.x - particle.x
        const dyMouse = mouse.y - particle.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (isMouseDown) {
          // SCATTER MODE
          if (distMouse < scatterDistance) {
            const force = (scatterDistance - distMouse) / scatterDistance
            const repulsionStrength = 6.0 
            particle.vx -= dxMouse * force * repulsionStrength * 0.05
            particle.vy -= dyMouse * force * repulsionStrength * 0.05
          }
        } else if (isCalm) {
           // SWARM MODE
           if (distMouse < mouseDistance) {
            const force = (mouseDistance - distMouse) / mouseDistance
            
            // CHANGED: Reduced from 0.008 to 0.002 for very subtle pull
            const attractionStrength = 0.002 
            
            particle.vx += dxMouse * force * attractionStrength
            particle.vy += dyMouse * force * attractionStrength
          }
        }

        particle.vx *= 0.95
        particle.vy *= 0.95
        particle.x += particle.vx
        particle.y += particle.vy

        // Edge Wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + `${particle.baseAlpha})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}