import React from "react";
import { render } from "react-testing-library";
import TextArea from "./Textarea";

it("initial render", () => {
  const rows = 5;
  const value = "value";
  const { container } = render(<TextArea rows={rows} value={value} />);
  expect(container.firstChild.rows).toBe(rows);
  expect(container.firstChild.value).toBe(value);
});
