import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
import * as labels from "./labels";

const styles = {
  root: {
    position: "fixed",
    outline: "none",
    pointerEvents: "none"
  },
  description: {
    "& textarea": {
      background: "white",
      pointerEvents: "all",
      padding: 4,
      paddingLeft: 8,
      minHeight: 100,
      minWidth: 200,
      border: 0,
      resize: "none",
      borderRadius: 2,
      "&:focus": {
        outlineWidth: 2,
        background: "white",
        boxShadow: "0px 0px 2px 0px"
      }
    },
    "& button": {
      pointerEvents: "all",
      color: grey[50],
      backgroundColor: green[500],
      textTransform: "none",
      fontWeight: 700,
      marginTop: 15,
      "&:hover": {
        backgroundColor: green[600]
      }
    }
  },
  sideButtons: {
    "& button": {
      pointerEvents: "all",
      background: "rgba(0, 0, 0, .6)",
      color: grey[50],
      fontWeight: 600,
      textTransform: "none",
      transition: "transform 85ms ease-in",
      "&:hover": {
        background: "rgba(0, 0, 0, .8)",
        transform: "translateX(5px)",
        transition: "transform 85ms ease-in"
      },
      "& svg": {
        padding: 1,
        marginRight: 5,
        width: "0.8em",
        height: "0.8em"
      }
    }
  }
};

class QuickEditCard extends React.Component {
  componentDidMount() {
    const textareaNode = findDOMNode(this).querySelector("textarea");
    if (this.props.anchorEl) {
      const coordinates = this.props.anchorEl.getBoundingClientRect();
      const modalNode = findDOMNode(this);
      modalNode.style.top = `${coordinates.top}px`;
      modalNode.style.left = `${coordinates.left}px`;
      textareaNode.style.width = `${coordinates.width}px`;
      textareaNode.style.height = `${coordinates.height + 50}px`;
    }
    textareaNode.select();
  }

  render() {
    const { classes, title, anchorEl, ...extra } = this.props;
    return (
      <Grid
        aria-describedby={labels.quickEditCardDescription.id}
        container
        wrap="nowrap"
        spacing={8}
        className={classes.root}
        {...extra}
      >
        <Grid item className={classes.description}>
          <Typography component={TextArea} value={title} />
          <Button variant="raised"> Save </Button>
        </Grid>
        <Grid item className={classes.sideButtons}>
          <Grid container spacing={8} wrap="nowrap" direction="column">
            {[
              [Label, "Edit Labels"],
              [Person, "Change Members"],
              [ArrowForward, "Move"],
              [LibraryBooks, "Copy"],
              [Timer, "Change Due Date"],
              [Archive, "Archive"]
            ].map(([Icon, text], idx) => (
              <Grid item style={{ paddingBottom: 1 }} key={idx}>
                <Button size="small" variant="flat">
                  <Icon />
                  {text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const View = withStyles(styles)(QuickEditCard);

View.propTypes = {
  title: PropTypes.string.isRequired,
  anchorEl: PropTypes.object
};

export default View;
