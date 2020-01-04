import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Sidebar from '.././components/sidebar'
import '../styles/main.scss'
import '../styles/fonts/font-awesome/css/font-awesome.min.css'

const InnerLayout = ({ data, children }) => (
  <Fragment>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Lato|PT+Serif&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Sidebar siteMetadata={data.site.siteMetadata} />
    <main className="clearfix">{children}</main>
  </Fragment>
)

const DefaultLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => <InnerLayout children={children} data={data} />}
  />
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
export { InnerLayout }
