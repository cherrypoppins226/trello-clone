import React from "react";
import * as misc from "./misc";

it("moduleName", () => {
  expect(misc.moduleName(__filename)).toBe("utils/misc.test");
});

it("makeFixtures", () => {
  const component = "Component";
  const before = {
    first: { otherKey: "Extra" },
    second: { otherKey: "Extra" }
  };
  const after = {
    first: { component, name: "first", ...before.first },
    second: { component, name: "second", ...before.second }
  };
  expect(misc.makeFixtures(component, before)).toEqual(after);
});

it("labelId", () => {
  expect(misc.labelId("Foo/Bar/Test", "label")).toBe("foo-bar-test-label");
});

describe("handleGraphQLResponse", () => {
  it("loading", () => {
    const Component = jest.fn();
    const rendered = misc.handleGraphQLResponse(null)(Component)({
      data: { loading: true }
    });
    expect(rendered).toBe(null);
    expect(Component).not.toHaveBeenCalled();
  });

  it("loading with custom response key", () => {
    const Component = jest.fn();
    let rendered;
    expect(() => {
      rendered = misc.handleGraphQLResponse("key")(Component)({
        key: { loading: true }
      });
    }).not.toThrow();
    expect(rendered).toBe(null);
    expect(Component).not.toHaveBeenCalled();
  });

  it("error", () => {
    const Component = jest.fn();
    console.error = jest.fn();
    const rendered = misc.handleGraphQLResponse(null)(Component)({
      data: { error: "Error" }
    });
    expect(rendered).toBe(null);
    expect(console.error).toHaveBeenCalledWith("Error");
    expect(Component).not.toHaveBeenCalled();
  });

  it("renders wrapped component", () => {
    const Component = props => <div />;
    const props = { data: { loading: false }, extra: "extra" };
    const rendered = misc.handleGraphQLResponse(null)(Component)(props);
    expect(rendered).toEqual(<Component {...props} />);
  });
});
