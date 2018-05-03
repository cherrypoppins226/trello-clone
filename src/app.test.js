import React from "react";
import { shallow } from "enzyme";
import faker from "faker";
import { Board, CardsList, CardsListCard } from "./app";

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

describe("renders correctly", () => {
  it("board", () => {
    const tree = shallow(<Board lists={lists} />).dive();
    expect(tree).toMatchSnapshot();
  });

  it("cards-list", () => {
    const [name, cards] = Object.entries(lists)[0];
    const tree = shallow(<CardsList name={name} cards={cards} />).dive();
    expect(tree).toMatchSnapshot();
  });

  it("cards-list card", () => {
    const tree = shallow(<CardsListCard text="Card list card text" />).dive();
    expect(tree).toMatchSnapshot();
  });
});
