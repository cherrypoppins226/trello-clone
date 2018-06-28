import React from "react";

import { flatten } from "../utils";

const labels = flatten(
  [
    require("./EditCard").labels,
    require("./QuickEditCard").labels,
    require("./cardsList/ActionsMenu").labels,
    require("./cardsList/Card").labels,
    require("./cardsList/Header").labels,
    require("./cardsList/NewCard").labels
  ].map(labels => Object.values(labels))
);

// https://webaim.org/techniques/css/invisiblecontent/
const Labels = () => (
  <div
    style={{
      position: "absolute",
      left: -10000,
      top: "auto",
      width: 1,
      height: 1,
      overflow: "hidden"
    }}
  >
    {labels.map(({ id, text }) => (
      <div key={id} id={id}>
        {text}
      </div>
    ))}
  </div>
);

export default Labels;
