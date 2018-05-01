import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/List";
import red from "material-ui/colors/red";

const CardsListCard = withStyles({
  container: {
    margin: 7,
    background: red[100]
  },
  card: {
    padding: 4,
    paddingLeft: 8
  }
})(({ classes, text }) => {
  return (
    <Paper elevation={1} className={classes.container}>
      <ListItem button className={classes.card}>
        <ListItemText>{text}</ListItemText>
      </ListItem>
    </Paper>
  );
});

const CardsList = withStyles({
  container: {
    background: red[50]
  },
  name: {
    padding: 0,
    margin: 8,
    fontWeight: 700
  },
  cards: {
    maxHeight: "90vh",
    overflowY: "scroll"
  }
})(({ classes, name, cards }) => {
  return (
    <Paper elevation={1} className={classes.container}>
      <List style={{ padding: 1 }}>
        <ListSubheader className={classes.name}>{name}</ListSubheader>
        <div className={classes.cards}>
          {cards.map((text, idx) => <CardsListCard key={idx} text={text} />)}
        </div>
      </List>
    </Paper>
  );
});

const Board = withStyles({
  grid: {
    padding: 8,
    margin: 0,
    width: "100%"
  }
})(({ classes, lists }) => {
  return (
    <Grid container spacing={16} wrap="nowrap" className={classes.grid}>
      {Object.entries(lists).map(([k, v]) => {
        return (
          <Grid item key={k} style={{ width: 300 }}>
            <CardsList name={k} cards={v} />
          </Grid>
        );
      })}
    </Grid>
  );
});

const App = ({ lists }) => <Board lists={lists} />;

export default App;
