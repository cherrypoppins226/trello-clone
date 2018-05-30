import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "react-textarea-autosize";
import { connect } from "react-redux";
import { fileAbsolute } from "paths.macro";

import { moduleName } from "../utils";
import * as labels from "../labels";
import * as actionCreators from "../actionCreators";
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

const View = props => {
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
        onClick={e => {
          const box = e.currentTarget.getBoundingClientRect();
          const { top, left, bottom, right } = box;
          props.startEdit(props.listId, { top, left, bottom, right });
        }}
      >
        <MoreHoriz />
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startEdit: (...args) => dispatch(actionCreators.startEditList(...args))
});

const Container = connect(null, mapDispatchToProps)(withStyles(styles)(View));

Container.displayName = moduleName(fileAbsolute);

Container.propTypes = {
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired
};

export default Container;
