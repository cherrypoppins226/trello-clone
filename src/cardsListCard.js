import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import { ListItem } from "material-ui/List";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import grey from "material-ui/colors/grey";
import Create from "@material-ui/icons/Create";

const styles = {
  container: {
    margin: 8,
    marginTop: 0,
    marginBottom: 8
  },
  card: {
    padding: 4,
    paddingLeft: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    "&:hover": {
      background: grey[200]
    },
    "&:hover $edit": {
      visibility: "visible"
    }
  },
  edit: {
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
      background: "#d6dadc"
    }
  },
  editIcon: {
    padding: 3,
    width: "0.8em",
    height: "0.8em",
    color: grey[700]
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
    <Paper elevation={1} component="li" className={classes.container}>
      <ListItem
        button
        onClick={e => onClick(e, onEditCard)}
        className={classes.card}
      >
        <Typography aria-label={CARD_DESCRIPTION_LABEL}>
          {description}
        </Typography>
        <div id={EDIT_CARD_LABEL} style={{ display: "none" }}>
          Edit card
        </div>
        <button className={classes.edit} aria-labelledby={EDIT_CARD_LABEL}>
          <Create className={classes.editIcon} />
        </button>
      </ListItem>
    </Paper>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  onEditCard: PropTypes.func.isRequired
};

const CardsListCard = withStyles(styles)(View);

export default CardsListCard;
