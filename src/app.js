import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/List";
import PropTypes from "prop-types";
import red from "material-ui/colors/red";

const CardsListCardStyles = {
  container: {
    margin: 8,
    marginTop: 0,
    marginBottom: 8,
    background: red[100]
  },
  card: {
    padding: 4,
    paddingLeft: 8
  }
};

const CardsListCardComponent = ({ classes, text }) => {
  return (
    <Paper elevation={1} component="li" className={classes.container}>
      <ListItem button className={classes.card}>
        <ListItemText>{text}</ListItemText>
      </ListItem>
    </Paper>
  );
};

CardsListCardComponent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export const CardsListCard = withStyles(CardsListCardStyles)(
  CardsListCardComponent
);

const CardsListStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: red[50]
  },
  list: {
    padding: 1,
    display: "flex",
    flexDirection: "column"
  },
  name: {
    padding: 0,
    margin: 8,
    marginTop: 16,
    fontWeight: 700
  },
  cards: {
    overflowY: "scroll"
  },
  addCard: {
    justifyContent: "left",
    textTransform: "none"
  }
};

const CardsListComponent = (() => {
  const addCard = e => {
    e.preventDefault();
  };

  return ({ classes, name, cards }) => (
    <Paper elevation={1} className={classes.container}>
      <List className={classes.list}>
        <ListSubheader component="li" className={classes.name}>
          {name}
        </ListSubheader>
        <div className={classes.cards}>
          {cards.map((text, idx) => <CardsListCard key={idx} text={text} />)}
        </div>
      </List>
      <Button className={classes.addCard} onClick={addCard}>
        Add a card...
      </Button>
    </Paper>
  );
})();

CardsListComponent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
};

export const CardsList = withStyles(CardsListStyles)(CardsListComponent);

const BoardStyles = {
  grid: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%"
  },
  cardListContainer: {
    width: 300
  }
};

const BoardComponent = ({ classes, lists }) => {
  return (
    <Grid container spacing={16} wrap="nowrap" className={classes.grid}>
      {Object.entries(lists).map(([k, v]) => {
        return (
          <Grid item key={k} className={classes.cardListContainer}>
            <CardsList name={k} cards={v} />
          </Grid>
        );
      })}
    </Grid>
  );
};

BoardComponent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
};

export const Board = withStyles(BoardStyles)(BoardComponent);

const App = ({ lists }) => <Board lists={lists} />;

export default App;
