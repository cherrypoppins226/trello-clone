import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/List";
import red from "material-ui/colors/red";

const CardsListCard = withStyles({
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
})(({ classes, text }) => {
  return (
    <Paper elevation={1} component="li" className={classes.container}>
      <ListItem button className={classes.card}>
        <ListItemText className={classes.text}>{text}</ListItemText>
      </ListItem>
    </Paper>
  );
});

const CardsList = withStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: red[50]
  },
  list: {
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
})(({ classes, name, cards }) => {
  const addCard = e => {
    e.preventDefault();
  };

  return (
    <Paper elevation={1} className={classes.container}>
      <List style={{ padding: 1 }} className={classes.list}>
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
});

const Board = withStyles({
  grid: {
    padding: 8,
    margin: 0,
    height: "100%",
    width: "100%"
  },
  cardListContainer: {
    width: 300
  }
})(({ classes, lists }) => {
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
});

const App = ({ lists }) => <Board lists={lists} />;

export default App;
