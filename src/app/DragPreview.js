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

let subscribedToOffsetChange = false;

let dragPreviewRef = null;

const onOffsetChange = monitor => () => {
  if (!dragPreviewRef) return;

  const offset = monitor.getSourceClientOffset();
  if (!offset) return;

  const transform = `translate(${offset.x}px, ${offset.y}px)`;
  dragPreviewRef.style["transform"] = transform;
  dragPreviewRef.style["-webkit-transform"] = transform;
};

export default DragLayer(monitor => {
  if (!subscribedToOffsetChange) {
    monitor.subscribeToOffsetChange(onOffsetChange(monitor));
    subscribedToOffsetChange = true;
  }

  return {
    itemBeingDragged: monitor.getItem(),
    componentType: monitor.getItemType(),
    beingDragged: monitor.isDragging()
  };
})(
  class CustomDragLayer extends React.PureComponent {
    componentDidUpdate(prevProps) {
      dragPreviewRef = this.rootNode;
    }

    render() {
      if (!this.props.beingDragged) return null;
      return (
        <div
          role="presentation"
          ref={el => (this.rootNode = el)}
          style={{
            position: "fixed",
            pointerEvents: "none",
            top: 0,
            left: 0
          }}
        >
          {renderComponent(
            this.props.componentType,
            this.props.itemBeingDragged
          )}
        </div>
      );
    }
  }
);
