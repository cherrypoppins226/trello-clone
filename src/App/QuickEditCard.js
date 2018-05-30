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

import { moduleName } from "./utils";
import * as labels from "./labels";
import { button, textarea, smallIcon } from "./styles";

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

const View = ({ classes, actions, cardBeingQuickEdited, ...rest }) => {
  const { top, left, bottom, right } = cardBeingQuickEdited.anchorElementBox;
  return (
    <div
      aria-describedby={labels.quickEditCardDescription.id}
      className={classes.root}
      {...rest}
    >
      <div className={classes.description}>
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Typography
          style={{
            height: `${bottom - top}px`,
            width: `${right - left}px`
          }}
          autoFocus
          component={TextArea}
          value={cardBeingQuickEdited.title}
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

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  cardBeingQuickEdited: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    anchorElementBox: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired
    }).isRequired
  })
};

export default Styled;
