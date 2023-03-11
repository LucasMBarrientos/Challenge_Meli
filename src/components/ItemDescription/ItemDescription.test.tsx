import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ItemDescription,ItemDescriptionProps } from "./";

const defaultProps: ItemDescriptionProps = {
  id: "test_id",
  text: "test_text",
  price: 0,
  ubicacion: "test_location",
  currency_id: "test_currencyId",
};


describe("<Header />", () => {
  it("Should render default without crash", () => {
    const { asFragment } = render(<ItemDescription {...defaultProps}/>);

    expect(asFragment()).toMatchSnapshot();
  });

});
