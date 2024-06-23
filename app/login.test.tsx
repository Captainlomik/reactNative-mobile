import * as renderer from "react-test-renderer";
import Login from "./login";


describe('<Login />', () => {
  it("Login page", () => {
    jest.useFakeTimers()

    const tree = renderer.
      create(<Login />).
      toJSON()

    expect(tree).toMatchSnapshot()
  })
})
