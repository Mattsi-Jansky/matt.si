import React from "react"
import renderer from "react-test-renderer"
import Sidebar from "../../../src/components/sidebar"
import siteMetadata from "../../fakes/siteMetadata"

describe("Sidebar", () => {
  it("hasn't changed", () => {
    const sidebar = renderer
      .create(<Sidebar siteMetadata={siteMetadata}/>)
      .toJSON()
    expect(sidebar).toMatchSnapshot()
  })
})
