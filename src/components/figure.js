import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const InnerFigure = ({ data, children, width, alt }) => {
  if(!width) width = "100%"
  const image = getImage(data)
  return (
    <div id="content-figure" style={{width: width, margin: "0 auto"}}>
      <figure>
        <a href={data.images.fallback.src} target="_blank" rel="noreferrer">
          <GatsbyImage alt={alt || ""} image={image}/>
        </a>
        {children && <figcaption>{children}</figcaption>}
      </figure>
    </div>)
}

const Figure = ({ children, src, width, alt }) => {
  const data = useStaticQuery(graphql`
    query FigureQuery {
      figureQuery: allImageSharp {
        edges {
          node {
            gatsbyImageData(width: 1240, layout: CONSTRAINED)
          }
        }
      }
    }
  `)

  var queryResult = data.figureQuery.edges.find(
    element => element.node.gatsbyImageData.images.fallback.src.split('/').pop() === src
  )
  if (!queryResult) throw new Error("Figure Component: Can't find image")
  return <InnerFigure children={children} data={queryResult.node.gatsbyImageData} width={width} alt={alt} />
}

export default Figure
export { InnerFigure }
