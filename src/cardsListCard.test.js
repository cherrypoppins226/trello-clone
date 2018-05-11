import React from "react";
import faker from "faker";
import { Simulate } from "react-testing-library";
import { render } from "./testHelpers.js";
import CardsListCard, {
  EDIT_CARD_LABEL,
  cardDescription
} from "./cardsListCard";
import Board from "./board";
import { EDIT_CARD_DESCRIPTION } from "./editCard";

it("initial render", () => {
  const { container } = render(
    <CardsListCard description="Card list card text" onEditCard={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
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
