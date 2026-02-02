import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ROBOT_MESSAGES } from './robotMessages'

export function useRobotGuide() {
  const location = useLocation()

  const [message, setMessage] = useState(ROBOT_MESSAGES.intro)
  const [visible, setVisible] = useState(true)

  const sectionCooldownRef = useRef({})
  const cycleTimeoutRef = useRef(null)
  const isShowingIntroRef = useRef(true)

  // ⏱️ Timing (tuned for calm, readable cadence)
  const MESSAGE_DURATION = 3800
  const INTRO_DURATION = 3200

  // -----------------------------------
  // 🔁 Message cycling logic
  // -----------------------------------
  const startMessageCycle = (pageMessage) => {
    clearTimeout(cycleTimeoutRef.current)

    const cycle = () => {
      if (isShowingIntroRef.current) {
        setMessage(pageMessage)
        setVisible(true)
        isShowingIntroRef.current = false

        cycleTimeoutRef.current = setTimeout(cycle, MESSAGE_DURATION)
      } else {
        setMessage(ROBOT_MESSAGES.intro)
        setVisible(true)
        isShowingIntroRef.current = true

        cycleTimeoutRef.current = setTimeout(cycle, INTRO_DURATION)
      }
    }

    // Start immediately with page message
    isShowingIntroRef.current = true
    cycle()
  }

  // -----------------------------------
  // 🏠 SECTION-BASED (HOME ONLY)
  // -----------------------------------
  useEffect(() => {
    if (location.pathname !== '/') return

    const sections = [
      { id: 'hero', text: ROBOT_MESSAGES.hero },
      { id: 'about', text: ROBOT_MESSAGES.about },
      { id: 'work', text: ROBOT_MESSAGES.work },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const section = sections.find((s) => s.id === entry.target.id)
          if (!section) return

          const now = Date.now()
          const lastShown = sectionCooldownRef.current[section.id] || 0
          if (now - lastShown < 6000) return

          sectionCooldownRef.current[section.id] = now
          startMessageCycle(section.text)
        })
      },
      { threshold: 0.35 }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      clearTimeout(cycleTimeoutRef.current)
    }
  }, [location.pathname])

  // -----------------------------------
  // 🌍 ROUTE-BASED (NON-HOME)
  // -----------------------------------
  useEffect(() => {
    if (location.pathname === '/') return

    const routeMessages = {
      '/work': ROBOT_MESSAGES.workRoute,
      '/blog': ROBOT_MESSAGES.blogRoute,
      '/education': ROBOT_MESSAGES.educationRoute,
      '/contact': ROBOT_MESSAGES.contactRoute,
    }

    const msg = routeMessages[location.pathname]
    if (!msg) return

    sectionCooldownRef.current = {}
    startMessageCycle(msg)

    return () => clearTimeout(cycleTimeoutRef.current)
  }, [location.pathname])

  // -----------------------------------
  // ✨ ANTENNA GLOW ON SCROLL
  // -----------------------------------
  useEffect(() => {
    let timeout

    const onScroll = () => {
      const wrapper = document.querySelector('.robot-wrapper')
      if (!wrapper) return

      wrapper.classList.add('scrolling', 'glow-strong')

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        wrapper.classList.remove('scrolling', 'glow-strong')
      }, 420)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { message, visible }
}
