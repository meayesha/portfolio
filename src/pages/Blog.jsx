import './Blog.css'

export default function Blog() {
  return (
    <div className="blog-page">
      {/* 🌾 Paper texture base */}
      <div className="blog-paper-bg" />

      {/* 💭 Floating thoughts: text + code + math */}
      <div className="blog-thoughts">
        {/* Natural language */}
        <span className="thought text">human-centered systems</span>
        <span className="thought text">AI + care</span>
        <span className="thought text">why this matters</span>
        <span className="thought text">HCI</span>
        <span className="thought text">learning loops</span>
        <span className="thought text">research notes</span>
        <span className="thought text">machine learning</span>
        <span className="thought text">health</span>
        <span className="thought text">well-being</span>

        {/* Code snippets */}
        <span className="thought code">if (care &gt; speed)</span>
        <span className="thought code">const insight = observe(user)</span>
        <span className="thought code">{'{ empathy: true }'}</span>
        <span className="thought code">model.fit(data)</span>

        {/* Math / logic */}
        <span className="thought math">∀ user</span>
        <span className="thought math">∑ experience</span>
        <span className="thought math">Δ well-being</span>
        <span className="thought math">∴ design ≠ neutral</span>
      </div>

      {/* 📄 Content */}
      <div className="blog-content">
        <h1>Research & Updates</h1>
        <p className="blog-intro">
          Ongoing work in human-centered AI, wellbeing, XR, and healthcare.
        </p>
      </div>
    </div>
  )
}
