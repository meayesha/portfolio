import './About.css'

export default function About() {
  return (
    <section className="section about-section">
      <div className="section-content">
        <h2 className="section-title">About Me</h2>

        <div className="about-content">
          {/* LEFT: About Card */}
          <div className="about-text">
            <div className="about-card">
              <p>
                🌟 I’m a full-stack developer and researcher focused on
                human-centered technology at the intersection of AI, health, and
                design. My background spans several years of building web systems
                alongside academic research in Health Informatics and AI.
              </p>

              <p>
                💡 I’m particularly drawn to how immersive, AI-driven environments
                can offer safe, engaging spaces for emotional exploration, where
                reflection and adaptive feedback help cognitive strategies feel
                more lived-in and accessible.
              </p>

              <p>
                🌱 I want to better understand how people engage with technology in
                real life—what supports them, what overwhelms them, and what earns
                their trust over time. By translating these insights into design,
                I aim to create tools that feel personal, intuitive, and seamlessly
                integrated into everyday life.
              </p>
            </div>
          </div>

          {/* RIGHT: Focus + Research */}
          <div className="about-focus">
            <div className="focus-section">
              <h3 className="focus-title">What I Care About</h3>

              <div className="focus-item">
                <span className="focus-icon">🧠</span>
                <div>
                  <h4>Emotional Wellbeing</h4>
                  <p>
                    Designing systems that support reflection, regulation, and
                    emotional resilience.
                  </p>
                </div>
              </div>

              <div className="focus-item">
                <span className="focus-icon">🤖</span>
                <div>
                  <h4>Human-Centered AI</h4>
                  <p>AI that adapts to people, context, and lived experience.</p>
                </div>
              </div>

              <div className="focus-item">
                <span className="focus-icon">🕶️</span>
                <div>
                  <h4>Embodied Reflection (XR)</h4>
                  <p>
                    Using immersive experiences to support emotional regulation
                    and cognitive reappraisal.
                  </p>
                </div>
              </div>
            </div>

            <div className="focus-section">
              <h3 className="focus-title">Research Interests</h3>
              <ul className="focus-list">
                <li>Emotional wellbeing & mental health technologies</li>
                <li>Cognitive reappraisal and reflective practices</li>
                <li>Social computing & socially aware AI</li>
                <li>XR for embodied and immersive interventions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
