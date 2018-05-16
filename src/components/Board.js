import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import Popover from "material-ui/Popover";
import CardsList from "./CardsList";
import QuickEditCard from "./QuickEditCard";
import ActionsMenu from "./CardsList/ActionsMenu";
import EditCard from "./EditCard";
import * as Labels from "./labels";

const styles = {
  root: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%"
  },
  cardListContainer: {
    width: 280
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
          aria-describedby={Labels.cardsListActionsMenuDescription.id}
          anchorEl={this.state.listBeingEdited}
          container={this}
          open={Boolean(this.state.listBeingEdited)}
          onClose={_ => this.setState({ listBeingEdited: null })}
          transitionDuration={0}
          elevation={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <ActionsMenu
            onMenuItemClick={_ => this.setState({ listBeingEdited: null })}
          />
        </Popover>
        <QuickEditCard
          container={this}
          card={this.state.cardBeingQuickEdited}
          onClose={_ => this.setState({ cardBeingQuickEdited: null })}
        />
        <EditCard
          container={this}
          card={this.state.cardBeingEdited}
          onClose={_ => this.setState({ cardBeingEdited: null })}
        />
      </>
    );
  }
}

const View = withStyles(styles)(Board);

View.propTypes = {
  lists: PropTypes.object.isRequired
};

export default View;
