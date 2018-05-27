import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Inbox from "@material-ui/icons/Inbox";
import Close from "@material-ui/icons/Close";
import TextArea from "react-textarea-autosize";
import { textarea6 } from "../styled";

const styles = {
  root: {
    display: "flex",
    "& [role='heading']": {
      fontWeight: 700,
      width: "100%"
    },
    "& textarea": textarea6
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
