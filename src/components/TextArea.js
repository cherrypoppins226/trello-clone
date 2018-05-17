import React from "react";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = {
  root: {
    border: 0,
    resize: "none",
    borderRadius: 2,
    background: "transparent",
    padding: "0.1em 0.2em",
    "&:focus": {
      outlineWidth: 2,
      background: "white",
      boxShadow: "0px 0px 2px 0px"
    }
  }
};

const resize = (node1, node2) =>
  (node1.style.height = `${node2.scrollHeight}px`);

const leaveOnEnter = event => event.keyCode === 13 && event.target.blur();

class TextArea extends React.Component {
  componentDidMount() {
    this.node = findDOMNode(this);
    resize(this.node, this.node);
  }

  render() {
    const { className, classes, value, ...props } = this.props;
    return (
      <textarea
        className={[className, classes.root].join(" ")}
        defaultValue={value}
        onInput={e => resize(this.node, e.target)}
        onKeyDown={leaveOnEnter}
        rows={1}
        {...props}
      />
    );
  }
}

const View = withStyles(styles)(TextArea);

View.propTypes = {
  value: PropTypes.string
};

export default View;
