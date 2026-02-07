import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'education', label: 'Education', path: '/education' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export default function Navigation({ variant }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // ✅ HashRouter-safe theme detection
  const navTheme = useMemo(() => {
    if (variant) return variant

    const path = location.pathname || '/'

    if (path === '/') return 'home'
    if (path.startsWith('/blog')) return 'blog'
    if (path.startsWith('/work')) return 'work'
    if (path.startsWith('/education')) return 'education'
    if (path.startsWith('/contact')) return 'contact'

    return 'default'
  }, [location.pathname, variant])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Close on outside click + ESC
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    const onMouseDown = (e) => {
      const menu = document.querySelector('.mobile-menu')
      const button = document.querySelector('.hamburger-menu')
      if (!menu || !button) return
      if (menu.contains(e.target) || button.contains(e.target)) return
      setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onMouseDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onMouseDown)
    }
  }, [isMenuOpen])

  return (
    <motion.nav
      className={`navigation nav--${navTheme}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="nav-container">
        {/* LEFT */}
        <div className="nav-left">
          <button
            type="button"
            className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <div className="nav-logo" aria-label="Ayesha Parveen">
            <img
              src={`${import.meta.env.BASE_URL}logos/name_logo.png`}
              alt="Ayesha Parveen logo"
            />
          </div>
        </div>

        {/* RIGHT (desktop only) */}
        <div className="nav-right">
          <Link to="/blog" className="nav-blog-link">
            Blog
          </Link>

          <div className="nav-social-links">
            <a
              href="https://www.linkedin.com/in/ayesha-parveen-144398122/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>

            <a
              href="https://github.com/meayesha"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://instagram.com/by_ayesha24"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.6 6.4a1.1 1.1 0 10.001 2.201A1.1 1.1 0 0017.6 6.4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <Link key={item.id} to={item.path} className="mobile-nav-link">
                {item.label}
              </Link>
            ))}

            {/* 🔗 Social links (mobile only) */}
            <div className="mobile-social-links">
              <a
                href="https://www.linkedin.com/in/ayesha-parveen-144398122/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/meayesha"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/by_ayesha24"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
