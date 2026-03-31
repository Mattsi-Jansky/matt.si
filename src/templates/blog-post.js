import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import rehypeReact from 'rehype-react'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import TagLink from '../components/tagLink'
import Figure from '../components/figure'

class BlogPostTemplate extends React.Component {
  render() {
    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: { 'tag-link': TagLink, figure: Figure },
    }).Compiler
    const post = this.props.data.markdownRemark

    return (
      <DefaultLayout>
        <article className="article-page">
          <div className="page-content">
            {post.frontmatter.img && (
              <div className="page-cover-image">
                <figure>
                  <GatsbyImage
                    className="page-image"
                    alt={post.frontmatter.imgCaption || post.frontmatter.title}
                    image={getImage(post.frontmatter.img.childImageSharp)}
                  />
                  <figcaption>
                    {!post.frontmatter.imgCaptionLink &&
                      post.frontmatter.imgCaption}
                    {post.frontmatter.imgCaptionLink && (
                      <a href={post.frontmatter.imgCaptionLink}>
                        {post.frontmatter.imgCaption}
                      </a>
                    )}
                  </figcaption>
                </figure>
              </div>
            )}
            <div className="wrap-content">
              <header className="header-page">
                <h1 className="page-title">{post.frontmatter.title}</h1>
                <div className="page-date">
                  <span>{post.frontmatter.date}</span>
                </div>
                <div className="tags-container">
                  <div className="page-tag">
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.map(tag => (
                        <span className="tag" key={tag}>
                          <TagLink tag={tag}># {tag}</TagLink>
                        </span>
                      ))}
                  </div>
                </div>
              </header>
              {renderAst(post.htmlAst)}
            </div>
          </div>
        </article>
      </DefaultLayout>
    )
  }
}

export default BlogPostTemplate

export const Head = ({ data }) => {
  const post = data.markdownRemark
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
      canonicalLink={post.frontmatter.canonicalLink}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        title
        date(formatString: "YYYY, MMM DD")
        tags
        img {
          childImageSharp {
            gatsbyImageData(width: 3720, layout: CONSTRAINED)
          }
        }
        imgCaption
        imgCaptionLink
        canonicalLink
      }
    }
  }
`
