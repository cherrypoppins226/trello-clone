import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import grey from "material-ui/colors/grey";
import Create from "@material-ui/icons/Create";

const styles = {
  container: {
    margin: 8,
    marginTop: 2
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

export const EDIT_CARD_LABEL = "edit-card-label";

const CARD_DESCRIPTION_LABEL = "card title";

const onClick = (event, onEditCard) => {
  const button = event.currentTarget.querySelector(
    `[aria-labelledby="${EDIT_CARD_LABEL}"]`
  );
  if (button.contains(event.target)) {
    onEditCard(event.currentTarget);
  } else {
    // Clicked on card description
    return true;
  }
};

export const cardDescription = cardNode => {
  return cardNode.querySelector(`[aria-label="${CARD_DESCRIPTION_LABEL}"]`)
    .textContent;
};

const View = ({ classes, description = "Title...", onEditCard }) => {
  return (
    <li className={classes.container}>
      <Paper
        elevation={1}
        onClick={e => onClick(e, onEditCard)}
        className={classes.card}
      >
        <Typography aria-label={CARD_DESCRIPTION_LABEL}>
          {description}
        </Typography>
        <div id={EDIT_CARD_LABEL} style={{ display: "none" }}>
          Edit card
        </div>
        <button aria-labelledby={EDIT_CARD_LABEL}>
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
  onEditCard: PropTypes.func.isRequired
};

export default withStyles(styles)(View);
