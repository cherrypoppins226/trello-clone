/*
 * Generic utilities with no implicit assumptions about their environment
 */
import React from "react";
import path from "path";
import { npmRoot } from "paths.macro";
import { Provider } from "mobx-react";

export const testId = id => `[data-testid="${id}"]`;

export const role = role => `[role="${role}"]`;

export const labelledBy = id => `[aria-labelledby="${id}"]`;

export const describedBy = id => `[aria-describedby="${id}"]`;

export const moduleName = filename => {
  // Sadly, path.parse doesn't exist in path-browserify, and this code will be
  // run in the browser, so we have to:
  // 1. Use macros from "paths.macro" which will get substituted at compile time
  // 2. Do somehow lengthy path manipulation ourselves
  const p = path.relative(path.join(npmRoot, "src"), filename);
  return path.join(path.dirname(p), path.basename(p, path.extname(p)));
};

/* A HOC which handles error and loading status from a GraphQL resposne */
export const handleGraphQLResponse = responseKey => WrappedComponent => props => {
  const response = props[responseKey || "data"];
  if (response.loading) return null;
  if (response.error) {
    console.error(response.error);
    return null;
  }
  return <WrappedComponent {...props} />;
};

export const provideStore = (name, State) => WrappedComponent => props => {
  const providerProps = { [name]: new State() };
  return (
    <Provider {...providerProps}>
      <WrappedComponent {...props} />
    </Provider>
  );
};

export const makeFixtures = (namespace, component, namedFixtures) => {
  component.displayName = namespace;
  Object.keys(namedFixtures).forEach(name => {
    namedFixtures[name] = {
      name,
      component,
      ...namedFixtures[name]
    };
  });
  return namedFixtures;
};

export const labelId = (modulePath, id) =>
  `${modulePath.toLowerCase().replace(/\//g, "-")}-${id}`;

export const flatten = arr => {
  var array = [];
  while (arr.length) {
    var value = arr.shift();
    if (Array.isArray(value)) {
      arr = value.concat(arr);
    } else {
      array.push(value);
    }
  }
  return array;
};

export const omitKeys = (omit, obj) =>
  Object.entries(obj)
    .filter(([key]) => !omit.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
