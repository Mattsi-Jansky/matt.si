import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const InnerFigure = ({ data, children, width }) => {
  if(!width) width = "100%"
  return (
    <div id="content-figure" style={{width: width}}>
      <figure>
        <Img fluid={data} onClick={() => { window.open(data.src)}} />
        {children && <figcaption>{children}</figcaption>}
      </figure>
    </div>)
}

const renderFigureWithQueryResults = (src, children, width) => data => {
  var queryResult = data.figureQuery.edges.find(
    element => element.node.fluid.src.split('/').pop() === src
  )
  if (!queryResult) throw new Error("Figure Comoponent: Can't find image")
  return <InnerFigure children={children} data={queryResult.node.fluid} width={width} />
}

export default ({ children, src, width }) => (
  <StaticQuery
    query={graphql`
      query FigureQuery {
        figureQuery: allImageSharp {
          edges {
            node {
              fluid(maxWidth: 1240) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `}
    render={renderFigureWithQueryResults(src, children, width)}
  />
)
export { InnerFigure }
