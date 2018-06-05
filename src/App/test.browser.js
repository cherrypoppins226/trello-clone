import { snapshotTest } from "./utils/puppeteer";
import { labelledBy, describedBy, role } from "./utils";
import * as labels from "./labels";
import * as fixtures from "./fixtures";

// See
// https://stackoverflow.com/questions/49979069/puppeteer-element-click-not-working-and-not-throwing-an-error
// for a possible reason why using frame.click() won't work in some situations
const evalClick = selector => `document.querySelector("${selector}").click()`;

// Since jsdom doesn't do layout, it's not possible to know if an element is
// visible on page using conventional tests. That's why we're testing that
// modals/popovers are actually shown when their triggers are clicked.
snapshotTest(
  it,
  fixtures.App.default,
  async (frame, snap) => {
    await frame.click(labelledBy(labels.editCard.id));
    await snap();
    await frame.evaluate(evalClick("#editCardBackdrop"));
    await frame.click(labelledBy(labels.quickEditCard.id));
    await snap();
    await frame.evaluate(evalClick("#quickEditCardBackdrop"));
    await frame.click(labelledBy(labels.cardsListActionsMenu.id));
    await frame.hover(role("menuitem"));
    await snap();
  },
  10000
);

snapshotTest(it, fixtures.CardsList.CardsList.default, async (frame, snap) => {
  await Promise.all([
    frame.focus(role("heading")),
    frame.hover(labelledBy(labels.cardsListActionsMenu.id))
  ]);
  await snap(
    `[data-listid="${fixtures.CardsList.CardsList.default.props.id}"]`
  );
});

snapshotTest(it, fixtures.CardsList.Card.default, async (frame, snap) => {
  await frame.hover(labelledBy(labels.editCard.id));
  await frame.hover(labelledBy(labels.quickEditCard.id));
  await snap(labelledBy(labels.editCard.id));
});

snapshotTest(
  it,
  fixtures.EditCard.EditCard.default,
  async (frame, snap) => {
    await snap(describedBy(labels.editCardDescription.id));
  },
  8000
);
