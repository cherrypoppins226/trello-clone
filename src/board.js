import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PropTypes from "prop-types";
import CardsList from "./cardsList";
import EditCard from "./editCard";

const styles = {
  grid: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%",
    background: "rgb(0, 121, 191)"
  },
  cardListContainer: {
    width: 300
  }
};

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
        <EditCard
          root={this}
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

const Board = withStyles(styles)(View);

export default Board;
