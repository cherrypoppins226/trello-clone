import React from "react";
import faker from "faker";
import { shallow } from "./test/enzymeShallowUtils";
import Board from "./board";

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

it("initial render", () => {
  const tree = shallow(<Board lists={lists} />);
  expect(tree).toMatchSnapshot();
});
