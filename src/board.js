import React from "react";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import Modal from "material-ui/Modal";
import Typography from "material-ui/Typography";
import CardsList from "./cardsList";
import { cardDescription } from "./cardsListCard";

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
  editCardTextArea: {
    border: 0,
    outline: "none",
    resize: "none",
    width: "100%",
    height: "100%",
    borderRadius: 2,
    padding: 4,
    paddingLeft: 8
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
    const box = modal.parentElement.getBoundingClientRect();
    modal.style.top = `${box.top}px`;
    modal.style.left = `${box.left}px`;
    const textarea = modal.querySelector("textarea");
    textarea.style.width = `${box.width}px`;
    textarea.style.height = `${box.height + 50}px`;
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
