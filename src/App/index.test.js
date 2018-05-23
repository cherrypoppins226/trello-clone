import { getByText, getByTestId } from "dom-testing-library";
import { Simulate } from "react-testing-library";
import {
  render,
  getByAriaLabelled,
  getByAriaDescribed
} from "../testHelpers.js";
import * as labels from "./labels";
import * as fixtures from "./fixtures";

describe("cards list", () => {
  it("opens list actions menu", async () => {
    const { container } = await render(fixtures.board);
    const getMenu = () =>
      getByAriaDescribed(container, labels.cardsListActionsMenuDescription.id);
    expect(getMenu()).toBeNull();
    Simulate.click(
      getByAriaLabelled(container, labels.cardsListActionsMenu.id)
    );
    expect(getMenu()).not.toBeNull();
  });

  it("adds a card", async () => {
    const { container } = await render(fixtures.cardsList);
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
    const { container } = await render(fixtures.board);
    const card = getByTestId(container, "CardsListCard");
    expect(getModal(container)).toBeNull();
    Simulate.click(getEditButton(card));
    expect(getModal(container)).not.toBeNull();
    const { cardDescription } = require("./CardsList/Card");
    expect(getModal(container).querySelector(textSelector).textContent).toBe(
      cardDescription(card)
    );
  };

  it("opens quick edit card modal", () => {
    testModal(
      node => getByAriaLabelled(node, labels.quickEditCard.id),
      node => getByAriaDescribed(node, labels.quickEditCardDescription.id),
      "textarea"
    );
  });

  it("opens edit card modal", () => {
    testModal(
      node => node,
      node => getByAriaDescribed(node, labels.editCardDescription.id),
      "[role='heading']"
    );
  });
});
