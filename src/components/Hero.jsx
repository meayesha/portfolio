import { useNavigate } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero-section">
      <div className="hero-card">
        <h1>
          Heya, I’m <span className="accent">Ayesha</span>
        </h1>

        <h2>
          Full Stack Developer & <span className="accent">AI Researcher</span>
        </h2>

        <p>
          Designing human-centered systems at the intersection of AI,
          health, and immersive technologies.
        </p>

        {/* CTA */}
        <div className="hero-actions">
          <button
            className="hero-cta"
            onClick={() => navigate('/contact')}
          >
            Connect with me
          </button>
        </div>
      </div>
    </section>
  )
}
