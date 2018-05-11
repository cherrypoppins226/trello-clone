import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import List from "material-ui/List";
import PropTypes from "prop-types";
import CardsListCard from "./cardsListCard";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: "rgb(226, 228, 230)"
  },
  title: {
    margin: 8,
    fontWeight: 700
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
      counter: props.cards.length,
      cards: props.cards.map((description, idx) =>
        this.newCard(idx, description)
      )
    };
  }

  newCard(id, description = undefined) {
    return (
      <CardsListCard
        key={id}
        description={description}
        onEditCard={this.props.onEditCard}
      />
    );
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1,
      cards: [...prevState.cards, this.newCard(prevState.counter + 1)]
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length < this.state.cards.length)
      this.cardsListEnd.scrollIntoView();
  }

  render() {
    const { classes, title } = this.props;
    return (
      <Paper elevation={1} className={classes.container}>
        <Typography className={classes.title}>{title}</Typography>
        <List className={classes.cardsList}>
          <div data-testid="cards-list">{this.state.cards}</div>
          <div
            style={{ float: "left", clear: "both" }}
            ref={node => (this.cardsListEnd = node)}
          />
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
