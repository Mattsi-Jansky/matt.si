import React from "react"
import renderer from "react-test-renderer"
import { InnerFigure } from "../../../src/components/figure"
import { shallow } from 'enzyme';

const testData = {
  "images": {
    "fallback": {
      "src": "/static/45b26cc583de29f73117dce640a86d75/8a760/banner.jpg",
      "srcSet": "/static/45b26cc583de29f73117dce640a86d75/68709/banner.jpg 310w,\n/static/45b26cc583de29f73117dce640a86d75/53593/banner.jpg 620w,\n/static/45b26cc583de29f73117dce640a86d75/8a760/banner.jpg 1240w",
      "sizes": "(min-width: 1240px) 1240px, 100vw"
    },
    "sources": []
  },
  "layout": "constrained",
  "width": 1240,
  "height": 678
}

jest.mock('gatsby-plugin-image', () => {
  const React = require('react')
  return {
    GatsbyImage: jest.fn(({ image, alt, ...props }) =>
      React.createElement('img', { alt, ...props })
    ),
    getImage: jest.fn(data => data),
  }
})

describe("Figure", () => {
  it("hasn't changed", () => {
    const figure = renderer
      .create(<InnerFigure data={testData}>Image from <a href="foo.bar">Foo Bar</a></InnerFigure>)
      .toJSON()
    expect(figure).toMatchSnapshot()
  })

  it("should include a GatsbyImage", () => {
    const figure = shallow(<InnerFigure data={testData}/>)

    expect(figure.find('a').exists()).toEqual(true)
    expect(figure.find('a').prop('href')).toEqual(testData.images.fallback.src)
  })

  it("should render children inside figcaption", () => {
    const expectedText = "Image from Foo Bar"
    const figure = shallow(<InnerFigure data={testData}>{expectedText}</InnerFigure>)

    expect(figure.exists('figcaption')).toEqual(true)
    expect(figure.find('figcaption').text()).toEqual(expectedText)
  })

  it("given no caption is passed should not render figcaption element", () => {
    const figure = shallow(<InnerFigure data={testData}/>)

    expect(figure.exists('figcaption')).toEqual(false)
  })

  it("given width prop should set width of figure through wrapper", () => {
    const expectedWidth = 700
    const figure = shallow(<InnerFigure data={testData} width={expectedWidth}/>)

    expect(figure.exists('div')).toBe(true)
    expect(figure.find('div').prop('style')).toHaveProperty('width', expectedWidth)
  })
})
