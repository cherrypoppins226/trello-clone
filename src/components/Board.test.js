import React from "react";
import { render } from "../testHelpers.js";
import { testData } from "../appData.js";
import Board from "./Board";

jest.mock("./CardsList", () => () => "CardsList");
jest.mock("./EditCard", () => () => "EditCard");

it("initial render", () => {
  const { container } = render(<Board lists={testData} />);
  expect(container).toMatchSnapshot();
});
