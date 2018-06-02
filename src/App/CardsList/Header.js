import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "react-textarea-autosize";
import { fileAbsolute } from "paths.macro";
import { inject } from "mobx-react";

import { moduleName } from "../utils";
import * as labels from "../labels";
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

const View = ({ classes, className = "", appState, listId, listTitle }) => {
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
          appState.startListEdit({
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

const Styled = withStyles(styles)(inject("appState")(View));

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired
};

export default Styled;
