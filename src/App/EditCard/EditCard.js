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
    width: 750,
    backgroundColor: "rgb(237, 239, 240)",
    borderRadius: 2,
    outline: "none"
  },
  flex: {
    display: "flex"
  },
  content: {
    width: "100%",
    padding: "0px 10px"
  },
  sidebar: {
    flexBasis: 220
  }
};

// TODO: Shouldn't be a concern here
const centerInPage = node => {
  node.style.left = `${(window.innerWidth - node.offsetWidth) / 2}px`;
};

class View extends React.Component {
  componentDidMount() {
    this.node = findDOMNode(this);
    centerInPage(this.node);
  }

  render() {
    const { classes, appState, ...rest } = this.props;
    return (
      <div
        aria-describedby={labels.editCardDescription.id}
        className={classes.root}
        tabIndex={-1}
        {...rest}
      >
        <Header
          className={classes.header}
          text={appState.cardBeingEdited.title}
        />
        <div className={classes.flex}>
          <Content className={classes.content} />
          <Sidebar className={classes.sidebar} />
        </div>
      </div>
    );
  }
}

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  appState: PropTypes.object.isRequired
};

export default Styled;
