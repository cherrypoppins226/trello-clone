import { snapshotTest } from "../utils/puppeteer";
import { labelledBy, role } from "../utils";
import { fixtures } from "./CardsList";
import { labels as headerLabels } from "./cardsList/Header";

snapshotTest(it, fixtures.default, async (frame, snap) => {
  await Promise.all([
    frame.focus(role("heading")),
    frame.hover(labelledBy(headerLabels.editList.id))
  ]);
  await snap(`[data-listid="${fixtures.default.props.id}"]`);
});
