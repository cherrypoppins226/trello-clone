import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import Create from "@material-ui/icons/Create";
import { labelledBy } from "../utils";
import * as labels from "../labels";
import { buttonIconSmall } from "../styles";
import merge from "deepmerge";

const styles = {
  root: {
    padding: 4,
    paddingLeft: 8,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      background: grey[200],
      "& button": {
        visibility: "visible"
      }
    },
    "& button": merge(buttonIconSmall, {
      visibility: "hidden",
      paddingBottom: 0,
      "&:hover": {
        visibility: "visible"
      }
    })
  }
};

export const cardDescription = cardNode =>
  cardNode.querySelector(labelledBy(labels.card.id)).textContent;

const Card = ({
  classes,
  description = "Title...",
  onQuickEditCard,
  onEditCard
}) => {
  // TODO: Use <Card /> from Material UI
  return (
    <Paper
      data-testid="CardsListCard"
      elevation={1}
      onClick={e => onEditCard(e.currentTarget)}
      className={classes.root}
      aria-labelledby={labels.editCard.id}
    >
      <Typography aria-labelledby={labels.card.id}>{description}</Typography>
      <button
        aria-labelledby={labels.quickEditCard.id}
        onClick={e => {
          e.stopPropagation();
          onQuickEditCard(e.currentTarget.parentElement);
        }}
      >
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
