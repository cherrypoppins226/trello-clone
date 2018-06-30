import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import ButtonBase from "@material-ui/core/ButtonBase";

import "./index.css";
import DragPreview from "./app/DragPreview";
import Labels from "./app/Labels";
import Board from "./app/Board";
import client from "./cosmos/apollo/client";
import { queries } from "./cosmos/apollo/schema";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

class PopulateCache extends React.PureComponent {
  state = { cachePopulated: false };

  render() {
    return this.state.cachePopulated ? (
      this.props.children
    ) : (
      <ApolloConsumer>
        {client => {
          client
            .query({ query: queries.lists })
            .then(() => this.setState({ cachePopulated: true }))
            .catch(error => console.error(error));
          return null;
        }}
      </ApolloConsumer>
    );
  }
}

export default (
  <ApolloProvider client={client}>
    <PopulateCache>
      <DragDropContextProvider backend={HTML5Backend}>
        <CssBaseline />
        <Board />
        <DragPreview />
        <Labels />
      </DragDropContextProvider>
    </PopulateCache>
  </ApolloProvider>
);
