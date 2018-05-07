import React from "react";
import {
  shallow,
  mockEvent,
  findByText,
  testId
} from "./test/enzymeShallowUtils";
import CardsList from "./cardsList";
import CardsListCard from "./cardsListCard";

it("initial render", () => {
  const tree = shallow(<CardsListCard description="Card list card text" />);
  expect(tree).toMatchSnapshot();
});

it("adds a card", () => {
  const title = "List title";
  const cards = ["card1", "card2"];
  const tree = shallow(<CardsList title={title} cards={cards} />);
  const before = tree.find(testId("cards-list")).children();
  findByText("add a card", tree).simulate("click", mockEvent);
  const after = tree.find(testId("cards-list")).children();
  expect(after).toHaveLength(before.length + 1);
  expect(after.last().is(CardsListCard)).toBe(true);
});
