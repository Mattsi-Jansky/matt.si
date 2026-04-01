import { Link } from 'gatsby'
import React from 'react'
import generatePathToTag from '../shared/pathToTagGenerator'

const Icon = ({ children, label }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-label={label} className="social-icon">
    {children}
  </svg>
)

const MastodonIcon = () => (
  <Icon label="Mastodon">
    <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61C17.228 2.186 15.232 2.012 13.158 2h-.044C11.04 2.012 9.046 2.186 7.79 2.956c0 0-2.843 1.271-2.843 5.61 0 .99-.019 2.174.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.432 4.014.535c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.431-2.223.396-5.424.396-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.648-1.501 1.927v2.791h-2.069V9.364c0-1.279-.501-1.927-1.502-1.927-.904 0-1.357.545-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.41 2.405 1.228l.518.869.519-.869c.533-.818 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z"/>
  </Icon>
)

const GitHubIcon = () => (
  <Icon label="GitHub">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </Icon>
)

const LinkedInIcon = () => (
  <Icon label="LinkedIn">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </Icon>
)

const EnvelopeIcon = () => (
  <Icon label="Email">
    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z"/>
    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z"/>
  </Icon>
)

const RssIcon = () => (
  <Icon label="RSS">
    <circle cx="6.18" cy="17.82" r="2.18"/>
    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
  </Icon>
)

const Sidebar = ({ siteMetadata, tags }) => (
  <aside className="sidebar">
    <header>
      <div className="about">
        <div className="cover-author-image">
          <Link to="/">
            <img
              src="/pic.jpg"
              alt={siteMetadata.author}
              className="author-image"
            />
          </Link>
        </div>
        <div className="author-name">{siteMetadata.author}</div>
        <p>
          I'm Mattsi, a software engineer / consultant / craftsman / tell-computers-what-to-do-guy.
        </p>
        <p><Link to="/bio">About</Link></p>
      </div>
      {tags && tags.length > 0 && (
        <nav className="sidebar-tags">
          <h4>Tags <Link to="/tags" className="tags-all">all</Link></h4>
          <ul>
            {tags.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={generatePathToTag(tag.fieldValue)}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
    <footer>
      <section className="contact">
        <ul>
          {siteMetadata.social.twitter && (
            <li>
              <a href="https://todon.eu/@mattsi" target="_blank">
                <MastodonIcon />
              </a>
            </li>
          )}
          {siteMetadata.social.facebook && (
            <li>
              <a href={`https://facebook.com/${siteMetadata.social.facebook}`} target="_blank">
                <GitHubIcon />
              </a>
            </li>
          )}
          {siteMetadata.social.github && (
            <li>
              <a href={`https://github.com/${siteMetadata.social.github}`} target="_blank">
                <GitHubIcon />
              </a>
            </li>
          )}
          {siteMetadata.social.linkedin && (
            <li>
              <a href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`} target="_blank">
                <LinkedInIcon />
              </a>
            </li>
          )}
          {siteMetadata.social.email && (
            <li>
              <a href={`mailto:${siteMetadata.social.email}`} target="_blank">
                <EnvelopeIcon />
              </a>
            </li>
          )}
          <li>
            <a href="/rss.xml" target="_blank">
              <RssIcon />
            </a>
          </li>
        </ul>
      </section>
      <div className="genai-policy">
        <h4><Link to="/bio#genai-policy">GenAI policy</Link></h4>
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar-footer-message">
        <p>
          Made with <a href="https://www.gatsbyjs.org">Gatsby</a> and{' '}
          <a href="https://github.com/wangonya/flexible-gatsby/">Flexible</a>
        </p>
      </div>
    </footer>
  </aside>
)

export default Sidebar
