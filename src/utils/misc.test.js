import React from "react";
import * as misc from "./misc";

it("moduleName", () => {
  expect(misc.moduleName("src/app/Foo/Bar.js")).toBe("Foo/Bar");
});

it("makeFixtures", () => {
  const namespace = "Module/Component";
  const component = () => <div />;
  expect(
    misc.makeFixtures(namespace, component, {
      first: { otherKey: "extra" },
      second: { otherKey: "extra" }
    })
  ).toEqual({
    first: { component, name: "first", otherKey: "extra" },
    second: { component, name: "second", otherKey: "extra" }
  });
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
