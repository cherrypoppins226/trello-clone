import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "react-textarea-autosize";
import { fileAbsolute } from "paths.macro";
import { inject } from "mobx-react";

import appData from "../../mockData.js";
import AppState from "../../App.state";
import { makeFixtures, renderLabels, labelId, moduleName } from "../../utils";
import { buttonIconSmall, headerTextarea } from "../styles";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  editList: {
    id: labelId(modulePath, "edit-list"),
    text: "Edit List"
  }
};

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

const Header = ({ classes, className = "", appState, listId, listTitle }) => {
  return (
    <div className={`${classes.root} ${className}`}>
      {renderLabels(labels)}
      <Typography
        role="heading"
        defaultValue={listTitle}
        component={TextArea}
        spellCheck={false}
      />
      <button
        aria-haspopup={true}
        aria-labelledby={labels.editList.id}
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

const Component = withStyles(styles)(inject("appState")(Header));

Component.displayName = modulePath;

Component.propTypes = {
  listId: PropTypes.number.isRequired,
  listTitle: PropTypes.string.isRequired
};

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      listId: appData.lists[0].id,
      listTitle: appData.lists[0].title
    },
    stores: {
      appState: new AppState()
    }
  }
});

export default Component;
