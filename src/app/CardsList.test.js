import { Simulate, render } from "react-testing-library";
import { getByText } from "dom-testing-library";

import { fixtures } from "./CardsList";
import mount from "../cosmos/mount";

it("adds a card", async () => {
  const { container } = await mount(render, fixtures.default);
  const liveList = container.querySelector("ul");
  const countBefore = liveList.childElementCount;
  const lastBefore = liveList.lastElementChild;
  Simulate.click(getByText(container, "Add a card..."));
  expect(liveList.childElementCount).toBe(countBefore + 1);
  expect(liveList.lastElementChild).not.toBe(lastBefore);
  expect(liveList.lastElementChild.tagName).toBe(lastBefore.tagName);
});
