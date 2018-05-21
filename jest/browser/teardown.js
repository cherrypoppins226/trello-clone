const rimraf = require("rimraf");
const { DIR } = require("./common");

module.exports = async function() {
  await global.__BROWSER__.close();
  rimraf.sync(DIR);
};
