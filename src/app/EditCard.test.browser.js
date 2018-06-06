import { snapshotTest } from "../utils/puppeteer";
import { describedBy } from "../utils";
import { fixtures } from "./EditCard";
import { labels as editCardLabels } from "./EditCard";

snapshotTest(
  it,
  fixtures.default,
  async (frame, snap) => {
    await snap(describedBy(editCardLabels.description.id));
  },
  8000
);
