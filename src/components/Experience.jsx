import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Experience.css'

const experiences = [
  {
    id: 1,
    year: '2024',
    month: 'Present',
    title: 'R&D Engineer and AI Training Specialist',
    company: 'Freelance | Remote',
    description:
      'I supported AI model development across technical domains through data labeling, testing, and dataset refinement, while also managing client-facing content strategy and digital platforms to align business goals with real user needs.',
    technologies: ['AI', 'Machine Learning', 'Python', 'Word Press', 'Social Media Marketing'],
  },
  {
    id: 2,
    year: '2022-2024',
    month: 'Feb - May',
    title: 'Full Stack Developer',
    company: 'Peri Software Solutions | NJ, USA',
    description:
      'Led the development of key modules and feature enhancements for a country club booking application, integrating optimized Oracle PL/SQL back-end logic with a responsive front end to improve reservation efficiency and user experience.',
    technologies: ['JavaScript', 'JQuery', 'React', 'HTML', 'SQL', 'PL/SQL', 'SQL*LOADER', 'CSS', 'AWS'],
  },
  {
    id: 3,
    year: '2020-2021',
    month: 'Sep - Dec',
    title: 'Machine Learning Research Assistant',
    company: 'Health & AI Lab | NJ, USA',
    description:
      'Developed and evaluated personalized deep learning models (RNNs and LSTMs) for blood glucose prediction in Type 1 diabetes, integrating clinical data and domain knowledge to improve prediction accuracy and support research in AI-driven diabetes care.',
    technologies: [
      'Python',
      'Tensorflow',
      'Numpy',
      'Pandas',
      'Matplotlib',
      'Machine Learning',
      'Deep Learning',
      'Causal Inference',
      'Health-informatics',
    ],
  },
  {
    id: 4,
    year: '2017-2019',
    month: 'Nov - Jul',
    title: 'QA and Application Developer',
    company: 'Cognizant Technology Solutions | Kolkata, WB, India',
    description:
      'Contributed to end-to-end application reliability through manual and automated testing, system integration with Selenium and Appium. Also worked with Unix/Linux shell scripts for system monitoring, database upgrade, and task automation.',
    technologies: ['SQL', 'PL/SQL', 'C#', 'JavaScript', 'Java', 'Selenium', 'Appium', 'Unix/Linux'],
  },
]

export default function Experience({ setCurrentSection }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!setCurrentSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection('experience')
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [setCurrentSection])

  return (
    <section id="experience" ref={sectionRef} className="section experience-section">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Experience</h2>

          <div className="timeline-container">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  {index !== experiences.length - 1 && <div className="marker-line"></div>}
                </div>

                <div className={`timeline-content ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="experience-card">
                    <div className="experience-date">
                      <span className="date-year">{exp.year}</span>
                      <span className="date-month">{exp.month}</span>
                    </div>

                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-description">{exp.description}</p>

                    <div className="experience-tech">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}