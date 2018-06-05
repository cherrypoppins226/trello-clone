import { Simulate } from "react-testing-library";

import { App } from "./fixtures";
import { labelledBy, describedBy } from "./utils";
import { renderIntoDocument } from "./utils/dom";

const headerLabels = require("./app/cardsList/Header").labels;
const actionsMenuLabels = require("./app/cardsList/ActionsMenu").labels;

it("cards list actions menu opens", async () => {
  await renderIntoDocument(App.default);
  const getMenu = () =>
    document.querySelector(describedBy(actionsMenuLabels.menuDescription.id));
  expect(getMenu()).toBeNull();
  Simulate.click(
    document.querySelector(labelledBy(headerLabels.actionsMenuButton.id))
  );
  expect(getMenu()).not.toBeNull();
});

const cardLabels = require("./app/cardsList/Card").labels;
const editCardLabels = require("./app/EditCard").labels;
const quickEditCardLabels = require("./app/QuickEditCard").labels;

const testModal = async (editButtonSelector, modalSelector, textSelector) => {
  await renderIntoDocument(App.default);
  const card = document.querySelector("[data-cardid='1']");
  expect(document.querySelector(modalSelector)).toBeNull();
  Simulate.click(
    editButtonSelector ? card.querySelector(editButtonSelector) : card
  );
  expect(document.querySelector(modalSelector)).not.toBeNull();
  const cardDescription = node =>
    node.querySelector(labelledBy(cardLabels.card.id)).textContent;
  expect(
    document.querySelector(modalSelector).querySelector(textSelector)
      .textContent
  ).toBe(cardDescription(card));
};

it("edit card modal opens", async () => {
  await testModal(
    null,
    describedBy(editCardLabels.description.id),
    "[role='heading']"
  );
});

it("quick edit card modal opens", async () => {
  await testModal(
    labelledBy(cardLabels.quickEditCard.id),
    describedBy(quickEditCardLabels.description.id),
    "textarea"
  );
});
