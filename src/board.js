import React from "react";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import green from "material-ui/colors/green";
import grey from "material-ui/colors/grey";
import CardsList from "./cardsList";
import { cardDescription } from "./cardsListCard";
import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Timer from "@material-ui/icons/Timer";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";

const styles = {
  grid: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%"
  },
  cardListContainer: {
    width: 300
  },
  editCardGrid: {
    outline: "none",
    pointerEvents: "none"
  },
  editCardTextArea: {
    pointerEvents: "all",
    border: 0,
    outline: "none",
    resize: "none",
    borderRadius: 2,
    padding: 4,
    paddingLeft: 8
  },
  editCardSave: {
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
  editCardSideButton: {
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
  editCardSideButtonIcon: {
    padding: 1,
    marginRight: 5,
    width: "0.8em",
    height: "0.8em"
  }
};

export const EDIT_CARD_DESCRIPTION = "edit-card-description";

const View = class extends React.Component {
  state = { cardBeingEdited: null };

  onModalRendered() {
    // Only when we actually render in the DOM can we know the modal's
    // dimensions.
    const modal = findDOMNode(this).querySelector(
      `[aria-describedby="${EDIT_CARD_DESCRIPTION}"]`
    );
    const cardCoordinates = findDOMNode(
      this.state.cardBeingEdited
    ).getBoundingClientRect();
    modal.style.top = `${cardCoordinates.top}px`;
    modal.style.left = `${cardCoordinates.left}px`;
    const textarea = modal.querySelector("textarea");
    textarea.style.width = `${cardCoordinates.width}px`;
    textarea.style.height = `${cardCoordinates.height + 50}px`;
    textarea.select();
  }

  render() {
    const { classes, lists } = this.props;
    return (
      <>
        <Grid container spacing={16} wrap="nowrap" className={classes.grid}>
          {Object.entries(lists).map(([k, v]) => {
            return (
              <Grid item key={k} className={classes.cardListContainer}>
                <CardsList
                  title={k}
                  cards={v}
                  onEditCard={card => this.setState({ cardBeingEdited: card })}
                />
              </Grid>
            );
          })}
        </Grid>
        <div id={EDIT_CARD_DESCRIPTION} style={{ display: "none" }}>
          Edit card: change title, members, archive etc.
        </div>
        <Modal
          aria-describedby={EDIT_CARD_DESCRIPTION}
          open={this.state.cardBeingEdited !== null ? true : false}
          container={this.state.cardBeingEdited}
          onClose={_ => this.setState({ cardBeingEdited: null })}
          onRendered={this.onModalRendered.bind(this)}
        >
          <Grid
            container
            wrap="nowrap"
            spacing={8}
            className={classes.editCardGrid}
          >
            <Grid item>
              <Typography
                className={classes.editCardTextArea}
                component="textarea"
                spellCheck={false}
                defaultValue={
                  this.state.cardBeingEdited === null
                    ? ""
                    : cardDescription(this.state.cardBeingEdited)
                }
              />
              <Button variant="raised" className={classes.editCardSave}>
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
                        className={classes.editCardSideButton}
                      >
                        <Icon className={classes.editCardSideButtonIcon} />
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
  }
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
};

const Board = withStyles(styles)(View);

export default Board;
