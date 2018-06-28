import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import Create from "@material-ui/icons/Create";
import merge from "deepmerge";
import { fileAbsolute } from "paths.macro";
import { inject } from "mobx-react";
import { compose, setPropTypes, withHandlers, defaultProps } from "recompose";

import { makeFixtures, renderLabels, labelId, moduleName } from "../../utils";
import { buttonIconSmall } from "../styles";

const modulePath = moduleName(fileAbsolute);

export const labels = {
  editCard: {
    id: labelId(modulePath, "edit-card"),
    text: "Edit card"
  },
  quickEditCard: {
    id: labelId(modulePath, "quick-edit-card"),
    text: "Quickly edit card"
  }
};

const styles = {
  root: {
    boxShadow: "0 1px 0 #CCC",
    borderRadius: 3,
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

const Card = ({ classes, style, card, startEditCard, startQuickEditCard }) => (
  <Paper
    style={style || {}}
    data-cardid={card.id}
    onClick={startEditCard}
    className={classes.root}
    aria-labelledby={labels.editCard.id}
  >
    {renderLabels(labels)}
    <Typography data-testid="card-title">{card.title}</Typography>
    <button
      aria-labelledby={labels.quickEditCard.id}
      onClick={event => {
        event.stopPropagation();
        startQuickEditCard(event);
      }}
    >
      <Create />
    </button>
  </Paper>
);

export const types = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })
};

const nop = () => {};

export const View = compose(
  defaultProps({
    startEditCard: nop,
    startQuickEditCard: nop
  }),
  setPropTypes({
    card: types.card.isRequired,
    startEditCard: PropTypes.func.isRequired,
    startQuickEditCard: PropTypes.func.isRequired
  }),
  withStyles(styles)
)(Card);

export const Container = compose(
  inject("appState"),
  withHandlers({
    startEditCard: props => _event => {
      props.appState.startCardEdit(props.card);
    },
    startQuickEditCard: props => event => {
      const box = event.currentTarget.parentElement.getBoundingClientRect();
      const { top, left, bottom, right } = box;
      props.appState.startQuickCardEdit({
        ...props.card,
        anchorElementBox: { top, left, bottom, right }
      });
    }
  })
)(View);

export const fixtures = makeFixtures(modulePath, Container, {
  default: {
    props: {
      card: { id: 1, title: "Ut sunt qui amet." }
    },
    stores: {
      appState: { startCardEdit: nop, startQuickCardEdit: nop }
    }
  }
});
