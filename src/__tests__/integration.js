import React from "react";
import { Simulate } from "react-testing-library";
import { render } from "../testHelpers.js";
import { testData } from "../appData.js";
import { cardDescription, EDIT_CARD_LABEL } from "../cardsListCard";
import Board from "../board";
import { EDIT_CARD_DESCRIPTION } from "../editCard";

it("modal renders correctly", () => {
  const { container } = render(<Board lists={testData} />);
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
