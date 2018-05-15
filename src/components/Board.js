import React from "react";
import path from "path";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import CardsList from "./CardsList";
import EditCard from "./EditCard";
import CardsListActionsMenu from "./CardsListActionsMenu";

const styles = {
  grid: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%"
  },
  cardListContainer: {
    width: 280
  }
};

const View = class extends React.Component {
  state = {
    listBeingEdited: null,
    cardBeingEdited: null
  };

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
                  onEditList={list => this.setState({ listBeingEdited: list })}
                />
              </Grid>
            );
          })}
        </Grid>
        <CardsListActionsMenu
          anchor={this.state.listBeingEdited}
          onClose={_ => this.setState({ listBeingEdited: null })}
        />
        <EditCard
          card={this.state.cardBeingEdited}
          onClose={_ => this.setState({ cardBeingEdited: null })}
        />
      </>
    );
  }
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
