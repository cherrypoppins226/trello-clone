import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import Create from "@material-ui/icons/Create";
import merge from "deepmerge";
import { connect } from "react-redux";
import { fileAbsolute } from "paths.macro";

import { moduleName } from "../utils";
import * as labels from "../labels";
import * as actions from "../actions";
import { buttonIconSmall } from "../styles";

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

const View = ({ classes, card, startQuickEdit, startEdit }) => {
  // TODO: Use <Card /> from Material UI
  return (
    <Paper
      data-cardid={card.id}
      elevation={1}
      onClick={e => startEdit(card.id)}
      className={classes.root}
      aria-labelledby={labels.editCard.id}
    >
      <Typography aria-labelledby={labels.card.id}>{card.title}</Typography>
      <button
        aria-labelledby={labels.quickEditCard.id}
        onClick={e => {
          e.stopPropagation();
          startQuickEdit(card.id);
        }}
      >
        <Create />
      </button>
    </Paper>
  );
};

const mapDispatchToProps = dispatch => ({
  startQuickEdit: id => dispatch(actions.startQuickEditCard(id)),
  startEdit: id => dispatch(actions.startEditCard(id))
});

const Container = connect(null, mapDispatchToProps)(withStyles(styles)(View));

Container.displayName = moduleName(fileAbsolute);

export const cardType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
});

Container.propTypes = {
  card: cardType.isRequired
};

export default Container;
