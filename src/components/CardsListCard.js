import React from "react";
import path from "path";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import grey from "material-ui/colors/grey";
import Create from "@material-ui/icons/Create";
import * as Labels from "./labels";

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

let View = ({
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

View = withStyles(styles)(View);

View.propTypes = {
  description: PropTypes.string,
  onQuickEditCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default View;
