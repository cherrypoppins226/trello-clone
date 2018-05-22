const rimraf = require("rimraf");
const { TMPDIR } = require("./common");

module.exports = async function() {
  global.__SERVER__ && global.__SERVER__.kill();
  await global.__BROWSER__.close();
  rimraf.sync(TMPDIR);
};
