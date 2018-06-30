/*
 * Cosmos proxies (https://github.com/react-cosmos/react-cosmos#proxies)
 */

import React from "react";
import PropTypes from "prop-types";
import createApolloProxy from "react-cosmos-apollo-proxy";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import client from "./apollo/client";

class AppProxy extends React.Component {
  static childContextTypes = {
    mobxStores: PropTypes.object.isRequired
  };

  getChildContext() {
    return { mobxStores: this.props.fixture["stores"] || {} };
  }

  render() {
    const { nextProxy, ...rest } = this.props;
    const { value: NextProxy, next } = nextProxy;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div style={{ height: "100%", overflow: "auto" }}>
          <CssBaseline />
          <NextProxy {...rest} nextProxy={next()} />
        </div>
      </DragDropContextProvider>
    );
  }
}

export default [createApolloProxy({ client }), AppProxy];
