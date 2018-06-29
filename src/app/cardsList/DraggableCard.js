import React from "react";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { Container as CardContainer, View as CardView } from "./Card";

// Rendered when a Card is being dragged
// PureComponent prevents rerenders on each mouse move event
export class CardDragPreview extends React.PureComponent {
  render() {
    const transform = "rotate(4deg)";
    return (
      <CardView
        style={{
          height: this.props.height,
          width: this.props.width,
          boxShadow: "0 0 0 1px rgba(0,0,0,.1), 4px 4px 8px rgba(0,0,0,.2)",
          transform,
          WebkitTransform: transform
        }}
        card={this.props.card}
      />
    );
  }
}

class DraggableCard extends React.Component {
  state = { isDragging: false };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isDragging && nextProps.isDragging) {
      nextProps.onBeginDrag(nextProps.cardBeingDragged);
      return { isDragging: true };
    } else if (prevState.isDragging && !nextProps.isDragging) {
      nextProps.onEndDrag(nextProps.cardBeingDragged);
      return { isDragging: false };
    }
    return null;
  }

  componentDidMount() {
    // Override HTML5's default behavior of capturing a screenshot of the
    // element being dragged. We will render our own drag preview.
    this.props.dragPreview(getEmptyImage());
  }

  shouldComponentUpdate(nextProps) {
    return this.props.card !== nextProps.card;
  }

  render() {
    return this.props.dragSource(
      <div ref={el => (this.rootNode = el)}>
        <CardContainer card={this.props.card} />
      </div>
    );
  }
}

export default DragSource(
  "Card",
  {
    beginDrag: (props, monitor, component) => ({
      card: props.card,
      height: component.rootNode.clientHeight,
      width: component.rootNode.clientWidth
    }),
    isDragging: (props, monitor) => props.card.id === monitor.getItem().card.id
  },
  (connect, monitor) => ({
    isDragging: monitor.isDragging(),
    cardBeingDragged: monitor.getItem(),
    dragSource: connect.dragSource(),
    dragPreview: connect.dragPreview()
  })
)(DraggableCard);
