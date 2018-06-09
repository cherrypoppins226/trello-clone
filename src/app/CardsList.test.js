import { Simulate, render } from "react-testing-library";

import { labelledBy, testId } from "../utils";
import { fixtures } from "./CardsList";
import { labels as newCardLabels } from "./cardsList/NewCard";
import mount from "../cosmos/mount";

it("new card dialog closes on clicking close", async () => {
  const { container, getByText } = await mount(render, fixtures.default);
  const newCard = () => Boolean(container.querySelector(testId("new-card")));
  expect(newCard()).toBe(false);
  Simulate.click(getByText("Add a card..."));
  expect(newCard()).toBe(true);
  Simulate.click(container.querySelector(labelledBy(newCardLabels.close.id)));
  expect(newCard()).toBe(false);
});
