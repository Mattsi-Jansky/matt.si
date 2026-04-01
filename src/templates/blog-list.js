import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <DefaultLayout>
        {posts.map(({ node }) => {
          return (
            <article className="post" key={node.fields.slug}>
              {node.frontmatter.img &&
                node.frontmatter.img.childImageSharp &&
                node.frontmatter.img.childImageSharp.gatsbyImageData && (
                  <Link
                    to={node.fields.slug}
                    className="post-thumbnail"
                    style={{
                      backgroundImage: `url(${node.frontmatter.img.childImageSharp.gatsbyImageData.images.fallback.src})`,
                    }}
                  />
                )}
              <div className="post-content">
                <h2 className="post-title">
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h2>
                <p>{node.excerpt}</p>
                <span className="post-date">
                  {node.frontmatter.date}&nbsp;&nbsp;—&nbsp;
                </span>
                <span className="post-words">
                  {node.timeToRead} minute read
                </span>
              </div>
            </article>
          )
        })}
      </DefaultLayout>
    )
  }
}

export default BlogIndex

export const Head = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <SEO
      title={siteTitle}
    />
  )
}

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY, MMM DD")
            title
            img {
              childImageSharp {
                gatsbyImageData(width: 3720, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
