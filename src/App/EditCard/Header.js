import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Inbox from "@material-ui/icons/Inbox";
import Close from "@material-ui/icons/Close";
import TextArea from "react-textarea-autosize";

const styles = {
  root: {
    display: "flex",
    "& [role='heading']": {
      fontWeight: 700,
      width: "100%"
    },
    "& textarea": {
      border: 0,
      resize: "none",
      borderRadius: 2,
      background: "transparent",
      padding: 0,
      "&:focus": {
        outlineWidth: 2,
        background: "white",
        boxShadow: "0px 0px 2px 0px"
      }
    }
  },
  inbox: {
    color: "rgb(153, 153, 153)",
    margin: "0px 5px",
    padding: 2
  },
  close: {
    color: "rgb(153, 153, 153)",
    margin: "0px 8px",
    cursor: "pointer",
    "&:hover": {
      color: "black"
    }
  }
};

const Header = ({ classes, text, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div className={`${classes.root} ${className}`}>
      <Inbox className={classes.inbox} />
      <Typography
        role="heading"
        defaultValue={text}
        component={TextArea}
        spellCheck={false}
        variant="title"
        {...rest}
      />
      <Close className={classes.close} />
    </div>
  );
};

const View = withStyles(styles)(Header);

View.propTypes = {
  text: PropTypes.string.isRequired
};

export default View;
