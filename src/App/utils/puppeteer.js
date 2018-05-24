/*
 * This module implicitly depends on:
 * - Jest globals
 * - Environment provided by custom Jest puppeteer configuration
 */

import querystring from "querystring";

const componentLoaded = () => {
  const iframe = document.querySelector("iframe");
  if (!iframe) return false;
  const root = iframe.contentDocument.querySelector("#root");
  if (!root) return false;
  return root.childElementCount;
};

const goToComponentUrl = async fixture => {
  const query = querystring.stringify({
    component: fixture.component.displayName,
    fixture: fixture.name,
    fullScreen: true
  });
  await global.__page.goto(`${global.__appUrl}?${query}`);
  await global.__page.waitForFunction(componentLoaded);
};

const snap = async () => {
  const img = await global.__page.screenshot();
  expect(img).toMatchImageSnapshot();
};

export const snapshotTest = (
  testFn,
  fixture,
  snapshotFn = (frame, snap) => snap()
) => {
  testFn(fixture.component.displayName, async () => {
    await goToComponentUrl(fixture);
    await snapshotFn(global.__page.mainFrame().childFrames()[0], snap);
  });
};
