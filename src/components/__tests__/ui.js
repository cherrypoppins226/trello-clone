import React from "react";
import { getByText, getByTestId } from "dom-testing-library";
import { Simulate, fireEvent } from "react-testing-library";
import { renderIntoDocument, NativeEvents } from "../../testHelpers.js";
import { testData } from "../../appData.js";
import App from "../App";
import { cardDescription } from "../CardsListCard";
import * as Labels from "../labels";

const app = renderIntoDocument(<App lists={testData} />).container
  .firstElementChild;

describe("cards list", () => {
  const container = getByTestId(app, "CardsList");

  it("edit title", () => {
    const titleElem = node => node.querySelector("[role='heading']");
    const originalElem = titleElem(container);
    Simulate.click(originalElem);
    expect(titleElem(container).tagName).toBe("TEXTAREA");
    fireEvent(container, NativeEvents.mouse.click);
    expect(titleElem(container)).toEqual(originalElem);
  });

  it("opens list actions menu", () => {
    const actionsMenuButton = container.querySelector(
      `[aria-describedby="${Labels.cardsListActionsMenu.id}"]`
    );
    Simulate.click(actionsMenuButton);
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
  it("edit card modal renders correctly", () => {
    const editCard = app.querySelector(
      `[aria-labelledby="${Labels.editCard.id}"]`
    );
    Simulate.click(editCard);
    const modal = app.querySelector(
      `[aria-describedby="${Labels.editCardDescription.id}"]`
    );
    expect(modal).not.toBeNull();
    const modalContainer = editCard.parentElement;
    expect(modal.parentElement).toBe(modalContainer);
    expect(modal.querySelector("textarea").textContent).toBe(
      cardDescription(modalContainer)
    );
  });
});
