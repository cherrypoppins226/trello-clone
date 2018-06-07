import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import { fileAbsolute } from "paths.macro";

import { makeFixtures, renderLabels, labelId, moduleName } from "../utils";
import Header from "./editCard/Header";
import Sidebar from "./editCard/Sidebar";
import Content from "./editCard/Content";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  description: {
    id: labelId(modulePath, "description"),
    text: "Edit card: Change title, descriptions, labels, attachments, and more"
  }
};

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

class EditCard extends React.Component {
  componentDidMount() {
    this.node = findDOMNode(this);
    centerInPage(this.node);
  }

  render() {
    const { classes, appState, ...rest } = this.props;
    return (
      <div
        aria-describedby={labels.description.id}
        className={classes.root}
        tabIndex={-1}
        {...rest}
      >
        {renderLabels(labels)}
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

const Component = withStyles(styles)(EditCard);

Component.displayName = modulePath;

Component.propTypes = {
  appState: PropTypes.object.isRequired
};

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      appState: {
        cardBeingEdited: { id: 1, title: "Ut sunt qui amet." },
        finishCardEdit: () => {}
      }
    }
  }
});

export default Component;
