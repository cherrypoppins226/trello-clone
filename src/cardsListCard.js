import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import { ListItem, ListItemText } from "material-ui/List";
import PropTypes from "prop-types";
import red from "material-ui/colors/red";
import grey from "material-ui/colors/grey";
import Create from "@material-ui/icons/Create";

const styles = {
  container: {
    margin: 8,
    marginTop: 0,
    marginBottom: 8,
    background: red[100],
    display: "flex",
    flexDirection: "row"
  },
  card: {
    padding: 4,
    paddingLeft: 8,
    "&:hover $edit": {
      visibility: "visible"
    }
  },
  description: {
    paddingRight: 0
  },
  edit: {
    visibility: "hidden",
    borderWidth: 0,
    background: "none",
    cursor: "pointer",
    alignSelf: "flex-start",
    borderRadius: 4,
    padding: 2,
    paddingBottom: 0,
    "&:hover": {
      background: red[200]
    }
  },
  editIcon: {
    padding: 2,
    width: "0.8em",
    height: "0.8em",
    color: grey[800]
  }
};

const View = ({ classes, description = "Title..." }) => {
  return (
    <Paper elevation={1} component="li" className={classes.container}>
      <ListItem button className={classes.card}>
        <ListItemText className={classes.description}>
          {description}
        </ListItemText>
        <div id="edit-card-label" style={{ display: "none" }}>
          Edit card: change description, archive, etc...
        </div>
        <button className={classes.edit} aria-label="edit-card-label">
          <Create className={classes.editIcon} />
        </button>
      </ListItem>
    </Paper>
  );
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string
};

const CardsListCard = withStyles(styles)(View);

export default CardsListCard;
