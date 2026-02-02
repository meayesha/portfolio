import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* -----------------------------
   SECTION PRESETS
------------------------------ */
const SCENE_PRESETS = {
  hero: {
    colors: ['#ff9f1c', '#ffd166', '#ef476f'],
    shapes: ['sphere', 'torus', 'dodecahedron'],
    motion: 1,
    scale: 1,
    mouseStrength: 1,
    bg: new THREE.Color('#0a0a0a'),
  },
  about: {
    colors: ['#a5b4fc', '#c4b5fd'],
    shapes: ['sphere'],
    motion: 0.6,
    scale: 0.9,
    mouseStrength: 0.6,
    bg: new THREE.Color('#0b0b12'),
  },
  experience: {
    colors: ['#6366f1', '#8b5cf6'],
    shapes: ['cube', 'octahedron'],
    motion: 0.45,
    scale: 0.85,
    mouseStrength: 0.4,
    bg: new THREE.Color('#0a0c14'),
  },
  projects: {
    colors: ['#ec4899', '#8b5cf6', '#6366f1'],
    shapes: ['tetrahedron', 'torus'],
    motion: 0.8,
    scale: 0.95,
    mouseStrength: 0.8,
    bg: new THREE.Color('#0c0a14'),
  },
  skills: {
    colors: ['#22d3ee', '#6366f1'],
    shapes: ['cube'],
    motion: 0.5,
    scale: 0.85,
    mouseStrength: 0.5,
    bg: new THREE.Color('#0a0f14'),
  },
  contact: {
    colors: ['#94a3b8'],
    shapes: ['sphere'],
    motion: 0.25,
    scale: 0.8,
    mouseStrength: 0.25,
    bg: new THREE.Color('#09090b'),
  },
}

/* -----------------------------
   PARTICLE
------------------------------ */
function Particle({ position, shape, color, motion }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * motion

    ref.current.position.y =
      position[1] + Math.sin(t + position[0]) * 0.12 * motion

    ref.current.rotation.x += 0.01 * motion
    ref.current.rotation.y += 0.01 * motion
  })

  const size = 0.08

  const geometry = {
    sphere: <sphereGeometry args={[size, 16, 16]} />,
    cube: <boxGeometry args={[size, size, size]} />,
    torus: <torusGeometry args={[size * 0.8, size * 0.3, 8, 16]} />,
    octahedron: <octahedronGeometry args={[size * 1.2, 0]} />,
    tetrahedron: <tetrahedronGeometry args={[size * 1.2, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[size, 0]} />,
  }

  return (
    <mesh ref={ref} position={position}>
      {geometry[shape]}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  )
}

/* -----------------------------
   CONNECTION LINE (PULSATING)
------------------------------ */
function Connection({ start, end, index, motion }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.material.opacity =
      0.25 + Math.sin(t * 2 + index) * 0.2 * motion
  })

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([...start, ...end])}
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        transparent
        opacity={0.3}
        color={new THREE.Color('#c084fc')}
      />
    </line>
  )
}

/* -----------------------------
   NEURAL FIELD
------------------------------ */
function NeuralField({ currentSection }) {
  const group = useRef()
  const { scene } = useThree()

  // ✅ GLOBAL mouse tracking (works behind DOM)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const [active, setActive] = useState({ ...SCENE_PRESETS.hero })
  const [target, setTarget] = useState(SCENE_PRESETS.hero)

  useEffect(() => {
    setTarget(SCENE_PRESETS[currentSection] || SCENE_PRESETS.hero)
  }, [currentSection])

  /* Background interpolation */
  useFrame(() => {
    scene.background = scene.background || active.bg.clone()
    scene.background.lerp(target.bg, 0.03)
  })

  /* Motion + mouse interpolation */
  useFrame(() => {
    if (!group.current) return

    // Smooth preset blending
    active.motion += (target.motion - active.motion) * 0.05
    active.scale += (target.scale - active.scale) * 0.05
    active.mouseStrength +=
      (target.mouseStrength - active.mouseStrength) * 0.05

    // ✅ Mouse parallax (THIS WAS THE MISSING PIECE)
    const targetRotX = mouse.current.y * 0.4 * active.mouseStrength
    const targetRotY = mouse.current.x * 0.6 * active.mouseStrength

    group.current.rotation.x +=
      (targetRotX - group.current.rotation.x) * 0.06
    group.current.rotation.y +=
      (targetRotY - group.current.rotation.y) * 0.06

    // Ambient motion
    group.current.rotation.z += 0.001 * active.motion
    group.current.scale.setScalar(active.scale)
  })

  /* Particles */
  const particles = useMemo(() => {
    const preset = target
    const count = 120

    return Array.from({ length: count }).map(() => {
      const r = 3 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      return {
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        shape: preset.shapes[Math.floor(Math.random() * preset.shapes.length)],
        color: new THREE.Color(
          preset.colors[Math.floor(Math.random() * preset.colors.length)]
        ),
      }
    })
  }, [target])

  /* Connections */
  const connections = useMemo(() => {
    const links = []
    const maxDist = 2.5

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i].pos
        const p2 = particles[j].pos

        const d = Math.sqrt(
          (p1[0] - p2[0]) ** 2 +
          (p1[1] - p2[1]) ** 2 +
          (p1[2] - p2[2]) ** 2
        )

        if (d < maxDist) {
          links.push({
            start: p1,
            end: p2,
            index: links.length,
          })
        }
      }
    }
    return links
  }, [particles])

  return (
    <group ref={group}>
      {connections.map((c, i) => (
        <Connection
          key={`c-${i}`}
          start={c.start}
          end={c.end}
          index={c.index}
          motion={active.motion}
        />
      ))}

      {particles.map((p, i) => (
        <Particle
          key={`p-${i}`}
          position={p.pos}
          shape={p.shape}
          color={p.color}
          motion={active.motion}
        />
      ))}
    </group>
  )
}

/* -----------------------------
   SCENE ROOT
------------------------------ */
export default function Scene3D({ currentSection }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={0.7} />
      <pointLight position={[-6, -6, -6]} intensity={0.4} />

      <NeuralField currentSection={currentSection} />
    </>
  )
}
