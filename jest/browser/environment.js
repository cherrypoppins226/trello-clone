const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const NodeEnvironment = require("jest-environment-node");
const { TMPDIR } = require("./common");

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(TMPDIR, "wsEndpoint"), "utf8");
    if (!wsEndpoint) {
      throw new Error("wsEndpoint not found");
    }
    this.global.__browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint
    });
    this.global.__page = await this.global.__browser.newPage();
    // See https://github.com/GoogleChrome/puppeteer/issues/453 and
    // https://github.com/GoogleChrome/puppeteer/issues/511
    await this.global.__page._client.send("Animation.setPlaybackRate", {
      playbackRate: 12
    });
    // Waiting for the initial load is a one-time, upfront cost and async tests
    // have a time limit. By doing this here we prevent timing out on the tests.
    await this.global.__page.goto(this.global.__appUrl);
    await this.global.__page.waitFor("iframe");
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
