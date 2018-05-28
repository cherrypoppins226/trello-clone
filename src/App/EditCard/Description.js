import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextArea from "react-textarea-autosize";

const styles = {
  root: {
    minHeight: 60,
    width: "100%",
    resize: "none",
    borderRadius: 2,
    padding: 7,
    cursor: "pointer",
    background: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, .15)",
    border: "1px solid #cdd2d4",
    boxShadow: "inset 0 1px 6px rgba(0,0,0,.1)",
    "&:focus": {
      cursor: "auto",
      background: "rgba(0, 0, 0, 0.03)",
      borderColor: "rgba(0, 0, 0, .15)",
      border: "1px solid #cdd2d4",
      boxShadow: "inset 0 1px 6px rgba(0,0,0,.1)",
      outline: "none"
    }
  }
};

const Description = ({ classes }) => (
  <Typography
    className={classes.root}
    component={TextArea}
    placeholder="Add a more detailed description..."
  />
);

const View = withStyles(styles)(Description);

export default View;
