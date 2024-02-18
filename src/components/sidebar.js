import { Link } from 'gatsby'
import React from 'react'

const Sidebar = ({ siteMetadata }) => (
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
        <p>
          Sometimes I speak at events or conferences and write blog posts. Interested in tech, ethics, AI, gamedev, chess.
        </p>
      </div>
    </header>
    <footer>
      <section className="contact">
        <hr />
        <ul>
          {siteMetadata.social.twitter && (
            <li>
              <a
                href={`https://todon.eu/@mattsi`}
                target="_blank"
              >
                <i className="fa-brands fa-mastodon" aria-hidden="true" />
              </a>
            </li>
          )}
          {siteMetadata.social.facebook && (
            <li>
              <a
                href={`https://facebook.com/${siteMetadata.social.facebook}`}
                target="_blank"
              >
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
            </li>
          )}
          {siteMetadata.social.github && (
            <li>
              <a
                href={`https://github.com/${siteMetadata.social.github}`}
                target="_blank"
              >
                <i class="fa-brands fa-github"></i>
              </a>
            </li>
          )}
          {siteMetadata.social.linkedin && (
            <li>
              <a
                href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}
                target="_blank"
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          )}
          {siteMetadata.social.email && (
            <li>
              <a href={`mailto:${siteMetadata.social.email}`} target="_blank">
              <i class="fa-solid fa-envelope"></i>
              </a>
            </li>
          )}
          <li>
            <a href={`/rss.xml`} target="_blank">
              <i className="fa fa-rss" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </section>
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
