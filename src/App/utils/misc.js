/*
 * Generic utilities with no implicit assumptions about their environment
 */
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
