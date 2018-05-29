import { getByText } from "dom-testing-library";
import { Simulate } from "react-testing-library";

import { render } from "./utils/dom";
import { labelledBy, describedBy } from "./utils";
import proxies from "../cosmos.proxies";
import * as labels from "./labels";
import * as fixtures from "./fixtures";

describe("cards list", () => {
  it("opens list actions menu", async () => {
    const { container } = await render(fixtures.App.default, proxies);
    const getMenu = () =>
      container.querySelector(
        describedBy(labels.cardsListActionsMenuDescription.id)
      );
    expect(getMenu()).toBeNull();
    Simulate.click(
      container.querySelector(labelledBy(labels.cardsListActionsMenu.id))
    );
    expect(getMenu()).not.toBeNull();
  });

  it("adds a card", async () => {
    const { container } = await render(
      fixtures.CardsList.CardsList.default,
      proxies
    );
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
    const { container } = await render(fixtures.App.default, proxies);
    const card = container.querySelector("[data-cardid='1']");
    expect(container.querySelector(modalSelector)).toBeNull();
    Simulate.click(
      editButtonSelector ? card.querySelector(editButtonSelector) : card
    );
    expect(container.querySelector(modalSelector)).not.toBeNull();
    const cardDescription = node =>
      node.querySelector(labelledBy(labels.card.id)).textContent;
    expect(
      container.querySelector(modalSelector).querySelector(textSelector)
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
