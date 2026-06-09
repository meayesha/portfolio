import './Blog.css'

const articles = [
{
title: 'The Most Connected Generation, Yet The Loneliest One',
date: 'May 2026',
description:
'Exploring AI Companionship and the Paradox of the Connected Age.',
link: 'https://meayesha24.substack.com/p/the-most-connected-generation-yet',
},
{
title: 'We Don’t Need More Therapy Apps. We Need Better Tools for Thinking.',
date: 'April 2026',
description:
'AI won’t replace therapy, but it might change how we process life.',
link: 'https://meayesha24.substack.com/p/we-dont-need-more-therapy-apps-we',
},
// {
// title: 'Lessons from My AI Research Journey',
// date: 'April 2026',
// description:
// 'Thoughts on transitioning from software engineering into AI and HCI research.',
// link: 'https://your-substack-url.com/p/article-3',
// },
]

export default function Blog() {
return ( <div className="blog-page"> <div className="blog-paper-bg" />


  <div className="blog-thoughts">
    <span className="thought text">human-centered systems</span>
    <span className="thought text">AI + care</span>
    <span className="thought text">why this matters</span>
    <span className="thought text">HCI</span>
    <span className="thought text">learning loops</span>
    <span className="thought text">research notes</span>
    <span className="thought text">machine learning</span>
    <span className="thought text">health</span>
    <span className="thought text">well-being</span>

    <span className="thought code">if (care &gt; speed)</span>
    <span className="thought code">const insight = observe(user)</span>
    <span className="thought code">{'{ empathy: true }'}</span>
    <span className="thought code">model.fit(data)</span>

    <span className="thought math">∀ user</span>
    <span className="thought math">∑ experience</span>
    <span className="thought math">Δ well-being</span>
    <span className="thought math">∴ design ≠ neutral</span>
  </div>

  <div className="blog-content">
    <h1>Writing & Research Notes</h1>

    <p className="blog-intro">
      Essays, reflections, and research notes exploring AI, healthcare,
      human-computer interaction, wellbeing, and emerging technologies.
    </p>

    <div className="substack-banner">
      <a
        href="https://your-substack-url.substack.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit my Substack →
      </a>
    </div>

    <div className="articles-grid">
      {articles.map((article) => (
        <a
          key={article.title}
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="article-card"
        >
          <p className="article-date">{article.date}</p>
          <h2>{article.title}</h2>
          <p>{article.description}</p>

          <span className="read-more">
            Read on Substack →
          </span>
        </a>
      ))}
    </div>
  </div>
</div>

)
}
