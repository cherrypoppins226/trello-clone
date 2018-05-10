import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import CardsList from "./cardsList";
import Modal from "material-ui/Modal";

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
  editCard: {
    position: "absolute"
  }
};

export const EDIT_CARD_DESCRIPTION = "edit-card-description";

const View = class extends React.Component {
  state = { cardBeingEdited: null };

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
          onClose={_ => this.setState({ cardBeingEdited: null })}
          container={this.state.cardBeingEdited}
          className={classes.editCard}
        >
          <div>Hey Modal</div>
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
