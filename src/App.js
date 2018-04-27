import React from "react";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/List";
import red from "material-ui/colors/red";

import "./App.css";

const CardListItem = props => {
  return (
    <Paper style={{ background: red[100] }}>
      <ListItem button={true}>
        <ListItemText>{props.text}</ListItemText>
      </ListItem>
    </Paper>
  );
};

const CardList = props => {
  return (
    <Paper style={{ background: red[50] }}>
      <List subheader={<ListSubheader>{props.name}</ListSubheader>}>
        <Grid container spacing={16} direction="column">
          {props.cards.map((text, idx) => (
            <Grid item key={idx}>
              <CardListItem text={text} />
            </Grid>
          ))}
        </Grid>
      </List>
    </Paper>
  );
};

const Board = props => {
  return (
    <Grid container spacing={16}>
      {Object.entries(props.lists).map(([k, v]) => {
        return (
          <Grid item key={k}>
            <CardList name={k} cards={v} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const App = props => <Board lists={props.lists} />;

export default App;
