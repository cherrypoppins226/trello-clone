import { snapshotTest } from "./utils/puppeteer";
import { labelledBy, role } from "./utils";
import { App } from "./fixtures";
import { labels as cardLabels } from "./app/cardsList/Card";
import { labels as headerLabels } from "./app/cardsList/Header";

// See
// https://stackoverflow.com/questions/49979069/puppeteer-element-click-not-working-and-not-throwing-an-error
// for a possible reason why using frame.click() won't work in some situations
const evalClick = selector => `document.querySelector("${selector}").click()`;

// Since jsdom doesn't do layout, it's not possible to know if an element is
// visible on page using conventional tests. That's why we're testing that
// modals/popovers are actually shown when their triggers are clicked.
snapshotTest(
  it,
  App.default,
  async (frame, snap) => {
    await frame.click(labelledBy(cardLabels.editCard.id));
    await snap();
    await frame.evaluate(evalClick("#editCardBackdrop"));
    await frame.click(labelledBy(cardLabels.quickEditCard.id));
    await snap();
    await frame.evaluate(evalClick("#quickEditCardBackdrop"));
    await frame.click(labelledBy(headerLabels.editList.id));
    await frame.hover(role("menuitem"));
    await snap();
  },
  10000
);
