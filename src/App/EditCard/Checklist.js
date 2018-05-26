import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import CheckBox from "@material-ui/icons/CheckBox";

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
    }
  },
  checklist: {
    display: "flex",
    alignItems: "center",
    marginLeft: 35
  },
  progress: {
    marginLeft: 10,
    width: "100%",
    background: "#D6DADC",
    height: 8,
    borderRadius: 4
  },
  addItem: {
    marginLeft: 55,
    marginTop: 10,
    textTransform: "none"
  }
};

const Checklist = ({ classes }) => (
  <div className={classes.root}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <CheckBox />
      <Typography variant="subheading">Checklist</Typography>
    </div>
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
  </div>
);

const View = withStyles(styles)(Checklist);

export default View;
