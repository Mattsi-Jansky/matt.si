import React from "react"
import renderer from "react-test-renderer"
import { InnerLayout } from "../../../src/components/layout"
import siteMetadata from "../../fakes/siteMetadata"

describe("Default Layout", () => {
  it("hasn't changed", () => {
    const defaultLayout = renderer
      .create(<InnerLayout data={{site: {siteMetadata: siteMetadata }}}>test</InnerLayout>)
      .toJSON()
    expect(defaultLayout).toMatchSnapshot()
  })
})
