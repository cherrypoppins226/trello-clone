/*
 * Rendered as any draggable component in the app is being dragged
 *
 * There's only one instance of this component in the entire application, so it
 * needs to know how to render previews for all draggable components.
 */

import React from "react";
import { DragLayer } from "react-dnd";

import { CardDragPreview } from "./cardsList/DraggableCard";

const renderComponent = (componentType, itemBeingDragged) => {
  switch (componentType) {
    case "Card":
      return <CardDragPreview {...itemBeingDragged} />;
    default:
      return null;
  }
};

const componentStyles = props => {
  if (!props.currentOffset) return { display: "none" };
  const { x, y } = props.currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    transform,
    WebkitTransform: transform
  };
};

export default DragLayer(monitor => ({
  itemBeingDragged: monitor.getItem(),
  componentType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  beingDragged: monitor.isDragging()
}))(
  class CustomDragLayer extends React.Component {
    render() {
      if (!this.props.beingDragged) return null;
      return (
        <div style={componentStyles(this.props)}>
          {renderComponent(
            this.props.componentType,
            this.props.itemBeingDragged
          )}
        </div>
      );
    }
  }
);
