const rimraf = require("rimraf");
const { TMPDIR } = require("./common");

module.exports = async function() {
  global.__SERVER_PROCESS__ && global.__SERVER_PROCESS__.kill();
  await global.__BROWSER__.close();
  rimraf.sync(TMPDIR);
};
