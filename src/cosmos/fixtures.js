import { flatten } from "../utils";

export default flatten(
  [
    require("../app/Board"),
    require("../app/EditCard"),
    require("../app/QuickEditCard"),
    require("../app/CardsList"),
    require("../app/cardsList/ActionsMenu"),
    require("../app/cardsList/Card"),
    require("../app/cardsList/Header")
  ].map(module => Object.values(module.fixtures))
);
