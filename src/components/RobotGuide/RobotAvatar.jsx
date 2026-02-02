import { useEffect, useRef } from 'react'

export default function RobotAvatar({ isSpeaking, pointing }) {
  const leftEye = useRef(null)
  const rightEye = useRef(null)
  const mouth = useRef(null)

  // Smoothed cursor tracking
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      // Normalize cursor to -1 → 1
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const animate = () => {
      // Smooth interpolation (lerp)
      current.current.x += (target.current.x - current.current.x) * 0.08
      current.current.y += (target.current.y - current.current.y) * 0.08

      const ex = current.current.x * 3    // eyes stronger
      const ey = current.current.y * 3

      const mx = current.current.x * 1.2  // mouth subtle
      const my = current.current.y * 0.6

      if (leftEye.current && rightEye.current) {
        leftEye.current.style.transform = `translate(${ex}px, ${ey}px)`
        rightEye.current.style.transform = `translate(${ex}px, ${ey}px)`
      }

      if (mouth.current) {
        mouth.current.style.transform = `translateX(-50%) translate(${mx}px, ${my}px) scaleX(${isSpeaking ? 1.05 : 1})`
      }

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [isSpeaking])

  return (
    <div className={`cute-robot ${pointing ? 'pointing' : ''}`}>
      <div className="circle-bg">
        <div className="robot-ear left" />

        <div className="robot-head">
          <div className="antenna" />

          <div className="robot-face">
            <div ref={leftEye} className="eyes left" >
                 <div className="eye-pupil" />
            </div>
            <div ref={rightEye} className="eyes right" >
                 <div className="eye-pupil" />
            </div>
            <div
              ref={mouth}
              className={`mouth ${isSpeaking ? 'smile' : ''}`}
            />
          </div>
        </div>

        <div className="robot-ear right" />
        <div className="robot-body" />
      </div>
    </div>
  )
}
