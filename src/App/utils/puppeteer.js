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

const snap = async (frame, config = {}) => {
  let what = global.__page;
  if (config.selector) {
    what = await frame.$(config.selector);
  }
  const img = await what.screenshot(config.screenshotOptions || {});
  expect(img).toMatchImageSnapshot(config.imageOptions || {});
};

export const snapshotTest = (
  testFn,
  fixture,
  snapshotFn = (frame, snap) => snap(),
  timeout = 5000
) => {
  testFn(
    fixture.component.displayName,
    async () => {
      await goToComponentUrl(fixture);
      const frame = global.__page.mainFrame().childFrames()[0];
      await snapshotFn(frame, snap.bind(null, frame));
    },
    timeout
  );
};
