import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class Tags extends React.Component {
  render() {
    const { pageContext, data } = this.props
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const siteTitle = data.site.siteMetadata.title

    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`

    return (
      <DefaultLayout>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `mattsi`, `jansky`, `programming`, `technology`]}
        />
        <div>
          <h1 className="clearfix">{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { title, date } = node.frontmatter
              const { slug } = node.fields
              return (
                <li key={slug}>
                  <Link to={slug}>
                    {title} ({date})
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link to="/tags">All tags</Link>
        </div>
      </DefaultLayout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
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
