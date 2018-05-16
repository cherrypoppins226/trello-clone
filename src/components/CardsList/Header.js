import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import grey from "material-ui/colors/grey";
import * as Labels from "../labels";
import EditableText from "../EditableText";
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
      paddingBottom: 0,
      paddingTop: 3,
      paddingLeft: 5,
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
      <EditableText role="heading" value={text} component={TextArea} />
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
