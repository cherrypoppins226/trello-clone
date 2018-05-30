import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import { fileAbsolute } from "paths.macro";

import { moduleName } from "../utils";
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
    margin: "20px 20px 30px 15px"
  },
  content: {
    float: "left",
    width: "75%",
    padding: "0px 10px"
  },
  sidebar: {
    float: "right",
    width: "25%"
  }
};

const centerInPage = node => {
  node.style.left = `${(window.innerWidth - node.offsetWidth) / 2}px`;
};

class View extends React.Component {
  componentDidMount() {
    this.node = findDOMNode(this);
    centerInPage(this.node);
  }

  render() {
    const { classes, title } = this.props;
    return (
      <div
        aria-describedby={labels.editCardDescription.id}
        className={classes.root}
        tabIndex={-1}
      >
        <Header className={classes.header} text={title} />
        <Content className={classes.content} />
        <Sidebar className={classes.sidebar} />
      </div>
    );
  }
}

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default Styled;
