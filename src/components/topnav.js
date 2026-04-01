import { Link } from 'gatsby'
import React from 'react'

const TopNav = ({ siteMetadata }) => (
  <header className="site-header">
    <nav className="topnav">
      <div className="topnav-left">
        <Link to="/" className="topnav-home">
          <img
            src="/pic.jpg"
            alt={siteMetadata.author}
            className="author-image"
          />
          <span className="author-name">matt.si</span>
        </Link>
      </div>
      <div className="topnav-right">
        <Link to="/bio">About</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/bio#genai-policy" className="genai-link">GenAI policy</Link>
        <span className="topnav-social">
          {siteMetadata.social.twitter && (
            <a href="https://todon.eu/@mattsi" target="_blank" aria-label="Mastodon">
              <i className="fa-brands fa-mastodon" aria-hidden="true" />
            </a>
          )}
          {siteMetadata.social.github && (
            <a href={`https://github.com/${siteMetadata.social.github}`} target="_blank" aria-label="GitHub">
              <i className="fa-brands fa-github" aria-hidden="true" />
            </a>
          )}
          {siteMetadata.social.linkedin && (
            <a href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`} target="_blank" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
            </a>
          )}
          {siteMetadata.social.email && (
            <a href={`mailto:${siteMetadata.social.email}`} aria-label="Email">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
            </a>
          )}
          <a href="/rss.xml" target="_blank" aria-label="RSS">
            <i className="fa fa-rss" aria-hidden="true" />
          </a>
        </span>
      </div>
    </nav>
  </header>
)

export default TopNav
