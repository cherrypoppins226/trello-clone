import React from "react";
import { Simulate, fireEvent } from "react-testing-library";
import { render, NativeEvents } from "../testHelpers.js";
import EditableText from "./EditableText";

it("switches text for other element", () => {
  const { container } = render(<EditableText value="Title" />);
  const originalElem = container.firstElementChild;

  // Clicking in the title should bring up another component
  Simulate.click(container.firstElementChild);
  expect(container.firstElementChild.tagName).not.toEqual(originalElem);

  // Clicking inside the textarea shouldn't close it
  fireEvent(container.firstElementChild, NativeEvents.mouse.click);
  expect(container.firstElementChild).not.toEqual(originalElem);

  // Clicking outside should close it
  fireEvent(container, NativeEvents.mouse.click);
  expect(container.firstElementChild).toEqual(originalElem);
});

it("uses given component or falls back to textarea", () => {
  const { container, rerender } = render(<EditableText value="Title" />);
  Simulate.click(container.firstElementChild);
  expect(container.firstElementChild.tagName).toBe("TEXTAREA");

  rerender(<EditableText value="Title" component="div" />);
  Simulate.click(container.firstElementChild);
  expect(container.firstElementChild.tagName).toBe("DIV");
});
