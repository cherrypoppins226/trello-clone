import React from "react";
import faker from "faker";
import {
  shallow,
  mockEvent,
  findByText,
  testId
} from "./test/enzymeShallowUtils";
import { Board, CardsList, CardsListCard } from "./app";

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

describe("board", () => {
  it("initial render", () => {
    const tree = shallow(<Board lists={lists} />);
    expect(tree).toMatchSnapshot();
  });
});

describe("cards list", () => {
  it("initial render", () => {
    const [title, cards] = Object.entries(lists)[0];
    const tree = shallow(<CardsList title={title} cards={cards} />);
    expect(tree).toMatchSnapshot();
  });
});

describe("cards list card", () => {
  it("initial render", () => {
    const tree = shallow(<CardsListCard description="Card list card text" />);
    expect(tree).toMatchSnapshot();
  });

  it("adds a card", () => {
    const [title, cards] = Object.entries(lists)[0];
    const tree = shallow(<CardsList title={title} cards={cards} />);
    const before = tree.find(testId("cards-list")).children();
    findByText("add a card", tree).simulate("click", mockEvent);
    const after = tree.find(testId("cards-list")).children();
    expect(after).toHaveLength(before.length + 1);
    expect(after.last().is(CardsListCard)).toBe(true);
  });
});
