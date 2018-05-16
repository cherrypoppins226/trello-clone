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
import { cardDescription } from "../CardsList/Card";
import * as Labels from "../labels";

let fn = () => {};

let app = <App lists={testData} />;

const board = <Board lists={testData} />;

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
  it("edit title", () => {
    const { container } = render(cardsList);
    const titleElem = node => getByRole(node, "heading");
    const originalElem = titleElem(container);

    // Clicking in the title should bring up a textarea
    Simulate.click(originalElem);
    const newElem = titleElem(container);
    expect(newElem.tagName).toBe("TEXTAREA");

    // Clicking inside the textarea shouldn't close it
    fireEvent(newElem, NativeEvents.mouse.click);
    expect(titleElem(container)).toEqual(newElem);

    // Clicking outside should close it
    fireEvent(container, NativeEvents.mouse.click);
    expect(titleElem(container)).toEqual(originalElem);
  });

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
  it("opens quick edit card modal", () => {
    const { container } = render(board);
    const card = getByTestId(container, "CardsListCard");
    const getModal = () =>
      getByAriaDescribed(container, Labels.quickEditCardDescription.id);
    expect(getModal()).toBeNull();
    Simulate.click(getByAriaLabelled(card, Labels.quickEditCard.id));
    expect(getModal()).not.toBeNull();
    expect(getModal().querySelector("textarea").textContent).toBe(
      cardDescription(card)
    );
  });

  it("opens edit card modal", () => {
    const { container } = render(board);
    const getModal = () =>
      getByAriaDescribed(container, Labels.editCardDescription.id);
    expect(getModal()).toBeNull();
    Simulate.click(getByAriaLabelled(container, Labels.editCard.id));
    expect(getModal()).not.toBeNull();
  });
});
