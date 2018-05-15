import React from "react";
import { getByText, getByTestId } from "dom-testing-library";
import { Simulate, fireEvent } from "react-testing-library";
import {
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

it("app smoke test", () => {
  render(app);
});

describe("cards list", () => {
  it("edit title", () => {
    const { container } = render(cardsList);
    const titleElem = node => getByRole(node, "heading");
    const originalElem = titleElem(container);
    Simulate.click(originalElem);
    expect(titleElem(container).tagName).toBe("TEXTAREA");
    // We registered the event listener with 'addEventListener', so we have to
    // trigger a native event instead.
    fireEvent(container, NativeEvents.mouse.click);
    expect(titleElem(container)).toEqual(originalElem);
  });

  it("opens list actions menu", () => {
    const { container } = render(board);
    Simulate.click(
      getByAriaLabelled(container, Labels.cardsListActionsMenu.id)
    );
    expect(
      getByAriaDescribed(container, Labels.cardsListActionsMenuDescription.id)
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
  it("opens edit card", () => {
    const { container } = render(board);
    const card = getByTestId(container, "CardsListCard");
    Simulate.click(getByAriaLabelled(card, Labels.editCard.id));
    const modal = getByAriaDescribed(container, Labels.editCardDescription.id);
    expect(modal).not.toBeNull();
    expect(modal.querySelector("textarea").textContent).toBe(
      cardDescription(card)
    );
  });

  it("opens full edit card", () => {
    const { container } = render(board);
    const editCard = getByAriaLabelled(container, Labels.fullyEditCard.id);
    Simulate.click(editCard);
    const modal = getByAriaDescribed(
      container,
      Labels.fullyEditCardDescription.id
    );
    expect(modal).not.toBeNull();
  });
});
