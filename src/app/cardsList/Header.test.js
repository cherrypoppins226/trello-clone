import { Simulate, render } from "react-testing-library";

import { fixtures } from "./Header";
import mount from "../../cosmos/mount";
import client from "../../cosmos/apollo/client";
import { queries } from "../../cosmos/apollo/schema";

it("saves list title", async () => {
  const { container } = await mount(render, fixtures.default);
  const textarea = container.querySelector("textarea");
  textarea.value = "Title";
  Simulate.blur(textarea);
  const result = await client.query({
    query: queries.list,
    variables: { id: fixtures.default.props.listId }
  });
  expect(result.data.list.title).toBe("Title");
});
