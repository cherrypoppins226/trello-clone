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
import { mapDispatchToProps } from "../redux";
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

const View = ({ classes, className = "", actions, listId, listTitle }) => {
  return (
    <div className={`${classes.root} ${className}`}>
      <Typography
        role="heading"
        defaultValue={listTitle}
        component={TextArea}
        spellCheck={false}
      />
      <button
        aria-haspopup={true}
        aria-labelledby={labels.cardsListActionsMenu.id}
        onClick={e => {
          const box = e.currentTarget.getBoundingClientRect();
          const { top, left, bottom, right } = box;
          actions.cardsList.startEdit({
            id: listId,
            anchorElementBox: { top, left, bottom, right }
          });
        }}
      >
        <MoreHoriz />
      </button>
    </div>
  );
};

const Container = connect(null, mapDispatchToProps)(withStyles(styles)(View));

Container.displayName = moduleName(fileAbsolute);

Container.propTypes = {
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired
};

export default Container;
