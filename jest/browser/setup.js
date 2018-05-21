const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const puppeteer = require("puppeteer");
const { DIR } = require("./common");

module.exports = async function() {
  global.__BROWSER__ = await puppeteer.launch({});
  mkdirp.sync(DIR);
  fs.writeFileSync(
    path.join(DIR, "wsEndpoint"),
    global.__BROWSER__.wsEndpoint()
  );
};
