import { labelledBy, role } from "../utils";
import { snapshotTest } from "../utils/puppeteer";
import { fixtures } from "./Board";
import { labels as cardLabels } from "./cardsList/Card";
import { labels as headerLabels } from "./cardsList/Header";

const fireMouseEvent = async (frame, selector, eventName) => {
  const el = await frame.$(selector);
  return frame.evaluate(
    (el, eventName) => {
      const event = document.createEvent("MouseEvents");
      event.initEvent(eventName, true, true);
      el.dispatchEvent(event);
    },
    el,
    eventName
  );
};

// Since jsdom doesn't do layout, it's not possible to know if an element is
// visible on page using conventional tests. That's why we're testing that
// modals/popovers are actually shown when their triggers are clicked.
snapshotTest(
  it,
  fixtures.default,
  async (frame, snap) => {
    await frame.click(labelledBy(cardLabels.editCard.id));
    await snap();
    await fireMouseEvent(frame, "#editCardBackdrop", "click");

    await frame.click(labelledBy(cardLabels.quickEditCard.id));
    await snap();
    await fireMouseEvent(frame, "#quickEditCardBackdrop", "click");

    await frame.click(labelledBy(headerLabels.editList.id));
    await frame.hover(role("menuitem"));
    await snap();
    await fireMouseEvent(frame, "body", "mouseup");
  },
  10000
);
