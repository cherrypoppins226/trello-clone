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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing)
      onOutsideClick(findDOMNode(this), _ => this.setState({ editing: false }));
  }

  render() {
    const { value, component = null, ...extra } = this.props;
    const props = this.state.editing
      ? {
          ...extra,
          component: component || "textarea",
          defaultValue: value
        }
      : {
          ...extra,
          onClick: _ => this.setState({ editing: true }),
          children: value
        };
    return <Typography {...props} />;
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
