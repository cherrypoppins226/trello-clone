import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { findDOMNode } from "react-dom";
import Typography from "material-ui/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import grey from "material-ui/colors/grey";
import * as Labels from "../labels";
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

const styles = {
  root: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    margin: 5,
    "& [role='heading']": {
      flexBasis: "100%",
      fontWeight: 700,
      paddingBottom: 0,
      paddingTop: 3,
      paddingLeft: 5,
      marginRight: 8
    },
    "& p[role='heading']": {
      cursor: "pointer"
    },
    "& button": {
      alignSelf: "flex-start",
      // Reusable styles
      borderWidth: 0,
      background: "none",
      outline: "none",
      cursor: "pointer",
      borderRadius: 4,
      padding: 3,
      "&:hover": {
        background: "#D6D6D6"
      }
    },
    "& svg": {
      // Reusable styles
      padding: 3,
      width: "0.8em",
      height: "0.8em",
      color: grey[700]
    }
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing)
      onOutsideClick(findDOMNode(this).querySelector("[role='heading']"), _ =>
        this.setState({ editing: false })
      );
  }

  render() {
    const { classes, text, onEditList } = this.props;
    const props = this.state.editing
      ? {
          component: TextArea,
          value: text
        }
      : {
          onClick: _ => this.setState({ editing: true }),
          children: text
        };
    return (
      <div className={classes.root}>
        <Typography role="heading" {...props} />
        <button
          onClick={e => onEditList(e.currentTarget)}
          aria-labelledby={Labels.cardsListActionsMenu.id}
          aria-haspopup={true}
        >
          <MoreHoriz />
        </button>
      </div>
    );
  }
}

const View = withStyles(styles)(Header);

Header.propTypes = {
  text: PropTypes.string.isRequired,
  onEditList: PropTypes.func.isRequired
};

export default View;
