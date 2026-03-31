import React from "react"
import renderer from "react-test-renderer"
import DefaultLayout from "../../../src/components/layout"

jest.mock('gatsby', () => {
  const React = require('react')
  return {
    useStaticQuery: jest.fn().mockReturnValue({
      site: {
        siteMetadata: {
          author: "Test Author",
          description: "Test Description",
          social: {
            twitter: "test",
            facebook: "",
            linkedin: "test",
            github: "test",
            email: "test@test.com",
          },
        },
      },
    }),
    graphql: jest.fn(),
    Link: jest.fn(({ to, children, ...rest }) =>
      React.createElement('a', { href: to, ...rest }, children)
    ),
  }
})

describe("Default Layout", () => {
  it("hasn't changed", () => {
    const defaultLayout = renderer
      .create(<DefaultLayout>test</DefaultLayout>)
      .toJSON()
    expect(defaultLayout).toMatchSnapshot()
  })
})
