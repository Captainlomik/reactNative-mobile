import * as renderer from "react-test-renderer";
import { Input } from "./input";

describe('<Input />', () => {
  it("simple input", () => {
    const tree = renderer.
      create(<Input />).
      toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("input for password", () => {
    const tree = renderer.
      create(<Input isPassword={true} />).
      toJSON()

    expect(tree).toMatchSnapshot()
  })
})
