import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import { textarea3 } from "../styled";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    "& svg": {
      color: "rgb(153, 153, 153)",
      margin: "0px 5px",
      padding: 1
    },
    "& h3": {
      fontWeight: 700,
      marginBottom: 10
    },
    "& textarea": textarea3
  },
  saveComment: {
    textTransform: "none",
    fontWeight: 700
  }
};

const Activity = ({ classes }) => (
  <div className={classes.root}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FormatListBulleted />
      <Typography variant="subheading">Activity</Typography>
    </div>
  </div>
);

const View = withStyles(styles)(Activity);

export default View;
