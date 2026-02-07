import { motion } from 'framer-motion'
import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thanks for reaching out! I’ll get back to you soon ☕✨")
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact-section">
      {/* SVG FILTER (REAL LIQUID DISTORTION) */}
      <svg className="liquid-filter" aria-hidden="true">
        <filter id="liquidDistortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            seed="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              values="0.01 0.02; 0.018 0.028; 0.01 0.02"
              repeatCount="indefinite"
            />
            <animate
              attributeName="seed"
              dur="12s"
              values="1; 2; 3; 2; 1"
              repeatCount="indefinite"
            />
          </feTurbulence>

          {/*  Reduced distortion so cup stays clear */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              dur="8s"
              values="12; 20; 14; 18"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </svg>

      {/* DISTORTED BACKGROUND */}
      <div className="contact-bg-liquid" />

      {/* DARK OVERLAY for readability */}
      <div className="contact-overlay" />

      {/* FOREGROUND CONTENT */}
      <div className="section-content contact-foreground">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">Get In Touch</h2>

          <div className="contact-content">
            {/* LEFT INFO */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3>Let’s chat</h3>
              <p>
                I’m always open to discussing research ideas, new projects, and
                meaningful collaborations — especially at the intersection of AI,
                healthcare, and human-centered design.
              </p>
            </motion.div>

            {/* FORM */}
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
