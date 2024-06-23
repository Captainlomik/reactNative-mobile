import * as renderer from "react-test-renderer";
import { Chip } from "./chip";

describe('<Chip />', () => {
  it("simple chip", () => {
    const tree = renderer.
      create(<Chip text="hello ma old friend" />).
      toJSON()

    expect(tree).toMatchSnapshot()
  })
})
