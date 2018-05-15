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
  container: {
    margin: 8,
    marginTop: 2,
    cursor: "pointer"
  },
  card: {
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

const onClick = (event, onEditCard, onEditFullCard) => {
  const button = event.currentTarget.querySelector(
    `[aria-labelledby="${Labels.editCard.id}"]`
  );
  if (button.contains(event.target)) {
    onEditCard(event.currentTarget);
  } else {
    onEditFullCard(event.currentTarget);
  }
};

export const cardDescription = cardNode => {
  return cardNode.querySelector(`[aria-labelledby="${Labels.card.id}"]`)
    .textContent;
};

const View = ({
  classes,
  description = "Title...",
  onEditCard,
  onEditFullCard
}) => {
  return (
    <li data-testid="CardsListCard" className={classes.container}>
      <Paper
        elevation={1}
        onClick={e => onClick(e, onEditCard, onEditFullCard)}
        className={classes.card}
        aria-labelledby={Labels.fullyEditCard.id}
      >
        <Typography aria-labelledby={Labels.card.id}>{description}</Typography>
        <button aria-labelledby={Labels.editCard.id}>
          <Create />
        </button>
      </Paper>
    </li>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  onEditCard: PropTypes.func.isRequired,
  onEditFullCard: PropTypes.func.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
