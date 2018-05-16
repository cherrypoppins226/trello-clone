import React from "react";
import path from "path";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = {
  root: {
    border: 0,
    outline: "none",
    resize: "none",
    borderRadius: 2,
    boxSizing: "border-box",
    boxShadow: "0px 0px 1px 0px"
  }
};

let View = class extends React.Component {
  constructor(props) {
    super(props);
    this.resizeTextArea = this.resizeTextArea.bind(this);
  }

  resizeTextArea() {
    this.node.style.height = `${this.node.scrollHeight}px`;
  }

  componentDidMount() {
    this.node = findDOMNode(this);
    this.node.select();
    this.resizeTextArea();
  }

  render() {
    const { className, classes, value, rows, ...props } = this.props;
    return (
      <textarea
        className={[className, classes.root].join(" ")}
        rows={rows || 1}
        defaultValue={value}
        onInput={this.resizeTextArea}
        {...props}
      />
    );
  }
};

View = withStyles(styles)(View);

View.propTypes = {
  rows: PropTypes.number,
  value: PropTypes.string
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default View;
