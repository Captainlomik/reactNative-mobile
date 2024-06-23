import * as renderer from "react-test-renderer";
import { Button } from "./button";

describe('<Button />', () => {
  it("simple button", () => {
    const tree = renderer.
      create(<Button text="Hello" />).
      toJSON()

    expect(tree).toMatchSnapshot()
  })
  it("simple button", () => {
    const tree = renderer.
      create(<Button text="Hello" isloading={true} />).
      toJSON()

    expect(tree).toMatchSnapshot()
  })
})
