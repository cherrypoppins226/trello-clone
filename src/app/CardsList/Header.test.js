import { Simulate, render } from "react-testing-library";

import { fixtures } from "./Header";
import mount from "../../cosmos/mount";

it("saves list title", async () => {
  const { container } = await mount(render, fixtures.default);
  const area = container.querySelector("textarea");
  area.value = "Title";
  Simulate.change(area);
  expect(area.value).toBe("Title");
});
