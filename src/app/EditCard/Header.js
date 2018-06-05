import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Inbox from "@material-ui/icons/Inbox";
import Close from "@material-ui/icons/Close";
import TextArea from "react-textarea-autosize";
import Typography from "@material-ui/core/Typography";
import { fileAbsolute } from "paths.macro";

import { buttonIcon, headerTextarea } from "../styles";

const styles = {
  root: {
    padding: "20px 20px 30px 15px",
    display: "flex",
    alignItems: "flex-start",
    "& svg": { color: "rgb(153, 153, 153)" },
    "& h2": { width: "100%" },
    "& textarea": {
      ...headerTextarea,
      marginRight: 15
    }
  },
  close: {
    ...buttonIcon,
    margin: 0,
    "&:hover": {
      color: "black"
    }
  }
};

const Header = ({ classes, className = "", text }) => {
  return (
    <div className={`${classes.root} ${className}`}>
      <Inbox />
      <Typography
        role="heading"
        variant="title"
        component={TextArea}
        defaultValue={text}
        spellCheck={false}
      />
      <button className={classes.close}>
        <Close />
      </button>
    </div>
  );
};

const Component = withStyles(styles)(Header);

Component.displayName = require("../../utils").moduleName(fileAbsolute);

Component.propTypes = {
  text: PropTypes.string.isRequired
};

export default Component;
