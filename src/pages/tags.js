import React from 'react'
import { graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import TagLink from '../components/tagLink'
import SEO from '../components/seo'

class TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const allTags = data.allMarkdownRemark.group
      .sort((a, b) => b.totalCount - a.totalCount)

    return (
      <DefaultLayout>
        <div className="tags-page">
          <h1>Tags</h1>
          <ul className="tags-page-list">
            {allTags.map(tag => (
              <li key={tag.fieldValue}>
                <TagLink tag={tag.fieldValue}>
                  <span className="tags-page-name">{tag.fieldValue}</span>
                  <span className="tags-page-count">{tag.totalCount}</span>
                </TagLink>
              </li>
            ))}
          </ul>
        </div>
      </DefaultLayout>
    )
  }
}

export default TagsPage

export const Head = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  return <SEO title={siteTitle} />
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
