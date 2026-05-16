import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const PARTICLE_COUNT = 70
const CONNECTION_DIST = 110

export default function ParticleCanvas({ style }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      const scaleX = canvas.width ? window.innerWidth / canvas.width : 1
      const scaleY = canvas.height ? window.innerHeight / canvas.height : 1
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (particles.length) {
        particles.forEach(p => { p.x *= scaleX; p.y *= scaleY })
      }
    }

    // Call resize first so canvas dimensions are set
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.5 + 0.15,
    }))

    function resize2() {
      const scaleX = window.innerWidth / canvas.width
      const scaleY = window.innerHeight / canvas.height
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.forEach(p => { p.x *= scaleX; p.y *= scaleY })
    }

    window.addEventListener('resize', resize2)

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Batch all connection lines into one path per opacity level is complex,
      // so we use individual strokes but minimise state changes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,210,255,${(1 - dist / CONNECTION_DIST) * 0.1})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,210,255,${p.a})`
        ctx.shadowBlur = 5
        ctx.shadowColor = 'rgba(0,210,255,0.7)'
        ctx.fill()
        ctx.shadowBlur = 0
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize2)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 1,
        ...style,
      }}
    />
  )
}
