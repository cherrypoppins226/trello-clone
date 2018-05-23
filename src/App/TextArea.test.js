import React from "react";
import { render } from "react-testing-library";
import TextArea from "./Textarea";

it("initial render", () => {
  const value = "value";
  const { container } = render(<TextArea value={value} />);
  expect(container.firstChild.value).toBe(value);
});
