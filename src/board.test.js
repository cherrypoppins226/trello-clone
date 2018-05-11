import React from "react";
import { render, appData } from "./__tests__/helpers.js";
import Board from "./board";

jest.mock("./cardsList", () => () => "CardsList");

it("initial render", () => {
  const { container } = render(<Board lists={appData} />);
  expect(container).toMatchSnapshot();
});
