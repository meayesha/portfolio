import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Education.css'

const education = [
  {
    id: 1,
    year: '2022',
    degree: 'Master of Science in Computer Science',
    college: 'Stevens Institute of Technology',
    logo: './logos/stevens.png',
  },
  {
    id: 2,
    year: '2022',
    degree: 'Graduate Certificate in Machine Learning',
    college: 'Stevens Institute of Technology',
    logo: './logos/stevens.png',
  },
  {
    id: 3,
    year: '2017',
    degree: 'Bachelor of Technology in Information Technology',
    college: 'St. Thomas College of Engineering & Technology',
    logo: './logos/stcet.png',
  },
]

export default function Education({ setCurrentSection }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCurrentSection('education')
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [setCurrentSection])

  const handleLogoError = (e) => {
    e.currentTarget.src = '/logos/default_school.png'
  }

  return (
    <section id="education" ref={sectionRef} className="education-page">
      {/* ✅ Background in JSX */}
      <div
        className="education-bg"
        style={{
          backgroundImage: `url('./images/study.jpg')`,
        }}
      />

      {/* ✅ Overlay so text/cards readable */}
      <div className="education-overlay" />

      {/* ✅ Content */}
      <div className="education-inner">
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* ✅ moved lower via CSS */}
            <h2 className="education-page-title">Education</h2>

            <div className="education-list">
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="education-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <div className="education-card">
                    <div className="education-header">
                      <div className="education-logo-wrap">
                        <img
                          src={item.logo}
                          alt={`${item.college} logo`}
                          className="education-logo"
                          onError={handleLogoError}
                          loading="lazy"
                        />
                      </div>

                      <div className="education-meta">
                        <span className="education-year">{item.year}</span>
                        <h3 className="education-title">{item.degree}</h3>
                        <p className="education-college">{item.college}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="site-footer">Crafted by @ayesha ✨</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
