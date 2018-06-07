export default [
  require("../App"),
  require("../app/EditCard"),
  require("../app/QuickEditCard"),
  require("../app/CardsList"),
  require("../app/cardsList/ActionsMenu"),
  require("../app/cardsList/Card"),
  require("../app/cardsList/Header")
].reduce(
  (fixtures, module) => fixtures.concat(Object.values(module.fixtures)),
  []
);
