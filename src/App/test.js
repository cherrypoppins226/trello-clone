import { getByText } from "dom-testing-library";
import { Simulate } from "react-testing-library";
import { render } from "./utils/dom";
import { labelledBy, describedBy, testId } from "./utils";
import * as labels from "./labels";
import * as fixtures from "./fixtures";

describe("cards list", () => {
  it("opens list actions menu", async () => {
    const { container } = await render(fixtures.Board.default);
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
  const testModal = async (getEditButton, getModal, textSelector) => {
    const { container } = await render(fixtures.Board.default);
    const card = container.querySelector(testId("CardsListCard"));
    expect(getModal(container)).toBeNull();
    Simulate.click(getEditButton(card));
    expect(getModal(container)).not.toBeNull();
    const { cardDescription } = require("./CardsList/Card");
    expect(getModal(container).querySelector(textSelector).textContent).toBe(
      cardDescription(card)
    );
  };

  it("opens quick edit card modal", async () => {
    await testModal(
      node => node.querySelector(labelledBy(labels.quickEditCard.id)),
      node =>
        node.querySelector(describedBy(labels.quickEditCardDescription.id)),
      "textarea"
    );
  });

  it("opens edit card modal", async () => {
    await testModal(
      node => node,
      node => node.querySelector(describedBy(labels.editCardDescription.id)),
      "[role='heading']"
    );
  });
});
