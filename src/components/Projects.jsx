import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Covid 19 - Vaccine Scheduler',
    description: 'A web application to schedule appointments for Covid 19 vaccines.',
    tech: ['React', 'Node.js', 'TypeScript', 'Firebase', 'Redis', 'Tesseract', 'RabbitMQ'],
    color: '#6366f1',
    github: 'https://github.com/meayesha/Covid-19-Vaccine-Scheduler',
  },
  {
    id: 2,
    title: 'Blog Post Recommendation',
    description: 'A web application that recommends blog/articles based on user recommendation.',
    tech: ['Express.js', 'Three.js', 'JavaScript', 'MongoDB'],
    color: '#8b5cf6',
    github: 'https://github.com/meayesha/Blog-Post-Recommendation',
  },
  {
    id: 3,
    title: 'Music Popularity Prediction',
    description: 'A system to predict the popularity of music based on its audio features.',
    tech: ['Python', 'Machine Learning', 'Data Analysis'],
    color: '#ec4899',
    github: 'https://github.com/meayesha/Music-Popularity-Prediction',
  },
]

export default function Projects({ setCurrentSection }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection('projects')
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [setCurrentSection])

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Projects</h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div
                  className="project-header"
                  style={{ borderTopColor: project.color }}
                >
                  <h3 className="project-title">{project.title}</h3>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ✅ Button restored, GitHub linked */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button className="project-button">
                    View Project
                  </button>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
