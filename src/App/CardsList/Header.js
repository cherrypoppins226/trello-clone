import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "react-textarea-autosize";
import IconButton from "./IconButton";
import * as labels from "../labels";
import { headerTextarea } from "../styled";

const styles = {
  root: {
    display: "flex",
    flexShrink: 0,
    "& [role='heading']": Object.assign({}, headerTextarea, {
      margin: 3,
      marginRight: 8
    }),
    "& button": {
      alignSelf: "flex-start"
    }
  }
};

const Header = ({ classes, className, text, onEditList }) => {
  return (
    <div className={`${classes.root} ${className || ""}`}>
      <Typography
        role="heading"
        defaultValue={text}
        component={TextArea}
        spellCheck={false}
      />
      <IconButton
        Icon={MoreHoriz}
        onClick={e => onEditList(e.currentTarget)}
        aria-labelledby={labels.cardsListActionsMenu.id}
        aria-haspopup={true}
      />
    </div>
  );
};

const View = withStyles(styles)(Header);

Header.propTypes = {
  text: PropTypes.string.isRequired,
  onEditList: PropTypes.func.isRequired
};

export default View;
