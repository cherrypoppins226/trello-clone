import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemText } from "material-ui/List";
import PropTypes from "prop-types";
import red from "material-ui/colors/red";
import grey from "material-ui/colors/grey";
import Create from "@material-ui/icons/Create";

const CardsListCardStyles = {
  container: {
    margin: 8,
    marginTop: 0,
    marginBottom: 8,
    background: red[100],
    display: "flex",
    flexDirection: "row"
  },
  card: {
    padding: 4,
    paddingLeft: 8,
    "&:hover $edit": {
      visibility: "visible"
    }
  },
  description: {
    paddingRight: 0
  },
  edit: {
    visibility: "hidden",
    borderWidth: 0,
    background: "none",
    cursor: "pointer",
    alignSelf: "flex-start",
    borderRadius: 4,
    padding: 2,
    paddingBottom: 0,
    "&:hover": {
      background: red[200]
    }
  },
  editIcon: {
    padding: 2,
    width: "0.8em",
    height: "0.8em",
    color: grey[800]
  }
};

const CardsListCardComponent = ({ classes, description = "Title..." }) => {
  return (
    <Paper elevation={1} component="li" className={classes.container}>
      <ListItem button className={classes.card}>
        <ListItemText className={classes.description}>
          {description}
        </ListItemText>
        <div id="edit-card-label" style={{ display: "none" }}>
          Edit card: change description, archive, etc...
        </div>
        <button className={classes.edit} aria-label="edit-card-label">
          <Create className={classes.editIcon} />
        </button>
      </ListItem>
    </Paper>
  );
};

CardsListCardComponent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string
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
  title: {
    padding: 0,
    margin: 8,
    marginTop: 16
  },
  cardsList: {
    padding: 1,
    overflowY: "scroll"
  },
  addCard: {
    justifyContent: "left",
    textTransform: "none"
  }
};

class CardsListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards.map((description, idx) => (
        <CardsListCard key={idx} description={description} />
      ))
    };
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => {
      const card = <CardsListCard key={this.state.cards.length + 1} />;
      return { cards: prevState.cards.concat(card) };
    });
  }

  render() {
    const { classes, title } = this.props;
    return (
      <Paper elevation={1} className={classes.container}>
        <h4 className={classes.title}>{title}</h4>
        <List data-testid="cards-list" className={classes.cardsList}>
          {this.state.cards}
        </List>
        <Button className={classes.addCard} onClick={this.addCard.bind(this)}>
          Add a card...
        </Button>
      </Paper>
    );
  }
}

CardsListComponent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
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
            <CardsList title={k} cards={v} />
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
