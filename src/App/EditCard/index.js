import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { cardDescription } from "../CardsList/Card";
import * as Labels from "../labels";

const styles = {
  root: {
    position: "fixed",
    top: 60,
    height: 700,
    width: 750,
    backgroundColor: "rgb(237, 239, 240)",
    borderRadius: 2,
    outline: "none"
  },
  title: {
    margin: "8px 32px 8px 46px",
    fontWeight: 700
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
    const { classes, card = null, ...props } = this.props;
    return (
      <div
        aria-describedby={Labels.editCardDescription.id}
        className={classes.root}
        {...props}
      >
        <Title className={classes.title} text={cardDescription(card)} />
      </div>
    );
  }
}

const View = withStyles(styles)(EditCard);

View.propTypes = {
  card: PropTypes.object
};

export default View;
