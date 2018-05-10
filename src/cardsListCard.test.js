import React from "react";
import faker from "faker";
import { Simulate } from "react-testing-library";
import { render } from "./testHelpers.js";
import CardsList from "./cardsList";
import CardsListCard, {
  EDIT_CARD_LABEL,
  cardDescription
} from "./cardsListCard";
import Board, { EDIT_CARD_DESCRIPTION } from "./board";

it("initial render", () => {
  const { container } = render(
    <CardsListCard description="Card list card text" onEditCard={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});

it("adds a card", () => {
  const { getByText, getByTestId } = render(
    <CardsList
      title="Title"
      cards={["card1", "card2"]}
      onEditCard={jest.fn()}
    />
  );
  const liveList = getByTestId("cards-list");
  const countBefore = liveList.childElementCount;
  const lastBefore = liveList.lastElementChild;
  Simulate.click(getByText("Add a card..."));
  expect(liveList.childElementCount).toBe(countBefore + 1);
  expect(liveList.lastElementChild).not.toBe(lastBefore);
  expect(liveList.lastElementChild.tagName).toBe(lastBefore.tagName);
});

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

it("opens edit card modal with correct text", () => {
  const { container } = render(<Board lists={lists} />);
  const editCard = container.querySelector(
    `[aria-labelledby="${EDIT_CARD_LABEL}"]`
  );
  Simulate.click(editCard);
  const modal = container.querySelector(
    `[aria-describedby="${EDIT_CARD_DESCRIPTION}"]`
  );
  expect(modal).not.toBeNull();
  const modalContainer = editCard.parentElement;
  expect(modal.parentElement).toBe(modalContainer);
  expect(modal.querySelector("textarea").textContent).toBe(
    cardDescription(modalContainer)
  );
});
