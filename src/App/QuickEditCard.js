import React from "react";
import { findDOMNode } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Timer from "@material-ui/icons/Timer";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import TextArea from "react-textarea-autosize";
import { cardType } from "./CardsList/Card";
import * as labels from "./labels";
import { button, textarea, smallIcon } from "./styles";

const styles = {
  root: {
    position: "fixed",
    outline: "none",
    pointerEvents: "none"
  },
  description: {
    float: "left",
    marginRight: 8,
    "& textarea": {
      ...textarea,
      pointerEvents: "all",
      padding: 4,
      paddingLeft: 8,
      minHeight: 100,
      minWidth: 200
    },
    "& button": {
      ...button,
      pointerEvents: "all",
      color: grey[50],
      backgroundColor: green[500],
      marginTop: 15,
      "&:hover": {
        backgroundColor: green[600]
      }
    }
  },
  sideButtons: {
    float: "right",
    width: 160,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& button": {
      ...button,
      pointerEvents: "all",
      marginBottom: 4,
      background: "rgba(0, 0, 0, .6)",
      color: grey[50],
      transition: "transform 85ms ease-in",
      "&:hover": {
        background: "rgba(0, 0, 0, .8)",
        transform: "translateX(5px)",
        transition: "transform 85ms ease-in"
      },
      "& svg": smallIcon
    }
  }
};

class QuickEditCard extends React.Component {
  componentDidMount() {
    const modalNode = findDOMNode(this);
    const textareaNode = modalNode.querySelector("textarea");
    const cardNode = modalNode.ownerDocument.querySelector(
      `[data-cardid="${this.props.card.id}"]`
    );
    // When developing in isolation, a card won't be available
    if (cardNode) {
      const coordinates = cardNode.getBoundingClientRect();
      modalNode.style.top = `${coordinates.top}px`;
      modalNode.style.left = `${coordinates.left}px`;
      textareaNode.style.width = `${coordinates.width}px`;
      textareaNode.style.height = `${coordinates.height + 50}px`;
    }
    textareaNode.select();
  }

  render() {
    const { classes, card, ...props } = this.props;
    return (
      <div
        aria-describedby={labels.quickEditCardDescription.id}
        className={classes.root}
        {...props}
      >
        <div className={classes.description}>
          <Typography component={TextArea} value={card.title} />
          <Button variant="raised"> Save </Button>
        </div>
        <div className={classes.sideButtons}>
          {[
            [Label, "Edit Labels"],
            [Person, "Change Members"],
            [ArrowForward, "Move"],
            [LibraryBooks, "Copy"],
            [Timer, "Change Due Date"],
            [Archive, "Archive"]
          ].map(([Icon, text], idx) => (
            <Button key={idx} size="small">
              <Icon />
              {text}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

const View = withStyles(styles)(QuickEditCard);

View.propTypes = {
  card: cardType.isRequired
};

export default View;
