import React from "react";
import { getByText, getByTestId } from "dom-testing-library";
import { Simulate, fireEvent } from "react-testing-library";
import {
  renderIntoDocument,
  NativeEvents,
  getByAriaLabelled,
  getByAriaDescribed,
  getByRole
} from "../../testHelpers.js";
import { testData } from "../../appData.js";
import App from "../App";
import { cardDescription } from "../CardsListCard";
import * as Labels from "../labels";

let app = null;

describe("app smoke test", () => {
  app = renderIntoDocument(<App lists={testData} />).container;
});

describe("cards list", () => {
  const container = getByTestId(app, "CardsList");

  it("edit title", () => {
    const titleElem = node => getByRole(node, "heading");
    const originalElem = titleElem(container);
    Simulate.click(originalElem);
    expect(titleElem(container).tagName).toBe("TEXTAREA");
    fireEvent(container, NativeEvents.mouse.click);
    expect(titleElem(container)).toEqual(originalElem);
  });

  it("opens and closes list actions menu", () => {
    Simulate.click(
      getByAriaLabelled(container, Labels.cardsListActionsMenu.id)
    );
    expect(
      getByAriaDescribed(
        document.body,
        Labels.cardsListActionsMenuDescription.id
      )
    ).not.toBeNull();
    // The list actually unmounts itself when anything is clicked in the App.
    // However, I can't for the life of me, remove it programmatically. Leaving
    // this here for posterity.
    // fireEvent(document.body, NativeEvents.mouse.click);
    // expect(document.body.querySelector(menuSelector)).toBeNull();
  });

  it("adds a card", () => {
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
    const card = getByTestId(app, "CardsListCard");
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
    const editCard = getByAriaLabelled(app, Labels.fullyEditCard.id);
    Simulate.click(editCard);
    const modal = getByAriaDescribed(
      document.body,
      Labels.fullyEditCardDescription.id
    );
    expect(modal).not.toBeNull();
  });
});
