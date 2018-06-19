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
          transform,
          WebkitTransform: transform
        }}
        card={this.props.card}
      />
    );
  }
}

class DraggableCard extends React.Component {
  componentDidMount() {
    // Override HTML5's default behavior of capturing a screenshot of the
    // element being dragged. We will render our own drag preview.
    this.props.dragPreview(getEmptyImage());
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isDragging && nextProps.isDragging)
      this.props.onBeginDrag(this);
    else if (this.props.isDragging && !nextProps.isDragging)
      this.props.onEndDrag(this);
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
    })
  },
  (connect, monitor) => ({
    isDragging: monitor.isDragging(),
    dragSource: connect.dragSource(),
    dragPreview: connect.dragPreview()
  })
)(DraggableCard);
