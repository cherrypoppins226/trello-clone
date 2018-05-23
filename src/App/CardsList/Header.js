import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import grey from "@material-ui/core/colors/grey";
import * as Labels from "../labels";
import TextArea from "../TextArea";

const styles = {
  root: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    margin: 5,
    "& [role='heading']": {
      flexBasis: "100%",
      fontWeight: 700,
      marginRight: 8
    },
    "& button": {
      alignSelf: "flex-start",
      // Reusable styles
      borderWidth: 0,
      background: "none",
      outline: "none",
      cursor: "pointer",
      borderRadius: 4,
      padding: 3,
      "&:hover": {
        background: "#D6D6D6"
      }
    },
    "& svg": {
      // Reusable styles
      padding: 3,
      width: "0.8em",
      height: "0.8em",
      color: grey[700]
    }
  }
};

const Header = ({ classes, text, onEditList }) => {
  return (
    <div className={classes.root}>
      <Typography
        role="heading"
        value={text}
        component={TextArea}
        spellCheck={false}
      />
      <button
        onClick={e => onEditList(e.currentTarget)}
        aria-labelledby={Labels.cardsListActionsMenu.id}
        aria-haspopup={true}
      >
        <MoreHoriz />
      </button>
    </div>
  );
};

const View = withStyles(styles)(Header);

Header.propTypes = {
  text: PropTypes.string.isRequired,
  onEditList: PropTypes.func.isRequired
};

export default View;
