import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import CardsList from "./CardsList";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import { cardDescription } from "./CardsList/Card";

const styles = {
  root: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%"
  },
  cardListContainer: {
    width: 280
  },
  cardsListActionsPopover: {
    backgroundColor: "transparent"
  }
};

class Board extends React.Component {
  state = {
    listBeingEdited: null,
    cardBeingQuickEdited: null,
    cardBeingEdited: null
  };

  render() {
    const { classes, lists } = this.props;
    const cardTitle = (v => (v ? cardDescription(v) : ""))(
      this.state.cardBeingEdited || this.state.cardBeingQuickEdited
    );
    return (
      <>
        <Grid container spacing={16} wrap="nowrap" className={classes.root}>
          {Object.entries(lists).map(([k, v]) => {
            return (
              <Grid item key={k} className={classes.cardListContainer}>
                <CardsList
                  title={k}
                  cards={v}
                  onQuickEditCard={card =>
                    this.setState({ cardBeingQuickEdited: card })
                  }
                  onEditCard={card => this.setState({ cardBeingEdited: card })}
                  onEditList={list => this.setState({ listBeingEdited: list })}
                />
              </Grid>
            );
          })}
        </Grid>
        <Popover
          anchorEl={this.state.listBeingEdited}
          container={this}
          open={Boolean(this.state.listBeingEdited)}
          onClose={_ => this.setState({ listBeingEdited: null })}
          TransitionProps={{ timeout: 0 }}
          elevation={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{ classes: { root: classes.cardsListActionsPopover } }}
        >
          <ActionsMenu
            onMenuItemClick={_ => this.setState({ listBeingEdited: null })}
          />
        </Popover>
        <Modal
          container={this}
          open={Boolean(this.state.cardBeingQuickEdited)}
          onClose={_ => this.setState({ cardBeingQuickEdited: null })}
          BackdropProps={{ id: "quickEditCardBackdrop" }}
        >
          <QuickEditCard
            title={cardTitle}
            anchorEl={this.state.cardBeingQuickEdited}
          />
        </Modal>
        <Modal
          container={this}
          open={Boolean(this.state.cardBeingEdited)}
          onClose={_ => this.setState({ cardBeingEdited: null })}
          BackdropProps={{ id: "editCardBackdrop" }}
        >
          <EditCard title={cardTitle} />
        </Modal>
      </>
    );
  }
}

const View = withStyles(styles)(Board);

View.propTypes = {
  lists: PropTypes.object.isRequired
};

export default View;
