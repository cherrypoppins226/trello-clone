import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Header from "./Header";
import Cards from "./Cards";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: "rgb(226, 228, 230)",
    "& > button": {
      justifyContent: "left",
      textTransform: "none"
    }
  }
};

class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.cards.length,
      cards: props.cards.map((card, idx) => ({
        id: idx,
        description: card
      }))
    };
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1,
      cards: [
        ...prevState.cards,
        { id: prevState.counter + 1, description: undefined }
      ]
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper
        component="section"
        elevation={1}
        className={classes.root}
        data-testid="CardsList"
      >
        <Header text={this.props.title} onEditList={this.props.onEditList} />
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
