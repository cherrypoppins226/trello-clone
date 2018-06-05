/*
 * Generic utilities with no implicit assumptions about their environment
 */
import React from "react";
import path from "path";
import { npmRoot } from "paths.macro";

export const testId = id => `[data-testid="${id}"]`;

export const role = role => `[role="${role}"]`;

export const labelledBy = id => `[aria-labelledby="${id}"]`;

export const describedBy = id => `[aria-describedby="${id}"]`;

export const moduleName = filename => {
  // Sadly, path.parse doesn't exist in path-browserify, and this code will be
  // run in the browser, so we have to:
  // 1. Use macros from "paths.macro" which will get substituted at compile time
  // 2. Do somehow lengthy path manipulation ourselves
  const p = path.relative(path.join(npmRoot, "src", "App"), filename);
  return path.join(path.dirname(p), path.basename(p, path.extname(p)));
};

export const isObjectEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
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
