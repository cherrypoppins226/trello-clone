import React from "react";
import { findDOMNode } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { fileAbsolute } from "paths.macro";
import { compose, setPropTypes, setDisplayName } from "recompose";
import grey from "@material-ui/core/colors/grey";
import { DropTarget } from "react-dnd";

import { types as cardTypes } from "./Card";
import NewCard from "./NewCard";
import { moduleName } from "../../utils";
import DraggableCard from "./DraggableCard";

const styles = {
  root: {
    padding: 0,
    margin: 0,
    height: "100%",
    listStyleType: "none",
    "& li": {
      padding: "0px 8px 8px 8px"
    }
  }
};

class Cards extends React.PureComponent {
  state = { cardPlaceholder: null };

  componentWillReceiveProps(nextProps) {
    if (this.props.beingHovered && !nextProps.beingHovered)
      this.setState({ cardPlaceholder: null });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.cards.length > prevProps.cards.length ||
      this.props.cardBeingAdded
    )
      this.cardsListEnd.scrollIntoView();
  }

  showListItem(component) {
    findDOMNode(component).closest("li").style.display = "";
  }

  hideListItem(component) {
    findDOMNode(component).closest("li").style.display = "none";
  }

  render() {
    const componentList = this.props.cards.map(card => (
      <li key={card.id}>
        <DraggableCard
          card={card}
          onBeginDrag={this.hideListItem}
          onEndDrag={this.showListItem}
        />
      </li>
    ));

    if (this.state.cardPlaceholder)
      componentList.splice(
        this.state.cardPlaceholder.index,
        0,
        <li key={null}>
          <div
            style={{
              borderRadius: 3,
              background: grey[400],
              width: this.state.cardPlaceholder.width,
              height: this.state.cardPlaceholder.height
            }}
          />
        </li>
      );

    if (this.props.cardBeingAdded)
      componentList.splice(
        componentList.length + 1,
        0,
        <li key={null}>
          <NewCard
            cardBeingAdded={this.props.cardBeingAdded}
            finishAddCard={this.props.finishAddCard}
          />
        </li>
      );

    return (
      <React.Fragment>
        {this.props.dropTarget(
          <ul className={this.props.classes.root}>{componentList}</ul>
        )}
        {/* The sole purpose of this div is to allow scrolling to bottom */}
        <div
          style={{ float: "left", clear: "both" }}
          ref={node => (this.cardsListEnd = node)}
        />
      </React.Fragment>
    );
  }
}

const Component = compose(
  setDisplayName(moduleName(fileAbsolute)),
  setPropTypes({
    cards: PropTypes.arrayOf(cardTypes.card).isRequired,
    cardBeingAdded: PropTypes.shape({
      listId: PropTypes.number.isRequired
    }),
    finishAddCard: PropTypes.func.isRequired
  }),
  withStyles(styles),
  DropTarget(
    "Card",
    {
      hover: (props, monitor, component) => {
        const { x, y } = monitor.getClientOffset();

        // Not sure why but sometimes li is null
        const li = document.elementFromPoint(x, y).closest("li");
        if (!li) return;

        // If we're inside a card placeholder we won't find a card.
        const card = li.querySelector("[data-cardid]");
        if (!card) return;

        const cardId = parseInt(card.getAttribute("data-cardid"));
        const cardIndex = props.cards.findIndex(card => card.id === cardId);
        const { top, bottom } = li.getBoundingClientRect();
        const { height, width } = monitor.getItem();
        const index = y < (top + bottom) / 2 ? cardIndex : cardIndex + 1;

        // Prevent unnecessary re-renders because state changes require deep
        // comparison
        if (
          component.state.cardPlaceholder &&
          component.state.cardPlaceholder.index === index
        )
          return;

        component.setState({ cardPlaceholder: { height, width, index } });
      }
    },
    (connect, monitor) => ({
      beingHovered: monitor.isOver(),
      dropTarget: connect.dropTarget()
    })
  )
)(Cards);

export default Component;
