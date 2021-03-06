import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { fileAbsolute } from "paths.macro";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 7,
    minHeight: 50,
    border: "2px dashed #C4C9CC"
  }
};

const Attachments = ({ classes }) => (
  <Typography className={classes.root} align="center">
    Drag and drop or choose your files
  </Typography>
);

const Component = withStyles(styles)(Attachments);

Component.displayName = require("../../utils").moduleName(fileAbsolute);

export default Component;
