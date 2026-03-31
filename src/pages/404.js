import React from 'react'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class NotFoundPage extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <h1>
          Page not found. If this is in error, please{' '}
          <a href="https://twitter.com/mattsijansky">let me know!</a>
        </h1>
        <br />
      </DefaultLayout>
    )
  }
}

export default NotFoundPage

export const Head = () => <SEO title="Not Found - Matt.si" />
