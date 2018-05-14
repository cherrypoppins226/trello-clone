import React from "react";
import snapshotDiff from "snapshot-diff";
import { getByText, getByTestId } from "dom-testing-library";
import { Simulate, fireEvent } from "react-testing-library";
import { renderIntoDocument, NativeEvents } from "../../testHelpers.js";
import { testData } from "../../appData.js";
import App from "../App";
import { cardDescription, EDIT_CARD_LABEL } from "../CardsListCard";
import { LIST_ACTIONS_MENU_LABEL } from "../CardsList";
import { EDIT_CARD_DESCRIPTION } from "../EditCard";

const app = renderIntoDocument(<App lists={testData} />).container
  .firstElementChild;

describe("app", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
});

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
      `[aria-labelledby="${LIST_ACTIONS_MENU_LABEL}"]`
    );
    const before = document.body.cloneNode(true);
    Simulate.click(actionsMenuButton);
    expect(
      snapshotDiff(before, document.body.cloneNode(true))
    ).toMatchSnapshot();
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
      `[aria-labelledby="${EDIT_CARD_LABEL}"]`
    );
    Simulate.click(editCard);
    const modal = app.querySelector(
      `[aria-describedby="${EDIT_CARD_DESCRIPTION}"]`
    );
    expect(modal).not.toBeNull();
    const modalContainer = editCard.parentElement;
    expect(modal.parentElement).toBe(modalContainer);
    expect(modal.querySelector("textarea").textContent).toBe(
      cardDescription(modalContainer)
    );
  });
});
