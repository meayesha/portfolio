import './About.css'

export default function About() {
return ( 
<section className="section about-section"> <div className="section-content"> <h2 className="section-title">About Me</h2>
    <div className="about-content">
      {/* LEFT: About Card */}
      <div className="about-text">
        <div className="about-card">
          <p>
            🌟 I’m a full-stack developer and researcher interested in
            Human-Computer Interaction, Health AI, and digital health.
            My background combines industry experience building software
            systems with academic research exploring how technology can
            better support people's wellbeing, decision-making, and
            everyday experiences.
          </p>

          <p>
            💡 I’m particularly interested in how AI systems can be designed to support people in meaningful, responsible, and context-aware ways.
             My research interests lie in understanding human behavior, decision-making, and lived experiences, and exploring how these 
             insights can inform the design of technologies that are useful, trustworthy, and easy to engage with.
            
          </p>

          <p>
            🌱 I want to better understand how people engage with technology
            in real life - what supports them, what overwhelms them, and what
            earns their trust over time. By translating these insights into
            design, I aim to create tools that feel personal, intuitive, and
            seamlessly integrated into everyday life, particularly in health
            and wellbeing contexts.
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
              <p>
                AI that adapts to people, context, and lived experience.
              </p>
            </div>
          </div>

          <div className="focus-item">
            <span className="focus-icon">🎨</span>
            <div>
              <h4>Human-Centered Design</h4>
              <p>
                Designing technology around people's needs, behaviors,
                motivations, and everyday experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="focus-section">
          <h3 className="focus-title">Research Interests</h3>

          <ul className="focus-list">
            <li>Human-Computer Interaction (HCI)</li>
            <li>Human-centered AI and responsible AI systems</li>
            <li>Digital health and healthcare technologies</li>
            <li>Social computing and technology-mediated wellbeing</li>
            <li>
              Designing AI systems that support trust, engagement, and
              behavior change
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
)
}
