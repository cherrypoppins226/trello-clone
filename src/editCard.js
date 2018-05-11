import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Modal from "material-ui/Modal";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import green from "material-ui/colors/green";
import grey from "material-ui/colors/grey";
import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Timer from "@material-ui/icons/Timer";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import { cardDescription } from "./cardsListCard";

const styles = {
  grid: {
    outline: "none",
    pointerEvents: "none"
  },
  textarea: {
    pointerEvents: "all",
    border: 0,
    outline: "none",
    resize: "none",
    borderRadius: 2,
    padding: 4,
    paddingLeft: 8
  },
  save: {
    pointerEvents: "all",
    color: grey[50],
    backgroundColor: green[500],
    textTransform: "none",
    fontWeight: 700,
    marginTop: 15,
    "&:hover": {
      backgroundColor: green[600]
    }
  },
  sideButton: {
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
    }
  },
  sideButtonIcon: {
    padding: 1,
    marginRight: 5,
    width: "0.8em",
    height: "0.8em"
  }
};

export const EDIT_CARD_DESCRIPTION = "edit-card-description";

const onModalRendered = (board, card) => {
  // Only when we actually render in the DOM can we know the modal's
  // dimensions.
  const modal = findDOMNode(board).querySelector(
    `[aria-describedby="${EDIT_CARD_DESCRIPTION}"]`
  );
  const cardCoordinates = findDOMNode(card).getBoundingClientRect();
  modal.style.top = `${cardCoordinates.top}px`;
  modal.style.left = `${cardCoordinates.left}px`;
  const textarea = modal.querySelector("textarea");
  textarea.style.width = `${cardCoordinates.width}px`;
  textarea.style.height = `${cardCoordinates.height + 50}px`;
  textarea.select();
};

const View = ({ root, card, onClose, classes }) => {
  return (
    <>
      <div id={EDIT_CARD_DESCRIPTION} style={{ display: "none" }}>
        Edit card: change title, members, archive etc.
      </div>
      <Modal
        aria-describedby={EDIT_CARD_DESCRIPTION}
        open={card !== null ? true : false}
        container={card}
        onClose={onClose}
        onRendered={_ => onModalRendered(root, card)}
      >
        <Grid container wrap="nowrap" spacing={8} className={classes.grid}>
          <Grid item>
            <Typography
              className={classes.textarea}
              component="textarea"
              spellCheck={false}
              defaultValue={card ? cardDescription(card) : ""}
            />
            <Button variant="raised" className={classes.save}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={8} wrap="nowrap" direction="column">
              {[
                [Label, "Edit Labels"],
                [Person, "Change Members"],
                [ArrowForward, "Move"],
                [LibraryBooks, "Copy"],
                [Timer, "Change Due Date"],
                [Archive, "Archive"]
              ].map(([Icon, name]) => {
                return (
                  <Grid item style={{ paddingBottom: 1 }} key={name}>
                    <Button
                      size="small"
                      variant="flat"
                      className={classes.sideButton}
                    >
                      <Icon className={classes.sideButtonIcon} />
                      {name}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  root: PropTypes.object.isRequired,
  card: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

const EditCard = withStyles(styles)(View);

export default EditCard;
