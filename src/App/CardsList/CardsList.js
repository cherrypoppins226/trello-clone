import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { fileAbsolute } from "paths.macro";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import Header from "./Header";
import Cards from "./Cards";
import { button } from "../styles";
import { moduleName, handleGraphQLResponse } from "../utils";

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

const ADD_CARD = gql`
  mutation AddCard($listId: Int!, $title: String!) {
    addCard(listId: $listId, title: $title) {
      id
      title
    }
  }
`;

const LIST = gql`
  query List($id: Int!) {
    list(id: $id) {
      id
      title
      cards {
        id
        title
      }
    }
  }
`;

const View = ({ classes, id, addCard, data: { list, variables } }) => {
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
          const listQuery = { query: LIST, variables };
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
  graphql(LIST, {
    options: props => ({ variables: { id: props.id } })
  }),
  handleGraphQLResponse(),
  graphql(ADD_CARD, {
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
)(View);

Component.displayName = moduleName(fileAbsolute);

Component.propTypes = {
  id: PropTypes.number.isRequired
};

export default Component;
