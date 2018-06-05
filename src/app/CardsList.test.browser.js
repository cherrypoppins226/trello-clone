import { snapshotTest } from "../utils/puppeteer";
import { labelledBy, role } from "../utils";
import { CardsList } from "../fixtures";
import { labels as headerLabels } from "./cardsList/Header";

snapshotTest(it, CardsList.CardsList.default, async (frame, snap) => {
  await Promise.all([
    frame.focus(role("heading")),
    frame.hover(labelledBy(headerLabels.editList.id))
  ]);
  await snap(`[data-listid="${CardsList.CardsList.default.props.id}"]`);
});
