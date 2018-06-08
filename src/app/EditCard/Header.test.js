import { Simulate, render } from "react-testing-library";

import { fixtures } from "./Header";
import mount from "../../cosmos/mount";
import client from "../../cosmos/apollo/client";
import { queries } from "../../cosmos/apollo/schema";

it("saves card title", async () => {
  const { container } = await mount(render, fixtures.default);
  const textarea = container.querySelector("textarea");
  textarea.value = "Title";
  Simulate.blur(textarea);
  const result = await client.query({
    query: queries.card,
    variables: { id: fixtures.default.props.cardId }
  });
  expect(result.data.card.title).toBe("Title");
});
