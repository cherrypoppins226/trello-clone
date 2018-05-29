import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "react-textarea-autosize";
import { connect } from "react-redux";

import * as labels from "../labels";
import * as actions from "../actions";
import { buttonIconSmall, headerTextarea } from "../styles";

const styles = {
  root: {
    display: "flex",
    flexShrink: 0,
    "& [role='heading']": {
      ...headerTextarea,
      margin: 3,
      marginRight: 8
    },
    "& button": {
      ...buttonIconSmall,
      alignSelf: "flex-start"
    }
  }
};

const Header = props => {
  return (
    <div className={`${props.classes.root} ${props.className || ""}`}>
      <Typography
        role="heading"
        defaultValue={props.listTitle}
        component={TextArea}
        spellCheck={false}
      />
      <button
        aria-haspopup={true}
        aria-labelledby={labels.cardsListActionsMenu.id}
        onClick={event => {
          const { top, left } = event.target.getBoundingClientRect();
          props.startEdit(props.listId, { top, left });
        }}
      >
        <MoreHoriz />
      </button>
    </div>
  );
};

Header.propTypes = {
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired,
  startEdit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startEdit: (...args) => dispatch(actions.startEditList(...args))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));
