import React from "react";
import { findDOMNode } from "react-dom";
import Typography from "material-ui/Typography";
import TextArea from "../TextArea";

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

const Title = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing)
      onOutsideClick(findDOMNode(this), _ => this.setState({ editing: false }));
  }

  render() {
    const { text, ...rest } = this.props;
    const props = this.state.editing
      ? {
          component: TextArea,
          value: text,
          ...rest
        }
      : {
          onClick: _ => this.setState({ editing: true }),
          children: text,
          ...rest
        };
    return <Typography {...props} />;
  }
};

export default Title;
