import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class Tags extends React.Component {
  render() {
    const { pageContext, data } = this.props
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark

    return (
      <DefaultLayout>
        <div className="tag-archive">
          <header className="tag-archive-header">
            <Link to="/tags" className="tag-archive-back">All tags</Link>
            <h1>{tag}</h1>
            <p className="tag-archive-count">{totalCount} post{totalCount === 1 ? '' : 's'}</p>
          </header>
          <ul className="tag-archive-list">
            {edges.map(({ node }) => {
              const { title, date } = node.frontmatter
              const { slug } = node.fields
              return (
                <li key={slug}>
                  <Link to={slug} className="tag-archive-link">
                    <span className="tag-archive-title">{title}</span>
                    <span className="tag-archive-date">{date}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </DefaultLayout>
    )
  }
}

export default Tags

export const Head = ({ pageContext }) => {
  return <SEO title={`Posts tagged "${pageContext.tag}"`} />
}

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
