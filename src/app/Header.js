import React from "react";
import { withStyles } from "@material-ui/core/styles";

import logo from "../logo.png";

const styles = {
  root: {
    display: "flex",
    padding: 4,
    height: 40,
    justifyContent: "space-around",
    background: "#026AA7",
    "& img": {
      opacity: 0.5,
      width: 80,
      height: 30
    }
  }
};

const Header = ({ classes }) => (
  <div className={classes.root}>
    <img src={logo} alt="logo" />
  </div>
);

const Component = withStyles(styles)(Header);

export default Component;
