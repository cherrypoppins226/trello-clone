const appPath = (component, fixture) =>
  `${
    global.__appUrl
  }?component=${component}&fixture=${fixture}&fullScreen=true`;

const componentLoaded = () => {
  const iframe = document.querySelector("iframe");
  if (!iframe) return false;
  const root = iframe.contentDocument.querySelector("#root");
  if (!root) return false;
  return root.childElementCount;
};

it("app", async () => {
  await global.__page.goto(appPath("App", "App"));
  await global.__page.waitForFunction(componentLoaded);
  const snap = await global.__page.screenshot();
  expect(snap).toMatchImageSnapshot();
});
