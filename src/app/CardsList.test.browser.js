import { snapshotTest } from "../utils/puppeteer";
import { labelledBy, role } from "../utils";
import { fixtures } from "./CardsList";
import { labels as headerLabels } from "./cardsList/Header";

snapshotTest(it, fixtures.default, async (frame, snap) => {
  await Promise.all([
    frame.focus(role("heading")),
    frame.hover(labelledBy(headerLabels.editList.id))
  ]);
  const listSelector = `[data-listid="${fixtures.default.props.id}"]`;
  await snap(listSelector);
  const button = await frame.$(`${listSelector} [data-testid="add-card"]`);
  button.click();
  await snap(listSelector);
});
