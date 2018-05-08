import React from "react";
import { Simulate } from "react-testing-library";
import { render } from "./testHelpers.js";
import CardsList from "./cardsList";
import CardsListCard from "./cardsListCard";

it("initial render", () => {
  const { container } = render(
    <CardsListCard description="Card list card text" />
  );
  expect(container).toMatchSnapshot();
});

it("adds a card", () => {
  const { getByText, getByTestId } = render(
    <CardsList title="Title" cards={["card1", "card2"]} />
  );
  const liveList = getByTestId("cards-list");
  const lengthBefore = liveList.childElementCount;
  Simulate.click(getByText("Add a card..."));
  expect(liveList.childElementCount).toBe(lengthBefore + 1);
  expect(liveList.firstElementChild.tagName).toBe(
    liveList.lastElementChild.tagName
  );
});
