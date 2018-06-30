import React from "react";
import { withStyles } from "@material-ui/core/styles";

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
const styles = {
  root: {
    position: "absolute",
    left: -10000,
    top: "auto",
    width: 1,
    height: 1,
    overflow: "hidden"
  }
};

const Labels = ({ classes }) => (
  <div className={classes.root}>
    {labels.map(({ id, text }) => (
      <div key={id} id={id}>
        {text}
      </div>
    ))}
  </div>
);

const Component = withStyles(styles)(Labels);

export default Component;
