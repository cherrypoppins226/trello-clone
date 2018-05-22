const os = require("os");
const path = require("path");

module.exports = {
  TMPDIR: path.join(os.tmpdir(), "jest_puppeteer_global_setup")
};
