const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const readline = require("readline");
const puppeteer = require("puppeteer");
const { TMPDIR } = require("./common");
const { exec } = require("child_process");

const startCosmos = new Promise((resolve, reject) => {
  if (process.env.CI !== "1" && process.env.CI !== "true") return resolve();

  const server = exec("yarn cosmos");
  const rl = readline.createInterface({ input: server.stdout });

  global.__SERVER__ = server;

  server.on("error", error => {
    global.__SERVER__ = undefined;
    rl.close();
    reject(error);
  });

  // Hacky? Yes. But we need to know when the application has been served.
  const done = /http:\/\/localhost:\d{4}/;

  rl.on("line", input => {
    console.log(input);
    if (!done.test(input)) return;
    rl.close();
    resolve();
  });
});

module.exports = () =>
  startCosmos
    .then(() => puppeteer.launch({}))
    .then(browser => {
      global.__BROWSER__ = browser;
      mkdirp.sync(TMPDIR);
      fs.writeFileSync(
        path.join(TMPDIR, "wsEndpoint"),
        global.__BROWSER__.wsEndpoint()
      );
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
