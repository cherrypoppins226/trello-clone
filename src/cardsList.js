import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import List from "material-ui/List";
import PropTypes from "prop-types";
import red from "material-ui/colors/red";
import CardsListCard from "./cardsListCard";

const styles = {
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

const View = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards.map((description, idx) =>
        this.newCard(idx, description)
      )
    };
  }

  newCard(idx, description = undefined) {
    return (
      <CardsListCard
        key={idx}
        description={description}
        onEditCard={this.props.onEditCard}
      />
    );
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => {
      return {
        cards: [this.newCard(prevState.cards.length + 1), ...prevState.cards]
      };
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
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onEditCard: PropTypes.func.isRequired
};

const CardsList = withStyles(styles)(View);

export default CardsList;
