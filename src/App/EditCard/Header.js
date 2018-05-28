import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Inbox from "@material-ui/icons/Inbox";
import TextArea from "react-textarea-autosize";
import IconAndText from "./IconAndText";
import { headerTextarea } from "../styled";

const styles = {
  iconAndText: {
    width: "100%"
  },
  textarea: headerTextarea,
  close: {
    position: "absolute",
    top: 15,
    right: 15,
    color: "rgb(153, 153, 153)",
    cursor: "pointer",
    "&:hover": {
      color: "black"
    }
  }
};

const Header = ({ classes, className = "", text }) => {
  return (
    <div className={className}>
      <IconAndText
        role="heading"
        className={classes.iconAndText}
        Icon={Inbox}
        variant="title"
        component={TextArea}
        textClassName={classes.textarea}
        defaultValue={text}
        spellCheck={false}
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
