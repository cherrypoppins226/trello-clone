import { snapshotTest } from "../utils/puppeteer";
import { describedBy } from "../utils";
import { EditCard } from "../fixtures";
import { labels as editCardLabels } from "./EditCard";

snapshotTest(
  it,
  EditCard.EditCard.default,
  async (frame, snap) => {
    await snap(describedBy(editCardLabels.description.id));
  },
  8000
);
