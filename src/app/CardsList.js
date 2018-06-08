import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { fileAbsolute } from "paths.macro";
import { graphql } from "react-apollo";
import { compose, setDisplayName, setPropTypes } from "recompose";

import AppState from "../App.state";
import Header from "./cardsList/Header";
import Cards from "./cardsList/Cards";
import { queries } from "../cosmos/apollo/schema";
import { button } from "./styles";
import { makeFixtures, handleGraphQLResponse, moduleName } from "../utils";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    background: "rgb(226, 228, 230)",
    "& > button": {
      ...button,
      justifyContent: "left",
      fontWeight: 400
    }
  },
  header: {
    margin: 5
  }
};

const CardsList = ({ classes, id, addCard, data: { list, variables } }) => {
  return (
    <Paper
      data-listid={id}
      component="section"
      elevation={1}
      className={classes.root}
    >
      <Header
        className={classes.header}
        listId={list.id}
        listTitle={list.title}
      />
      <div style={{ overflowY: "scroll" }}>
        <Cards cards={list.cards} />
      </div>
      <Button
        onClick={() => {
          const listQuery = { query: queries.list, variables };
          addCard({
            update: (proxy, { data: { addCard } }) => {
              const data = proxy.readQuery(listQuery);
              data.list.cards.push(addCard);
              proxy.writeQuery({ ...listQuery, data });
            }
          });
        }}
      >
        Add a card...
      </Button>
    </Paper>
  );
};

const Component = compose(
  setDisplayName(moduleName(fileAbsolute)),
  setPropTypes({
    id: PropTypes.number.isRequired
  }),
  graphql(queries.list, {
    options: props => ({ variables: { id: props.id } })
  }),
  handleGraphQLResponse(),
  graphql(queries.addCard, {
    name: "addCard",
    options: props => ({
      variables: { listId: props.id, title: "Title..." },
      optimisticResponse: {
        __typename: "Mutation",
        addCard: {
          __typename: "Card",
          id: -1,
          title: "Title..."
        }
      }
    })
  }),
  withStyles(styles)
)(CardsList);

export const fixtures = makeFixtures(Component, {
  default: {
    props: {
      id: 1
    },
    stores: {
      appState: new AppState()
    }
  }
});

export default Component;
