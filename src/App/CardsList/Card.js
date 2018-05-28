import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import Create from "@material-ui/icons/Create";
import IconButton from "./IconButton";
import { labelledBy } from "../utils";
import * as labels from "../labels";

const styles = {
  root: {
    padding: 4,
    paddingLeft: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      background: grey[200],
      "& button": {
        visibility: "visible"
      }
    },
    "& button": {
      visibility: "hidden",
      alignSelf: "flex-start",
      paddingBottom: 0,
      "&:hover": {
        visibility: "visible"
      }
    }
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
      <IconButton
        Icon={Create}
        onClick={e => {
          e.stopPropagation();
          onQuickEditCard(e.currentTarget.parentElement);
        }}
        aria-labelledby={labels.quickEditCard.id}
      />
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
