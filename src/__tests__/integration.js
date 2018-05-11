import React from "react";
import faker from "faker";
import { Simulate } from "react-testing-library";
import { render } from "./helpers.js";
import { cardDescription, EDIT_CARD_LABEL } from "../cardsListCard";
import Board from "../board";
import { EDIT_CARD_DESCRIPTION } from "../editCard";

faker.seed(1);

const lists = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

it("modal renders correctly", () => {
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
