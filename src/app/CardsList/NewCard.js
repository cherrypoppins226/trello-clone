import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { fileAbsolute } from "paths.macro";
import { compose, setDisplayName, setPropTypes } from "recompose";
import TextArea from "react-textarea-autosize";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import Close from "@material-ui/icons/Close";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { graphql } from "react-apollo";

import { queries } from "../../cosmos/apollo/schema";
import { makeFixtures, moduleName, labelId } from "../../utils";
import { button, buttonIcon, textarea } from "../styles";

export const labels = {
  close: {
    id: labelId("close"),
    text: "Discard changes and close new card creation"
  }
};

const styles = {
  root: {
    "& textarea": {
      ...textarea,
      marginBottom: 10,
      minHeight: 70,
      outline: "none",
      padding: 4,
      paddingLeft: 8,
      borderRadius: 2,
      boxShadow: "0 1px 2px rgba(0, 0, 0, .23)"
    }
  },
  buttons: {
    display: "flex",
    alignItems: "center"
  },
  add: {
    ...button,
    color: grey[50],
    backgroundColor: green[500],
    marginRight: 7,
    "&:hover": {
      backgroundColor: green[600]
    }
  },
  close: {
    ...buttonIcon,
    color: grey[500],
    margin: 0,
    "&:hover": {
      color: grey[900]
    },
    "& svg": {
      fontSize: "2.5em"
    }
  }
};

const NewCard = ({
  classes,
  addCard,
  cardBeingAdded: { listId },
  finishAddCard
}) => {
  return (
    <ClickAwayListener onClickAway={finishAddCard}>
      {/* https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md#case-this-element-is-not-a-button-link-menuitem-etc-it-is-catching-bubbled-events-from-elements-that-it-contains */}
      <div
        role="presentation"
        data-testid="new-card"
        className={classes.root}
        onClick={e => {
          if (!e.target.addCard) return;
          const title = e.currentTarget.querySelector("textarea").value;
          if (title) {
            const listQuery = {
              query: queries.list,
              variables: { id: listId }
            };
            addCard({
              variables: { listId, title },
              update: (proxy, { data: { addCard } }) => {
                const data = proxy.readQuery(listQuery);
                data.list.cards.push(addCard);
                proxy.writeQuery({ ...listQuery, data });
              },
              optimisticResponse: {
                __typename: "Mutation",
                addCard: {
                  __typename: "Card",
                  id: -1,
                  title
                }
              }
            });
          }
          finishAddCard();
        }}
      >
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Typography
          autoFocus
          component={TextArea}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.target.addCard = true;
              e.target.click();
            } else if (e.key === "Escape") {
              finishAddCard();
            }
          }}
        />
        {/* eslint-enable jsx-a11y/no-autofocus */}
        <div className={classes.buttons}>
          <Button
            className={classes.add}
            size="small"
            variant="raised"
            onClick={e => (e.target.addCard = true)}
          >
            Add
          </Button>
          <button
            aria-labelledby={labels.close.id}
            className={classes.close}
            onClick={e => finishAddCard()}
          >
            <Close />
          </button>
        </div>
      </div>
    </ClickAwayListener>
  );
};

const Component = compose(
  setDisplayName(moduleName(fileAbsolute)),
  setPropTypes({
    cardBeingAdded: PropTypes.shape({
      listId: PropTypes.number.isRequired
    }),
    finishAddCard: PropTypes.func.isRequired
  }),
  graphql(queries.addCard, { name: "addCard" }),
  withStyles(styles)
)(NewCard);

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      cardBeingAdded: {
        listId: 1
      },
      finishAddCard: () => {}
    }
  }
});

export default Component;
