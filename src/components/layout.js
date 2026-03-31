import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from '.././components/sidebar'
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
    }
  `)

  return (
    <>
      <Sidebar siteMetadata={data.site.siteMetadata} />
      <main className="clearfix">{children}</main>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
