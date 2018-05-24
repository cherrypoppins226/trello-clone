import { snapshotTest } from "./utils/puppeteer";
import * as labels from "./labels";
import * as fixtures from "./fixtures";

snapshotTest(it, fixtures.Board);

snapshotTest(it, fixtures.QuickEditCard);

describe("CardsList", () => {
  const fixture = fixtures.CardsList;

  snapshotTest(it, fixture.CardsList);

  snapshotTest(it, fixture.Header, async (frame, snap) => {
    await Promise.all([
      frame.focus("[role='heading']"),
      frame.hover(`[aria-labelledby="${labels.cardsListActionsMenu.id}"]`)
    ]);
    await snap();
  });

  snapshotTest(it, fixture.Card, async (frame, snap) => {
    await frame.hover(`[aria-labelledby="${labels.editCard.id}"]`);
    await frame.hover(`[aria-labelledby="${labels.quickEditCard.id}"]`);
    await snap();
  });

  snapshotTest(it, fixture.ActionsMenu, async (frame, snap) => {
    await frame.hover("[role='menuitem']");
    await snap();
  });
});

describe("EditCard", () => {
  const fixture = fixtures.EditCard;

  snapshotTest(it, fixture.EditCard);
});
