import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const styles = {
  root: {
    borderWidth: 0,
    background: "none",
    outline: "none",
    cursor: "pointer",
    borderRadius: 4,
    padding: 3,
    "&:hover": {
      background: "#D6D6D6"
    },
    "& svg": {
      padding: 3,
      width: "0.8em",
      height: "0.8em",
      color: grey[700]
    }
  }
};

const IconButton = ({ classes, className, Icon, onClick, ...attrs }) => {
  return (
    <button
      className={`${classes.root} ${className || ""}`}
      onClick={onClick}
      {...attrs}
    >
      <Icon />
    </button>
  );
};

const View = withStyles(styles)(IconButton);

IconButton.propTypes = {
  Icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default View;
