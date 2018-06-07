import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { fileAbsolute } from "paths.macro";

import Card, { types as cardTypes } from "./Card";

const styles = {
  root: {
    padding: 0,
    margin: 0,
    height: "100%",
    listStyleType: "none",
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
      <React.Fragment>
        <ul className={this.props.classes.root}>
          {this.props.cards.map(card => (
            <li key={card.id}>
              <Card card={card} />
            </li>
          ))}
        </ul>
        {/* The sole purpose of this div is to allow scrolling to bottom */}
        <div
          style={{ float: "left", clear: "both" }}
          ref={node => (this.cardsListEnd = node)}
        />
      </React.Fragment>
    );
  }
}

const Component = withStyles(styles)(Cards);

Component.displayName = require("../../utils").moduleName(fileAbsolute);

Component.propTypes = {
  cards: PropTypes.arrayOf(cardTypes.card).isRequired
};

export default Component;
