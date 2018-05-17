import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import Create from "@material-ui/icons/Create";
import * as Labels from "../labels";

const styles = {
  root: {
    padding: 4,
    paddingLeft: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "&:hover": {
      background: grey[200]
    },
    "&:hover button": {
      visibility: "visible"
    },
    "& button": {
      visibility: "hidden",
      // Reusable styles
      borderWidth: 0,
      background: "none",
      outline: "none",
      cursor: "pointer",
      alignSelf: "flex-start",
      borderRadius: 4,
      padding: 3,
      paddingBottom: 0,
      "&:hover": {
        background: "#D6DADC"
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

const onClick = (event, onQuickEditCard, onEditCard) => {
  const button = event.currentTarget.querySelector(
    `[aria-labelledby="${Labels.quickEditCard.id}"]`
  );
  if (button.contains(event.target)) {
    onQuickEditCard(event.currentTarget);
  } else {
    onEditCard(event.currentTarget);
  }
};

export const cardDescription = cardNode => {
  return cardNode.querySelector(`[aria-labelledby="${Labels.card.id}"]`)
    .textContent;
};

const Card = ({
  classes,
  description = "Title...",
  onQuickEditCard,
  onEditCard
}) => {
  return (
    <Paper
      data-testid="CardsListCard"
      elevation={1}
      onClick={e => onClick(e, onQuickEditCard, onEditCard)}
      className={classes.root}
      aria-labelledby={Labels.editCard.id}
    >
      <Typography aria-labelledby={Labels.card.id}>{description}</Typography>
      <button aria-labelledby={Labels.quickEditCard.id}>
        <Create />
      </button>
    </Paper>
  );
};

const View = withStyles(styles)(Card);

View.propTypes = {
  description: PropTypes.string,
  onQuickEditCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired
};

export default View;
