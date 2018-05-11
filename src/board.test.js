import React from "react";
import { render } from "./testHelpers.js";
import { testData } from "./appData.js";
import Board from "./board";

jest.mock("./cardsList", () => () => "CardsList");
jest.mock("./editCard", () => () => "EditCard");

it("initial render", () => {
  const { container } = render(<Board lists={testData} />);
  expect(container).toMatchSnapshot();
});
