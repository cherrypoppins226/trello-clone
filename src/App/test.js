import { getByText } from "dom-testing-library";
import { Simulate } from "react-testing-library";

import { render, renderIntoDocument } from "./utils/dom";
import { labelledBy, describedBy } from "./utils";
import * as labels from "./labels";
import * as fixtures from "./fixtures";

describe("cards list", () => {
  it("opens list actions menu", async () => {
    await renderIntoDocument(fixtures.App.default);
    const getMenu = () =>
      document.querySelector(
        describedBy(labels.cardsListActionsMenuDescription.id)
      );
    expect(getMenu()).toBeNull();
    Simulate.click(
      document.querySelector(labelledBy(labels.cardsListActionsMenu.id))
    );
    expect(getMenu()).not.toBeNull();
  });

  it("adds a card", async () => {
    const { container } = await render(fixtures.CardsList.CardsList.default);
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
  const testModal = async (editButtonSelector, modalSelector, textSelector) => {
    await renderIntoDocument(fixtures.App.default);
    const card = document.querySelector("[data-cardid='1']");
    expect(document.querySelector(modalSelector)).toBeNull();
    Simulate.click(
      editButtonSelector ? card.querySelector(editButtonSelector) : card
    );
    expect(document.querySelector(modalSelector)).not.toBeNull();
    const cardDescription = node =>
      node.querySelector(labelledBy(labels.card.id)).textContent;
    expect(
      document.querySelector(modalSelector).querySelector(textSelector)
        .textContent
    ).toBe(cardDescription(card));
  };

  it("opens quick edit card modal", async () => {
    await testModal(
      labelledBy(labels.quickEditCard.id),
      describedBy(labels.quickEditCardDescription.id),
      "textarea"
    );
  });

  it("opens edit card modal", async () => {
    await testModal(
      null,
      describedBy(labels.editCardDescription.id),
      "[role='heading']"
    );
  });
});
