import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './sidebar'
import '../styles/main.scss'

const DefaultLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          description
          social {
            twitter
            facebook
            linkedin
            github
            email
          }
        }
      }
      allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const tags = data.allMarkdownRemark.group
    .filter(tag => tag.totalCount >= 2)
    .sort((a, b) => b.totalCount - a.totalCount)

  return (
    <>
      <Sidebar siteMetadata={data.site.siteMetadata} tags={tags} />
      <main className="clearfix">{children}</main>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
