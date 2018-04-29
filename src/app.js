import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/List";
import red from "material-ui/colors/red";

const CardListItem = withStyles({
  paper: {
    margin: 7,
    background: red[100]
  },
  listItem: {
    padding: 4,
    paddingLeft: 8
  }
})(({ classes, text }) => {
  return (
    <Paper elevation={1} className={classes.paper}>
      <ListItem button className={classes.listItem}>
        <ListItemText className={classes.listItemText}>{text}</ListItemText>
      </ListItem>
    </Paper>
  );
});

const CardList = withStyles({
  container: {
    background: red[50]
  },
  header: {
    padding: 0,
    margin: 8,
    fontWeight: 700
  },
  list: {
    padding: 1
  },
  cards: {
    maxHeight: "80vh",
    overflowY: "scroll"
  }
})(({ classes, name, cards }) => {
  return (
    <Paper elevation={1} className={classes.container}>
      <List className={classes.list}>
        <ListSubheader className={classes.header}>{name}</ListSubheader>
        <div className={classes.cards}>
          {cards.map((text, idx) => <CardListItem key={idx} text={text} />)}
        </div>
      </List>
    </Paper>
  );
});

const Board = withStyles({
  grid: {
    margin: 8,
    wordBreak: "break-word"
  },
  gridItem: {
    width: 300
  }
})(({ classes, lists }) => {
  return (
    <Grid container spacing={16} wrap="nowrap" className={classes.grid}>
      {Object.entries(lists).map(([k, v]) => {
        return (
          <Grid item key={k} className={classes.gridItem}>
            <CardList name={k} cards={v} />
          </Grid>
        );
      })}
    </Grid>
  );
});

const App = ({ lists }) => <Board lists={lists} />;

export default App;
