import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { fileAbsolute } from "paths.macro";

import Header from "./Header";
import Cards from "./Cards";
import { button } from "../styles";
import { moduleName } from "../utils";

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

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.list.cards
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
        data-listid={this.props.list.id}
        component="section"
        elevation={1}
        className={this.props.classes.root}
      >
        <Header
          className={this.props.classes.header}
          listId={this.props.list.id}
          listTitle={this.props.list.title}
        />
        <div style={{ overflowY: "scroll" }}>
          <Cards cards={this.state.cards} />
        </div>
        <Button onClick={this.addCard.bind(this)}>Add a card...</Button>
      </Paper>
    );
  }
}

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

export const listType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
});

Styled.propTypes = {
  list: listType
};

export default Styled;
