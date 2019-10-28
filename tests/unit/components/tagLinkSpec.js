import React from "react"
import renderer from "react-test-renderer"
import TagLink from "../../../src/components/tagLink"
import { shallow } from 'enzyme';

describe("TagLink", () => {
  it("hasn't changed", () => {
    const tagLink = renderer
      .create(<TagLink tag="test" />)
      .toJSON()
    expect(tagLink).toMatchSnapshot()
  })

  it("should render children", () => {
    const expectedText = "hello world"
    const tagLink = shallow(<TagLink tag="test">{expectedText}</TagLink>)

    expect(tagLink.text()).toEqual(expectedText)
  })
})
