import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "./Card";

const styles = {
  root: {
    padding: 0,
    margin: 0,
    height: "100%",
    "& li": {
      margin: 8,
      marginTop: 2,
      cursor: "pointer"
    }
  }
};

class Cards extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.cards.length > prevProps.cards.length)
      this.cardsListEnd.scrollIntoView();
  }

  render() {
    return (
      <>
        <ul className={this.props.classes.root}>
          {this.props.cards.map(({ id, description }) => (
            <li key={id}>
              <Card
                description={description}
                onQuickEditCard={this.props.onQuickEditCard}
                onEditCard={this.props.onEditCard}
              />
            </li>
          ))}
        </ul>
        {/* The sole purpose of this div is to allow scrolling to bottom */}
        <div
          style={{ float: "left", clear: "both" }}
          ref={node => (this.cardsListEnd = node)}
        />
      </>
    );
  }
}

const View = withStyles(styles)(Cards);

View.propTypes = {
  cards: PropTypes.array.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onQuickEditCard: PropTypes.func.isRequired
};

export default View;
