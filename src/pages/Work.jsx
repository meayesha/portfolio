import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import './Work.css'

export default function Work() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const state = {
      w: 0,
      h: 0,
      streams: [],
      particles: [],
      mouse: { x: 0, y: 0 },
      lastTime: performance.now(),
    }

    const GOLD = '255,195,106' // warm gold
    const SOFT_WHITE = '255,255,255'

    const rand = (min, max) => Math.random() * (max - min) + min

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      state.w = Math.floor(rect.width)
      state.h = Math.floor(rect.height)

      canvas.width = Math.floor(state.w * dpr)
      canvas.height = Math.floor(state.h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // ✅ Slower streams
      const count = Math.max(26, Math.floor(state.w / 40))
      state.streams = Array.from({ length: count }).map((_, i) => {
        const x = (i / (count - 1)) * state.w
        return {
          x: x + rand(-12, 12),
          speed: rand(8, 22),
          alpha: rand(0.06, 0.14),
          width: rand(0.6, 1.2),
          swayAmp: rand(2, 10),
          swaySpeed: rand(0.15, 0.45),
          phase: rand(0, Math.PI * 2),
        }
      })

      // ✅ Slower packets + BIGGER packets
      const packetCount = Math.max(65, Math.floor(state.w / 10))
      state.particles = Array.from({ length: packetCount }).map(() => ({
        x: rand(0, state.w),
        y: rand(0, state.h),
        vy: rand(12, 55),
        r: rand(1.8, 3.6), // ✅ bigger packets
        glow: rand(0.12, 0.34),
        jitter: rand(0.6, 2.1),
      }))
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      state.mouse.x = e.clientX - rect.left
      state.mouse.y = e.clientY - rect.top
    }

    const draw = (dt) => {
      ctx.clearRect(0, 0, state.w, state.h)

      // vignette base
      const vignette = ctx.createRadialGradient(
        state.w * 0.5,
        state.h * 0.35,
        0,
        state.w * 0.5,
        state.h * 0.35,
        Math.max(state.w, state.h) * 0.75
      )
      vignette.addColorStop(0, `rgba(20, 15, 8, 0.22)`)
      vignette.addColorStop(1, `rgba(8, 8, 14, 0.78)`)
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, state.w, state.h)

      // streams
      for (const s of state.streams) {
        const sway = Math.sin(performance.now() * 0.001 * s.swaySpeed + s.phase) * s.swayAmp
        const x = s.x + sway

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, state.h)
        ctx.strokeStyle = `rgba(${SOFT_WHITE}, ${s.alpha})`
        ctx.lineWidth = s.width
        ctx.stroke()

        // gold accent
        ctx.beginPath()
        ctx.moveTo(x + 0.6, 0)
        ctx.lineTo(x + 0.6, state.h)
        ctx.strokeStyle = `rgba(${GOLD}, ${s.alpha * 0.65})`
        ctx.lineWidth = Math.max(0.5, s.width - 0.2)
        ctx.stroke()
      }

      // packets
      for (const p of state.particles) {
        p.y -= p.vy * dt

        // wrap
        if (p.y < -20) {
          p.y = state.h + rand(10, 80)
          p.x = rand(0, state.w)
          p.vy = rand(12, 55)
          p.r = rand(1.8, 3.6) // ✅ bigger reset size too
          p.glow = rand(0.12, 0.34)
        }

        // pull toward nearest stream
        let nearest = state.streams[0]
        let bestDist = Math.abs(p.x - nearest.x)
        for (let i = 1; i < state.streams.length; i++) {
          const d = Math.abs(p.x - state.streams[i].x)
          if (d < bestDist) {
            bestDist = d
            nearest = state.streams[i]
          }
        }
        const pull = Math.min(1, bestDist / 120)
        p.x += (nearest.x - p.x) * (1 - pull) * 0.02

        // calmer mouse repulsion
        const dx = p.x - state.mouse.x
        const dy = p.y - state.mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          const force = (1 - dist / 140) * 0.35
          p.x += (dx / (dist + 0.001)) * force * 1.4
          p.y += (dy / (dist + 0.001)) * force * 0.8
        }

        // micro jitter
        p.x += Math.sin(performance.now() * 0.001 + p.y * 0.01) * p.jitter * 0.03

        // glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD}, ${p.glow * 0.22})`
        ctx.fill()

        // core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD}, 0.55)`
        ctx.fill()
      }

      // soft gold bloom
      const glow = ctx.createRadialGradient(
        state.w * 0.28,
        state.h * 0.22,
        0,
        state.w * 0.28,
        state.h * 0.22,
        state.w * 0.6
      )
      glow.addColorStop(0, `rgba(${GOLD}, 0.10)`)
      glow.addColorStop(1, `rgba(${GOLD}, 0.00)`)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, state.w, state.h)
    }

    const loop = () => {
      const now = performance.now()
      const dt = Math.min(0.033, (now - state.lastTime) / 1000)
      state.lastTime = now

      draw(dt)
      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    loop()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="work-page">
      {/* ✅ Telemetry Data Streams Background */}
      <div className="work-bg-wrapper">
        <canvas ref={canvasRef} className="work-streams-canvas" />
        <div className="work-bg-overlay" />
      </div>

      {/* ✅ Foreground Content */}
      <div className="work-content">
        {/* EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Experience />
        </motion.div>

        <div className="work-divider" />

        {/* PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Projects />
        </motion.div>

        <div className="work-divider" />

        {/* SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Skills />
        </motion.div>
      </div>
    </section>
  )
}