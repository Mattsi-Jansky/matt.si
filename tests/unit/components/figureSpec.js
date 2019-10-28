import React from "react"
import renderer from "react-test-renderer"
import { InnerFigure } from "../../../src/components/figure"
import { shallow } from 'enzyme';
import expectExport from "expect";

const testData = {
  "base64":"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAwABBP/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAAES6MFko//EABoQAAICAwAAAAAAAAAAAAAAAAECAAMREyH/2gAIAQEAAQUCNx17OclKKy4AmJ//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAeEAACAQMFAAAAAAAAAAAAAAAAARICIYEQEUFRYf/aAAgBAQAGPwKLqt6Rkng5wi6Kdu9P/8QAHRAAAgEEAwAAAAAAAAAAAAAAAAERITFBUWGBkf/aAAgBAQABPyFm4M1E7Sb2Oc+wamtug3YokOW/T//aAAwDAQACAAMAAAAQEz//xAAXEQADAQAAAAAAAAAAAAAAAAAAAREh/9oACAEDAQE/EGrpEf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAgBAgEBPxCVr//EAB8QAQACAQMFAAAAAAAAAAAAAAEAESExQVFhcZHR8f/aAAgBAQABPxBeEekldrM/ICQMFAPF2wuXceUeSFWGDpt0imNAa3ISy441+5//2Q==",
  "aspectRatio":1.8283870967741935,
  "src":"/static/45b26cc583de29f73117dce640a86d75/8a760/banner.jpg",
  "srcSet":"/static/45b26cc583de29f73117dce640a86d75/68709/banner.jpg 310w,\n/static/45b26cc583de29f73117dce640a86d75/53593/banner.jpg 620w,\n/static/45b26cc583de29f73117dce640a86d75/8a760/banner.jpg 1240w,\n/static/45b26cc583de29f73117dce640a86d75/0e6ff/banner.jpg 1860w,\n/static/45b26cc583de29f73117dce640a86d75/7efdd/banner.jpg 2480w,\n/static/45b26cc583de29f73117dce640a86d75/f2bea/banner.jpg 2834w",
  "sizes":"(max-width: 1240px) 100vw, 1240px"
}

describe("Figure", () => {
  it("hasn't changed", () => {
    const figure = renderer
      .create(<InnerFigure data={testData}>Image from <a href="foo.bar">Foo Bar</a></InnerFigure>)
      .toJSON()
    expect(figure).toMatchSnapshot()
  })

  it("should include a Gatsby Img with fluid prop", () => {
    const figure = shallow(<InnerFigure data={testData}/>)

    expect(figure.exists('Image')).toEqual(true)
    expect(figure.find('Image').prop('fluid')).toEqual(testData)
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
