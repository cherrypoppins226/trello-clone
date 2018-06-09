import { snapshotTest } from "../../utils/puppeteer";
import { labelledBy } from "../../utils";
import { fixtures } from "./Card";
import { labels as cardLabels } from "./Card";

snapshotTest(it, fixtures.default, async (frame, snap) => {
  await frame.hover(labelledBy(cardLabels.editCard.id));
  await frame.hover(labelledBy(cardLabels.quickEditCard.id));
  await snap(labelledBy(cardLabels.editCard.id));
});
