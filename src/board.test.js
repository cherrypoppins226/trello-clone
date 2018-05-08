import React from "react";
import faker from "faker";
import { render } from "react-testing-library";
import Board from "./board";

jest.mock("./cardsList", () => () => "CardsList");

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

it("initial render", () => {
  const { container } = render(<Board lists={lists} />);
  expect(container).toMatchSnapshot();
});
