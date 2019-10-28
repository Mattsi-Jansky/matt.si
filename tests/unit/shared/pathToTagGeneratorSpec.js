import PathToTagGenerator from "../../../src/shared/pathToTagGenerator"

describe("PathToTagGenerator", () => {
  it("adds tags path", () => {
    const input = `faketag`
    const result = PathToTagGenerator(input)
    expect(result).toMatch("\/tags\/")
  })

  it("changes tag to lowercase", () => {
    const input = `CoMPuTeRs`
    const result = PathToTagGenerator(input)
    expect(result).toMatch("computers")
  })

  it("Changes spaces in tag to dashes", () => {
    const input = `digital rights`
    const result = PathToTagGenerator(input)
    expect(result).toMatch("l-r")
  })
})