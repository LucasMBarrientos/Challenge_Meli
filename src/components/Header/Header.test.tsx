import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Header } from "./";

describe("<Header />", () => {
  it("Should render default without crash", () => {
    const { asFragment } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

});
