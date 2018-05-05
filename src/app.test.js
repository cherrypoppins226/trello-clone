import React from "react";
import faker from "faker";
import {
  shallow,
  mockEvent,
  findByText,
  findByTestId
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
    const [name, cards] = Object.entries(lists)[0];
    const tree = shallow(<CardsList name={name} cards={cards} />);
    expect(tree).toMatchSnapshot();
  });
});

describe("cards list card", () => {
  it("initial render", () => {
    const tree = shallow(<CardsListCard text="Card list card text" />);
    expect(tree).toMatchSnapshot();
  });

  it("adds a card", () => {
    const [name, cards] = Object.entries(lists)[0];
    const tree = shallow(<CardsList name={name} cards={cards} />);
    const before = findByTestId("cards-list", tree).children();
    findByText("add a card", tree).simulate("click", mockEvent);
    const after = findByTestId("cards-list", tree).children();
    expect(after).toHaveLength(before.length + 1);
    expect(after.last().is(CardsListCard)).toBe(true);
  });
});
