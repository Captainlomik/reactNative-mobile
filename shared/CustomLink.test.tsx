import * as React from "react";
import * as renderer from "react-test-renderer";
import { CustomLink } from "./CustomLink";

describe("<CustomLink />", () => {
  it("simple link", () => {
    const tree = renderer
      .create(<CustomLink href={"/restorej"} text={"Восстановить пароль"} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
