import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import * as labels from "../labels";

const styles = {
  root: {
    position: "absolute",
    top: 60,
    width: 750,
    backgroundColor: "rgb(237, 239, 240)",
    borderRadius: 2,
    outline: "none"
  },
  header: {
    margin: [[15, 5, 30, 8]]
  },
  content: {
    float: "left",
    width: "75%",
    padding: [[0, 10]]
  },
  sidebar: {
    float: "right",
    width: "25%"
  }
};

const centerInPage = node => {
  node.style.left = `${(window.innerWidth - node.offsetWidth) / 2}px`;
};

class EditCard extends React.Component {
  componentDidMount() {
    this.node = findDOMNode(this);
    centerInPage(this.node);
  }

  render() {
    const { classes, title, ...props } = this.props;
    return (
      <div
        aria-describedby={labels.editCardDescription.id}
        className={classes.root}
        {...props}
      >
        <Header className={classes.header} text={title} />
        <div className={classes.content}>
          <Content />
        </div>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
      </div>
    );
  }
}

const View = withStyles(styles)(EditCard);

View.propTypes = {
  title: PropTypes.string.isRequired
};

export default View;
