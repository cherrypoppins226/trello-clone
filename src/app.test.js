import React from "react";
import renderer from "react-test-renderer";
import faker from "faker";
import App from "./app";

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

it("renders correctly", () => {
  const tree = renderer.create(<App lists={lists} />).toJSON();
  expect(tree).toMatchSnapshot();
});
