import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { compose, setPropTypes } from "recompose";
import grey from "@material-ui/core/colors/grey";
import { DropTarget } from "react-dnd";
import shallowEqual from "shallowequal";

import { types as cardTypes } from "./Card";
import NewCard from "./NewCard";
import { omitKeys } from "../../utils";
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

const DragOverListener = DropTarget(
  "Card",
  {
    hover: (props, monitor, component) =>
      props.onDragOver(component.rootNode, monitor.getClientOffset())
  },
  (connect, monitor) => ({
    dropTarget: connect.dropTarget()
  })
)(
  class extends React.PureComponent {
    render() {
      return this.props.dropTarget(
        <li
          style={{ display: this.props.display }}
          ref={el => (this.rootNode = el)}
        >
          {this.props.children}
        </li>
      );
    }
  }
);

class Cards extends React.Component {
  state = {
    cardPlaceholderIndex: null,
    // If we pass monitor.getItem() as a prop from the DropTarget wrapper and
    // move or hide the card node that's being dragged, all sorts of weird
    // things happen because subsequent library code assumes the node being
    // dragged is in the DOM and visible. That is why we defer hiding the node
    // until after, when the draggable card gets notified that it's being
    // dragged, which happens after breakable library code has already been
    // executed.
    dragDataId: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.beingDraggedOver) {
      return { cardPlaceholderIndex: null };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(
        omitKeys(["dragData", "beingDraggedOver"], this.props),
        omitKeys(["dragData", "beingDraggedOver"], nextProps)
      )
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cardBeingAdded) this.cardsListEnd.scrollIntoView();
  }

  onDragOverCard(node, cursor) {
    const cardNodes = Array.prototype.filter.call(this.ul.children, node =>
      node.querySelector("[data-cardid]")
    );
    const cardIndex = cardNodes.indexOf(node);
    const { top, bottom } = node.getBoundingClientRect();
    const index = cursor.y < (top + bottom) / 2 ? cardIndex : cardIndex + 1;
    this.setState({ cardPlaceholderIndex: index });
  }

  cardIndex(cardId) {
    return this.props.cards.findIndex(card => card.id === cardId);
  }

  render() {
    const componentList = this.props.cards.map(card => (
      <DragOverListener
        key={card.id}
        onDragOver={this.onDragOverCard.bind(this)}
      >
        <DraggableCard
          card={card}
          onBeginDrag={data =>
            this.setState({
              dragDataId: data.card.id,
              cardPlaceholderIndex: this.cardIndex(data.card.id)
            })
          }
          onEndDrag={data => this.setState({ dragDataId: null })}
        />
      </DragOverListener>
    ));

    const cardIndex = this.cardIndex(this.state.dragDataId);
    const cardBeingDragged =
      cardIndex !== -1 ? componentList.splice(cardIndex, 1)[0] : null;

    if (this.state.cardPlaceholderIndex !== null) {
      const placeholder = (
        <li key={-1}>
          <div
            style={{
              borderRadius: 3,
              background: grey[400],
              width: this.props.dragData.width,
              height: this.props.dragData.height
            }}
          />
        </li>
      );
      componentList.splice(this.state.cardPlaceholderIndex, 0, placeholder);
    }

    if (this.props.cardBeingAdded) {
      const newCard = (
        <li key={-2}>
          <NewCard
            cardBeingAdded={this.props.cardBeingAdded}
            finishAddCard={this.props.finishAddCard}
          />
        </li>
      );
      componentList.splice(componentList.length + 1, 0, newCard);
    }

    return (
      <React.Fragment>
        {this.props.dropTarget(
          <ul className={this.props.classes.root} ref={el => (this.ul = el)}>
            {componentList}
          </ul>
        )}
        {/* We have to render the card being dragged in order to listen for its
        end drag event */}
        <div style={{ display: "none" }}> {cardBeingDragged} </div>
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
  setPropTypes({
    cards: PropTypes.arrayOf(cardTypes.card).isRequired,
    cardBeingAdded: PropTypes.shape({
      listId: PropTypes.number.isRequired
    }),
    finishAddCard: PropTypes.func.isRequired
  }),
  withStyles(styles),
  DropTarget("Card", {}, (connect, monitor) => ({
    dragData: monitor.getItem(),
    beingDraggedOver: monitor.isOver({ shallow: true }),
    dropTarget: connect.dropTarget()
  }))
)(Cards);

export default Component;
