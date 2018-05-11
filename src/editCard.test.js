import React from "react";
import { render } from "./testHelpers.js";
import EditCard from "./editCard";

it("initial render", () => {
  const { container } = render(
    <EditCard root={{}} card={null} onClose={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});
