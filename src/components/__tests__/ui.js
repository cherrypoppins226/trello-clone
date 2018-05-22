import React from "react";
import { getByText, getByTestId } from "dom-testing-library";
import { Simulate } from "react-testing-library";
import {
  render,
  getByAriaLabelled,
  getByAriaDescribed
} from "../../testHelpers.js";
import fixture from "../App.fixture";
import App from "../App";
import Board from "../Board";
import CardsList from "../CardsList";
import { cardDescription } from "../CardsList/Card";
import * as Labels from "../labels";

let fn = () => {};

let app = <App lists={fixture.props.lists} />;

const board = <Board lists={fixture.props.lists} />;

const cardsList = (
  <CardsList
    title="title"
    cards={["card"]}
    onEditList={fn}
    onQuickEditCard={fn}
    onEditCard={fn}
  />
);

it("app smoke test", () => {
  render(app);
});

describe("cards list", () => {
  it("opens list actions menu", () => {
    const { container } = render(board);
    const getMenu = () =>
      getByAriaDescribed(container, Labels.cardsListActionsMenuDescription.id);
    expect(getMenu()).toBeNull();
    Simulate.click(
      getByAriaLabelled(container, Labels.cardsListActionsMenu.id)
    );
    expect(getMenu()).not.toBeNull();
  });

  it("adds a card", () => {
    const { container } = render(cardsList);
    const liveList = container.querySelector("ul");
    const countBefore = liveList.childElementCount;
    const lastBefore = liveList.lastElementChild;
    Simulate.click(getByText(container, "Add a card..."));
    expect(liveList.childElementCount).toBe(countBefore + 1);
    expect(liveList.lastElementChild).not.toBe(lastBefore);
    expect(liveList.lastElementChild.tagName).toBe(lastBefore.tagName);
  });
});

describe("cards list card", () => {
  const testModal = (getEditButton, getModal, textSelector) => {
    const { container } = render(board);
    const card = getByTestId(container, "CardsListCard");
    expect(getModal(container)).toBeNull();
    Simulate.click(getEditButton(card));
    expect(getModal(container)).not.toBeNull();
    expect(getModal(container).querySelector(textSelector).textContent).toBe(
      cardDescription(card)
    );
  };

  it("opens quick edit card modal", () => {
    testModal(
      node => getByAriaLabelled(node, Labels.quickEditCard.id),
      node => getByAriaDescribed(node, Labels.quickEditCardDescription.id),
      "textarea"
    );
  });

  it("opens edit card modal", () => {
    testModal(
      node => node,
      node => getByAriaDescribed(node, Labels.editCardDescription.id),
      "[role='heading']"
    );
  });
});
