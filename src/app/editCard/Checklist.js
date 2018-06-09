import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { fileAbsolute } from "paths.macro";

const styles = {
  checklist: {
    display: "flex",
    alignItems: "center"
  },
  progress: {
    marginLeft: 10,
    width: "100%",
    background: "#D6DADC",
    height: 8,
    borderRadius: 4
  },
  addItem: {
    marginTop: 10,
    textTransform: "none"
  }
};

const Checklist = ({ classes }) => (
  <React.Fragment>
    <div className={classes.checklist}>
      <Typography variant="caption">0%</Typography>
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={0}
      />
    </div>
    <Typography
      component={Button}
      className={classes.addItem}
      size="small"
      align="left"
    >
      Add an item...
    </Typography>
  </React.Fragment>
);

const Component = withStyles(styles)(Checklist);

Component.displayName = require("../../utils").moduleName(fileAbsolute);

export default Component;
