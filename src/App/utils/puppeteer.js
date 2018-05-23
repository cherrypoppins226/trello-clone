/*
 * This module implicitly depends on the environment set by our custom jest's
 * puppeteer configuration
 */

const componentLoaded = () => {
  const iframe = document.querySelector("iframe");
  if (!iframe) return false;
  const root = iframe.contentDocument.querySelector("#root");
  if (!root) return false;
  return root.childElementCount;
};

export const goToComponentUrl = async (component, fixture) => {
  const url = `${
    global.__appUrl
  }?component=${component}&fixture=${fixture}&fullScreen=true`;
  return global.__page
    .goto(url)
    .then(() => global.__page.waitForFunction(componentLoaded));
};
