it("home", async () => {
  const page = await global.__BROWSER__.newPage();
  // 30s timeout by default
  await page.goto(global.__APPURL__);
  const snap = await page.screenshot();
  expect(snap).toMatchImageSnapshot();
});
