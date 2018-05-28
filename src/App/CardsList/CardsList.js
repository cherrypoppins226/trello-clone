import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Header from "./Header";
import Cards from "./Cards";
import { button } from "../styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    background: "rgb(226, 228, 230)",
    "& > button": {
      ...button,
      justifyContent: "left",
      fontWeight: 400
    }
  },
  header: {
    margin: 5
  }
};

const nextCardId = cards =>
  cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;

class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards
    };
  }

  addCard() {
    this.setState(prevState => ({
      cards: [
        ...prevState.cards,
        { id: nextCardId(prevState.cards), title: "Title..." }
      ]
    }));
  }

  render() {
    return (
      <Paper
        component="section"
        elevation={1}
        className={this.props.classes.root}
        data-testid="CardsList"
      >
        <Header
          className={this.props.classes.header}
          text={this.props.title}
          onEditList={this.props.onEditList}
        />
        <div style={{ overflowY: "scroll" }}>
          <Cards
            cards={this.state.cards}
            onEditCard={this.props.onEditCard}
            onQuickEditCard={this.props.onQuickEditCard}
          />
        </div>
        <Button onClick={this.addCard.bind(this)}>Add a card...</Button>
      </Paper>
    );
  }
}

const View = withStyles(styles)(CardsList);

View.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onEditList: PropTypes.func.isRequired,
  onQuickEditCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired
};

export default View;
