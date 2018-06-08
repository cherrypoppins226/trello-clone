import { Simulate, renderIntoDocument } from "react-testing-library";

import mount from "./cosmos/mount";
import { fixtures } from "./App";
import { labelledBy, describedBy, testId } from "./utils";
import { labels as editCardLabels } from "./app/EditCard";
import { labels as quickEditCardLabels } from "./app/QuickEditCard";
import { labels as cardLabels } from "./app/cardsList/Card";
import { labels as headerLabels } from "./app/cardsList/Header";
import { labels as actionsMenuLabels } from "./app/cardsList/ActionsMenu";

it("cards list actions menu opens", async () => {
  await mount(renderIntoDocument, fixtures.default);
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
  await mount(renderIntoDocument, fixtures.default);
  const card = document.querySelector("[data-cardid='1']");
  const getModal = () => document.querySelector(modalSelector);
  const getModalText = () => getModal().querySelector(modalTextSelector);
  expect(getModal()).toBeNull();
  Simulate.click(getClickable(card));
  expect(getModal()).not.toBeNull();
  expect(getModalText().textContent).toBe(
    card.querySelector(testId("card-title")).textContent
  );
};

it("edit card modal opens", async () => {
  await testModal({
    getClickable: card => card,
    modalSelector: describedBy(editCardLabels.description.id),
    modalTextSelector: "[role='heading']"
  });
});

it("quick edit card modal opens", async () => {
  await testModal({
    getClickable: card =>
      card.querySelector(labelledBy(cardLabels.quickEditCard.id)),
    modalSelector: describedBy(quickEditCardLabels.description.id),
    modalTextSelector: "textarea"
  });
});
