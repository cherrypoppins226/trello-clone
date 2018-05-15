import React from "react";
import { getByText, getByTestId } from "dom-testing-library";
import { Simulate, fireEvent } from "react-testing-library";
import {
  renderIntoDocument,
  render,
  NativeEvents,
  getByAriaLabelled,
  getByAriaDescribed,
  getByRole
} from "../../testHelpers.js";
import { testData } from "../../appData.js";
import App from "../App";
import Board from "../Board";
import CardsList from "../CardsList";
import { cardDescription } from "../CardsListCard";
import * as Labels from "../labels";

let fn = () => {};

let app = <App lists={testData} />;

const board = <Board lists={testData} />;

const cardsList = (
  <CardsList
    title="title"
    cards={["card"]}
    onEditList={fn}
    onEditCard={fn}
    onEditFullCard={fn}
  />
);

describe("app smoke test", () => {
  renderIntoDocument(app);
});

describe("cards list", () => {
  it("edit title", () => {
    const { container } = renderIntoDocument(cardsList);
    const titleElem = node => getByRole(node, "heading");
    const originalElem = titleElem(container);
    Simulate.click(originalElem);
    expect(titleElem(container).tagName).toBe("TEXTAREA");
    fireEvent(container, NativeEvents.mouse.click);
    expect(titleElem(container)).toEqual(originalElem);
  });

  it("opens and closes list actions menu", () => {
    const { container } = renderIntoDocument(board);
    Simulate.click(
      getByAriaLabelled(container, Labels.cardsListActionsMenu.id)
    );
    expect(
      getByAriaDescribed(
        document.body,
        Labels.cardsListActionsMenuDescription.id
      )
    ).not.toBeNull();
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
  it("edit card modal opens correctly", () => {
    const { container } = renderIntoDocument(board);
    const card = getByTestId(container, "CardsListCard");
    Simulate.click(getByAriaLabelled(card, Labels.editCard.id));
    const modal = getByAriaDescribed(
      document.body,
      Labels.editCardDescription.id
    );
    expect(modal).not.toBeNull();
    expect(modal.querySelector("textarea").textContent).toBe(
      cardDescription(card)
    );
  });

  it("edit full card modal opens correctly", () => {
    const { container } = renderIntoDocument(board);
    const editCard = getByAriaLabelled(container, Labels.fullyEditCard.id);
    Simulate.click(editCard);
    const modal = getByAriaDescribed(
      document.body,
      Labels.fullyEditCardDescription.id
    );
    expect(modal).not.toBeNull();
  });
});
