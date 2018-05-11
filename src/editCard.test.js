import React from "react";
import { render } from "./testHelpers.js";
import EditCard from "./editCard";

it("initial render", () => {
  const { container } = render(
    <EditCard card={null} parent={{}} onClose={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});
