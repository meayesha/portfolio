import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Skills.css'

const skillGroups = [
  {
    category: 'Frontend',
    tech: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Three.js'],
  },
  {
    category: 'Backend',
    tech: ['Node.js', 'Express.js', 'Python', 'REST APIs'],
  },
  {
    category: 'Databases',
    tech: ['MongoDB', 'PostgreSQL', 'MySQL', 'Oracle PL/SQL'],
  },
  {
    category: 'AI & ML',
    tech: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP'],
  },
  {
    category: 'Tools & Platforms',
    tech: ['Git', 'Docker', 'Firebase', 'Linux', 'AWS'],
  },
]

const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    // description:
    //   'AWS Certified Cloud Practitioner.',
  },
  {
    title: 'TensorFlow Developer Specialization',
    issuer: 'DeepLearning.AI',
    // description:
    //   'Neural networks, CNNs, sequence models, and optimization techniques.',
  },
  {
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    // description:
    //   'Design thinking, user research, and iterative prototyping.',
  },
]

export default function Skills({ setCurrentSection }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection('skills')
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
    <section id="skills" ref={sectionRef} className="section skills-section">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Skills & Certifications</h2>

          <div className="skills-content">
            {/* LEFT: Skills */}
            <motion.div
              className="skills-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {skillGroups.map((group) => (
                <div key={group.category} className="skill-group">
                  <h3 className="group-title">{group.category}</h3>
                  <div className="tech-grid">
                    {group.tech.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* RIGHT: Certifications */}
            <motion.div
              className="skills-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="cert-section">
                <h3 className="cert-title">Certifications</h3>

                {certifications.map((cert) => (
                  <div key={cert.title} className="cert-card">
                    <h4>{cert.title}</h4>
                    <span className="cert-issuer">{cert.issuer}</span>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
