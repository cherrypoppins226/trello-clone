import React from "react";
import { render } from "./testHelpers.js";
import appData from "./appData.js";
import Board from "./board";

jest.mock("./cardsList", () => () => "CardsList");

it("initial render", () => {
  const { container } = render(<Board lists={appData} />);
  expect(container).toMatchSnapshot();
});
