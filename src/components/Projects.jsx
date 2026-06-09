import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Sentinel - AI-powered incident intelligence platform',
    description: 'Sentinel is an AI-powered incident intelligence platform. It turns raw logs and incident narratives into structured analysis—summaries, severity, likely root cause, evidence-grounded remediation, and exportable reports—so teams can respond faster with less manual triage.',
    tech: ['Python 3.12+', 'Next.js 14', 'SQLite', 'Aurora Serverless v2 + RDS Data API (AWS deployment)', 'AWS', 'Generative AI'],
    color: '#6366f1',
    github: 'https://github.com/meayesha/sentinel',
  },
  {
    id: 2,
    title: 'Research paper scout agent',
    description: 'A research paper scout agent that scouts for research papers and summarizes them.',
    tech: ['Python 3.12','Generative AI','RAG','Gradio'],
    color: '#6366f1',
    github: 'https://github.com/meayesha/research-paper-scout-agent',
  },
  {
    id: 3,
    title: 'Infrasquad - The Autonomous Cloud Architecture and Security Team.',
    description: 'InfraSquad is a multi-agent system that takes natural language infrastructure requirements, debates cloud architecture, writes Terraform code, runs an automated security scan via an MCP server, and generates a visual architecture diagram. Users go from a text prompt to a generated diagram, deployable Terraform, and a security report in minutes.',
    tech: ['Python', 'LangGraph', 'MCP', 'Terraform', 'AWS', 'Generative AI'],
    color: '#6366f1',
    github: 'https://github.com/meayesha/infrasquad',
  },
  {
    id: 4,
    title: 'A personalized glucose prediction for type-1 diabetes patients',
    description: 'The main contribution is an incremental LSTM that addresses the cold-start problem: a general model is trained on other patients, then fine-tuned day-by-day as new CGM data from the target patient becomes available.',
    tech: ['Python', 'Tensorflow', 'Deep Learning', 'Machine Learning', 'Health-informatics'],
    color: '#6366f1',
    github: 'https://github.com/meayesha/A-Personalized-deep-learning-approach-for-blood-glucose-prediction-in-people-with-T1DM',
  },
  {
    id: 5,
    title: 'Covid 19 - Vaccine Scheduler',
    description: 'A web application to schedule appointments for Covid 19 vaccines.',
    tech: ['React', 'Node.js', 'TypeScript', 'Firebase', 'Redis', 'Tesseract', 'RabbitMQ'],
    color: '#6366f1',
    github: 'https://github.com/meayesha/Covid-19-Vaccine-Scheduler',
  },
  {
    id: 6,
    title: 'Blog Post Recommendation',
    description: 'A web application that recommends blog/articles based on user recommendation.',
    tech: ['Express.js', 'Three.js', 'JavaScript', 'MongoDB'],
    color: '#8b5cf6',
    github: 'https://github.com/meayesha/Blog-Post-Recommendation',
  },
  {
    id: 7,
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
