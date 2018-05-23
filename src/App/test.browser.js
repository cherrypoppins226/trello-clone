import { goToComponentUrl } from "./utils/puppeteer";

it("app", async () => {
  await goToComponentUrl("Board", "Default");
  const snap = await global.__page.screenshot();
  expect(snap).toMatchImageSnapshot();
});
