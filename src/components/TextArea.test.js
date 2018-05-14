import React from "react";
import { fireEvent } from "react-testing-library";
import { render, renderIntoDocument } from "../testHelpers.js";
import TextArea from "./Textarea";

it("initial render", () => {
  const { container } = render(<TextArea onClose={jest.fn()} />);
  expect(container).toMatchSnapshot();
});

it("calls onClose when clicked outside", () => {
  const onClose = jest.fn();
  renderIntoDocument(<TextArea onClose={onClose} />);
  const click = new MouseEvent("click", {
    bubbles: true,
    cancelable: true
  });
  fireEvent(document.body, click);
  expect(onClose).toHaveBeenCalledWith(click);
});

it("renders with given value and rows", () => {
  const rows = 5;
  const value = "value";
  const { container } = render(
    <TextArea rows={rows} value={value} onClose={() => {}} />
  );
  const textarea = container.querySelector("textarea");
  expect(textarea.value).toBe(value);
  expect(textarea.rows).toBe(rows);
});
