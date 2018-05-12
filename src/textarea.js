import React from "react";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import path from 'path';

const styles = {
  container: {
    border: 0,
    outline: "none",
    resize: "none",
    borderRadius: 2,
    boxSizing: "border-box",
    boxShadow: "0px 0px 1px 0px"
  }
};

const View = class extends React.Component {
  constructor(props) {
    super(props);
    this.maybeCloseTextArea = this.maybeCloseTextArea.bind(this);
    this.resizeTextArea = this.resizeTextArea.bind(this);
  }

  maybeCloseTextArea(event) {
    if (event.target !== this.node) {
      document.removeEventListener("click", this.maybeCloseTextArea);
      if (this.props.onClose !== undefined)
        this.props.onClose(event);
    }
  }

  resizeTextArea() {
    this.node.style.height = `${this.node.scrollHeight}px`;
  }

  componentDidMount() {
    document.body.addEventListener("click", this.maybeCloseTextArea);
    this.node = findDOMNode(this);
    this.node.select();
    this.resizeTextArea();
  }

  render() {
    const { className, classes, value, rows, ...props } = this.props;
    return (
      <textarea
        className={[className, classes.container].join(" ")}
        rows={rows || 1}
        defaultValue={value}
        onInput={this.resizeTextArea}
        {...props}
      />
    );
  }
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  rows: PropTypes.number,
  value: PropTypes.string,
  onClose: PropTypes.func
};

export default withStyles(styles)(View);
