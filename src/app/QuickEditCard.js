import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Timer from "@material-ui/icons/Timer";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import TextArea from "react-textarea-autosize";
import { fileAbsolute } from "paths.macro";

import mockData from "../apollo/mockData";
import { makeFixtures, renderLabels, labelId, moduleName } from "../utils";
import { button, textarea, smallIcon } from "./styles";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  description: {
    id: labelId(modulePath, "description"),
    text: "Quickly edit card: Change title, members, archive, and more"
  }
};

const styles = {
  root: {
    display: "flex",
    outline: "none",
    pointerEvents: "none"
  },
  description: {
    marginRight: 8,
    "& textarea": {
      ...textarea,
      pointerEvents: "all",
      padding: 4,
      paddingLeft: 8,
      minHeight: 100
    },
    "& button": {
      ...button,
      pointerEvents: "all",
      color: grey[50],
      backgroundColor: green[500],
      marginTop: 15,
      "&:hover": {
        backgroundColor: green[600]
      }
    }
  },
  sideButtons: {
    flexBasis: 160,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& button": {
      ...button,
      pointerEvents: "all",
      marginBottom: 4,
      background: "rgba(0, 0, 0, .6)",
      color: grey[50],
      transition: "transform 85ms ease-in",
      "&:hover": {
        background: "rgba(0, 0, 0, .8)",
        transform: "translateX(5px)",
        transition: "transform 85ms ease-in"
      },
      "& svg": smallIcon
    }
  }
};

const QuickEditCard = ({ classes, appState, ...rest }) => {
  const {
    top,
    left,
    bottom,
    right
  } = appState.cardBeingQuickEdited.anchorElementBox;
  return (
    <div
      aria-describedby={labels.description.id}
      className={classes.root}
      {...rest}
    >
      {renderLabels(labels)}
      <div className={classes.description}>
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Typography
          style={{
            height: `${bottom - top}px`,
            width: `${right - left}px`
          }}
          autoFocus
          component={TextArea}
          value={appState.cardBeingQuickEdited.title}
          onFocus={e => e.target.select()}
        />
        {/* eslint-enable jsx-a11y/no-autofocus */}
        <Button variant="raised"> Save </Button>
      </div>
      <div className={classes.sideButtons}>
        {[
          [Label, "Edit Labels"],
          [Person, "Change Members"],
          [ArrowForward, "Move"],
          [LibraryBooks, "Copy"],
          [Timer, "Change Due Date"],
          [Archive, "Archive"]
        ].map(([Icon, text], idx) => (
          <Button key={idx} size="small">
            <Icon />
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
};

const Component = withStyles(styles)(QuickEditCard);

Component.displayName = modulePath;

Component.propTypes = {
  appState: PropTypes.object.isRequired
};

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      appState: {
        cardBeingQuickEdited: {
          ...mockData.lists[0].cards[0],
          anchorElementBox: { top: 0, left: 0, bottom: 20, right: 200 }
        },
        finishQuickCardEdit: () => {}
      }
    }
  }
});

export default Component;
