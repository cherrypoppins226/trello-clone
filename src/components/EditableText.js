import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import Typography from "material-ui/Typography";

const findRoot = node =>
  !node.parentElement ? node : findRoot(node.parentElement);

const onOutsideClick = (node, handler) => {
  // It'd be easier to attach to document.body but we might not render into
  // document in tests.
  const root = findRoot(node);
  const onClick = event => {
    if (!node.contains(event.target)) {
      root.removeEventListener("click", onClick);
      handler(event);
    }
  };
  root.addEventListener("click", onClick);
};

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  setEditing() {
    this.setState({ editing: true });
  }

  unsetEditing() {
    this.setState({ editing: false });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.state.editing) {
      const computed = window.getComputedStyle(this.node);
      return {
        height: computed.height,
        width: computed.width,
        padding: computed.padding
      };
    }
    return null;
  }

  componentDidMount() {
    this.node = findDOMNode(this);
    this.node.style.cursor = "pointer";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.node = findDOMNode(this);
    if (this.state.editing) {
      Object.assign(this.node.style, snapshot);
      onOutsideClick(this.node, this.unsetEditing.bind(this));
    } else {
      this.node.style.cursor = "pointer";
    }
  }

  render() {
    const { value, component = null, ...props } = this.props;
    const computed = this.state.editing
      ? {
          ...props,
          component: component || "textarea",
          defaultValue: value
        }
      : {
          ...props,
          onClick: this.setEditing.bind(this),
          children: value
        };
    return <Typography {...computed} />;
  }
}

EditableText.propTypes = {
  value: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ])
};

export default EditableText;
