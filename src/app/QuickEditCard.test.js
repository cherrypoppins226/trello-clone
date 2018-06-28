import { Simulate, render } from "react-testing-library";

import { fixtures } from "./QuickEditCard";
import mount from "../cosmos/mount";
import client from "../cosmos/apollo/client";
import { queries } from "../cosmos/apollo/schema";

it("saves card title", async () => {
  const { container, getByText } = await mount(render, fixtures.default);
  container.querySelector("textarea").value = "Title";
  Simulate.click(getByText("Save"));
  const result = await client.query({
    query: queries.card,
    variables: { id: fixtures.default.stores.appState.cardBeingQuickEdited.id }
  });
  expect(result.data.card.title).toBe("Title");
});
