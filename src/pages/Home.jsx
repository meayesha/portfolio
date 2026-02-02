import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '../components/Hero'
import About from '../components/About'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  // Background Three.js refs
  const bgWrapRef = useRef(null)
  const bgRafRef = useRef(null)

  // Mouse
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseSmoothRef = useRef({ x: 0, y: 0 })

  // 🎨 Warm Gold theme
  const COLOR = useMemo(
    () => ({
      circle: 0xffc36a,
    }),
    []
  )

  // -----------------------------
  // ✅ Background: SOLID cube made of circles
  // -----------------------------
  useEffect(() => {
    if (!bgWrapRef.current) return
    const wrap = bgWrapRef.current

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.set(0, 0.2, 7)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(wrap.clientWidth, wrap.clientHeight)
    wrap.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))

    const keyLight = new THREE.DirectionalLight(0xffffff, 1)
    keyLight.position.set(2, 3, 4)
    scene.add(keyLight)

    const cubeGroup = new THREE.Group()
    scene.add(cubeGroup)

    const s = 1.55
    const grid = 8
    const step = (s * 2) / (grid - 1)

    const circleGeom = new THREE.CircleGeometry(0.036, 18)
    const mat = new THREE.MeshStandardMaterial({
      color: COLOR.circle,
      metalness: 0.25,
      roughness: 0.45,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    })

    const circles = []
    const bases = []

    for (let xi = 0; xi < grid; xi++) {
      for (let yi = 0; yi < grid; yi++) {
        for (let zi = 0; zi < grid; zi++) {
          const x = -s + xi * step
          const y = -s + yi * step
          const z = -s + zi * step

          const m = new THREE.Mesh(circleGeom, mat.clone())
          m.position.set(x, y, z)
          m.lookAt(camera.position)

          cubeGroup.add(m)
          circles.push(m)
          bases.push(new THREE.Vector3(x, y, z))
        }
      }
    }

    const resize = () => {
      renderer.setSize(wrap.clientWidth, wrap.clientHeight)
      camera.aspect = wrap.clientWidth / wrap.clientHeight
      camera.updateProjectionMatrix()
    }

    const animate = () => {
      bgRafRef.current = requestAnimationFrame(animate)
      const t = performance.now() * 0.001

      mouseSmoothRef.current.x += (mouseRef.current.x - mouseSmoothRef.current.x) * 0.06
      mouseSmoothRef.current.y += (mouseRef.current.y - mouseSmoothRef.current.y) * 0.06

      const mx = mouseSmoothRef.current.x
      const my = mouseSmoothRef.current.y

      camera.position.x += (mx * 0.9 - camera.position.x) * 0.03
      camera.position.y += (0.25 + my * 0.55 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      cubeGroup.rotation.y = t * 0.18 + mx * 0.45
      cubeGroup.rotation.x = Math.sin(t * 0.11) * 0.12 + my * 0.35

      for (let i = 0; i < circles.length; i++) {
        const m = circles[i]
        const b = bases[i]

        const wobble =
          Math.sin(t * 1.3 + b.x * 1.1 + b.z * 0.7) * 0.08 +
          Math.cos(t * 1.1 + b.y * 1.4) * 0.08

        m.position.x = b.x + wobble * 0.12 + mx * 0.4
        m.position.y = b.y + wobble * 0.1 + my * 0.4
        m.position.z = b.z + wobble * 0.09
        m.lookAt(camera.position)
      }

      renderer.render(scene, camera)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(bgRafRef.current)
      renderer.dispose()
      wrap.removeChild(renderer.domElement)
    }
  }, [COLOR])

  // -----------------------------
  // ✅ Scroll animations
  // -----------------------------
  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh())

    const ctx = gsap.context(() => {
      gsap.to('.hero-card', {
        y: -80,
        scale: 0.92,
        opacity: 0.25,
        filter: 'blur(4px)',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top+=120 top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        '.about-text',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        '.focus-section',
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="home-page">
      <div ref={bgWrapRef} className="bg-3d" />
      <div className="bg-overlay" />

      <main className="home-content">
        <section id="hero" className="hero-section">
          <Hero />
        </section>

        <section id="about" className="about-section">
          <About />
        </section>
      </main>
    </div>
  )
}
