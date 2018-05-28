import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    "& svg": {
      color: "rgb(153, 153, 153)",
      margin: "0px 5px",
      padding: 1
    }
  },
  typography: {
    display: "inline",
    verticalAlign: "super",
    fontWeight: 700
  }
};

const View = ({
  classes,
  className = "",
  textClassName = "",
  Icon,
  size = "normal",
  ...props
}) => {
  return (
    <div className={`${classes.root} ${className}`}>
      <Icon />
      <Typography
        className={`${classes.typography} ${textClassName}`}
        {...props}
      />
    </div>
  );
};

const IconAndText = withStyles(styles)(View);

IconAndText.propTypes = {
  Icon: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "normal", "big"]),
  textClassName: PropTypes.string
};

export default IconAndText;
