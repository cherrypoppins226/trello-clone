import React from "react";
import path from "path";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Modal from "material-ui/Modal";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import green from "material-ui/colors/green";
import grey from "material-ui/colors/grey";
import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Timer from "@material-ui/icons/Timer";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import { cardDescription } from "./CardsListCard";
import TextArea from "./TextArea";

const styles = {
  container: {
    outline: "none",
    pointerEvents: "none"
  },
  editCardDescription: {
    "& textarea": {
      pointerEvents: "all",
      padding: 4,
      paddingLeft: 8,
      // Reusable
      border: 0,
      outline: "none",
      resize: "none",
      borderRadius: 2
    },
    "& button": {
      pointerEvents: "all",
      color: grey[50],
      backgroundColor: green[500],
      textTransform: "none",
      fontWeight: 700,
      marginTop: 15,
      "&:hover": {
        backgroundColor: green[600]
      }
    }
  },
  editCardButtons: {
    "& button": {
      pointerEvents: "all",
      background: "rgba(0, 0, 0, .6)",
      color: grey[50],
      fontWeight: 600,
      textTransform: "none",
      transition: "transform 85ms ease-in",
      "&:hover": {
        background: "rgba(0, 0, 0, .8)",
        transform: "translateX(5px)",
        transition: "transform 85ms ease-in"
      },
      "& svg": {
        padding: 1,
        marginRight: 5,
        width: "0.8em",
        height: "0.8em"
      }
    }
  }
};

export const EDIT_CARD_DESCRIPTION = "edit-card-description";

const View = ({ classes, onClose, card = null, container = null }) => {
  const modal = React.createRef();
  const textarea = React.createRef();

  const modalDidMount = () => {
    const cardCoordinates = card.getBoundingClientRect();
    const modalNode = findDOMNode(modal.current);
    modalNode.style.top = `${cardCoordinates.top}px`;
    modalNode.style.left = `${cardCoordinates.left}px`;
    const textareaNode = findDOMNode(textarea.current);
    textareaNode.style.width = `${cardCoordinates.width}px`;
    textareaNode.style.height = `${cardCoordinates.height + 50}px`;
  };

  return (
    <Modal
      ref={modal}
      aria-describedby={EDIT_CARD_DESCRIPTION}
      open={Boolean(card)}
      container={container || card}
      onClose={onClose}
      onRendered={modalDidMount}
    >
      <Grid container wrap="nowrap" spacing={8} className={classes.container}>
        <div id={EDIT_CARD_DESCRIPTION} style={{ display: "none" }}>
          Edit card: change title, members, archive etc.
        </div>
        <Grid item className={classes.editCardDescription}>
          <Typography
            ref={textarea}
            component={TextArea}
            value={card ? cardDescription(card) : ""}
          />
          <Button variant="raised"> Save </Button>
        </Grid>
        <Grid item className={classes.editCardButtons}>
          <Grid container spacing={8} wrap="nowrap" direction="column">
            {[
              [Label, "Edit Labels"],
              [Person, "Change Members"],
              [ArrowForward, "Move"],
              [LibraryBooks, "Copy"],
              [Timer, "Change Due Date"],
              [Archive, "Archive"]
            ].map(([Icon, text], idx) => (
              <Grid item style={{ paddingBottom: 1 }} key={idx}>
                <Button size="small" variant="flat">
                  <Icon />
                  {text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  card: PropTypes.object,
  container: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
