import { Simulate } from "react-testing-library";
import { getByText } from "dom-testing-library";

import { CardsList } from "../fixtures";
import { render } from "../utils/dom";

it("adds a card", async () => {
  const { container } = await render(CardsList.CardsList.default);
  const liveList = container.querySelector("ul");
  const countBefore = liveList.childElementCount;
  const lastBefore = liveList.lastElementChild;
  Simulate.click(getByText(container, "Add a card..."));
  expect(liveList.childElementCount).toBe(countBefore + 1);
  expect(liveList.lastElementChild).not.toBe(lastBefore);
  expect(liveList.lastElementChild.tagName).toBe(lastBefore.tagName);
});
