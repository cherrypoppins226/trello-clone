import { Simulate } from "react-testing-library";

import { fixtures } from "./App";
import { labelledBy, describedBy } from "./utils";
import { renderIntoDocument } from "./utils/cosmos";
import { labels as cardLabels } from "./app/cardsList/Card";

it("cards list actions menu opens", async () => {
  const headerLabels = require("./app/cardsList/Header").labels;
  const actionsMenuLabels = require("./app/cardsList/ActionsMenu").labels;
  await renderIntoDocument(fixtures.default);
  const getMenu = () =>
    document.querySelector(describedBy(actionsMenuLabels.description.id));
  expect(getMenu()).toBeNull();
  Simulate.click(document.querySelector(labelledBy(headerLabels.editList.id)));
  expect(getMenu()).not.toBeNull();
});

const testModal = async ({
  getClickable,
  modalSelector,
  modalTextSelector
}) => {
  await renderIntoDocument(fixtures.default);
  const card = document.querySelector("[data-cardid='1']");
  const getModal = () => document.querySelector(modalSelector);
  const getModalText = () => getModal().querySelector(modalTextSelector);
  expect(getModal()).toBeNull();
  Simulate.click(getClickable(card));
  expect(getModal()).not.toBeNull();
  expect(getModalText().textContent).toBe(card.textContent);
};

it("edit card modal opens", async () => {
  const editCardLabels = require("./app/EditCard").labels;
  await testModal({
    getClickable: card => card,
    modalSelector: describedBy(editCardLabels.description.id),
    modalTextSelector: "[role='heading']"
  });
});

it("quick edit card modal opens", async () => {
  const quickEditCardLabels = require("./app/QuickEditCard").labels;
  await testModal({
    getClickable: card =>
      card.querySelector(labelledBy(cardLabels.quickEditCard.id)),
    modalSelector: describedBy(quickEditCardLabels.description.id),
    modalTextSelector: "textarea"
  });
});
