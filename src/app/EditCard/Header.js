import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Inbox from "@material-ui/icons/Inbox";
import Close from "@material-ui/icons/Close";
import TextArea from "react-textarea-autosize";
import Typography from "@material-ui/core/Typography";
import { fileAbsolute } from "paths.macro";
import { compose, setDisplayName, setPropTypes } from "recompose";
import { graphql } from "react-apollo";

import { queries } from "../../cosmos/apollo/schema";
import { inject } from "mobx-react";
import { buttonIcon, headerTextarea } from "../styles";
import { makeFixtures, moduleName } from "../../utils";

const styles = {
  root: {
    padding: "20px 20px 30px 15px",
    display: "flex",
    alignItems: "flex-start",
    "& svg": { color: "rgb(153, 153, 153)" },
    "& h2": { width: "100%" },
    "& textarea": {
      ...headerTextarea,
      marginRight: 15
    }
  },
  close: {
    ...buttonIcon,
    margin: 0,
    "&:hover": {
      color: "black"
    }
  }
};

const Header = ({
  classes,
  className = "",
  appState,
  updateCard,
  cardId,
  cardTitle
}) => {
  return (
    <div className={`${classes.root} ${className}`}>
      <Inbox />
      <Typography
        role="heading"
        variant="title"
        component={TextArea}
        defaultValue={cardTitle}
        spellCheck={false}
        onBlur={e => {
          const title = e.target.value;
          if (title === cardTitle) return;
          updateCard({
            variables: {
              id: cardId,
              update: { title }
            }
          });
        }}
      />
      <button className={classes.close} onClick={appState.finishCardEdit}>
        <Close />
      </button>
    </div>
  );
};

const Component = compose(
  setDisplayName(moduleName(fileAbsolute)),
  setPropTypes({
    cardId: PropTypes.number.isRequired,
    cardTitle: PropTypes.string.isRequired
  }),
  graphql(queries.updateCard, { name: "updateCard" }),
  inject("appState"),
  withStyles(styles)
)(Header);

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      cardId: 1,
      cardTitle: "Ut sunt qui amet."
    },
    stores: {
      appState: {
        finishCardEdit: () => {}
      }
    }
  }
});

export default Component;
