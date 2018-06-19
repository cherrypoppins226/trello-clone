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

class MobxProxy extends React.Component {
  static childContextTypes = {
    mobxStores: PropTypes.object.isRequired
  };

  getChildContext() {
    return { mobxStores: this.props.fixture["stores"] || {} };
  }

  render() {
    // Boilerplate. Always the same.
    const { nextProxy, ...rest } = this.props;
    const { value: NextProxy, next } = nextProxy;
    return <NextProxy {...rest} nextProxy={next()} />;
  }
}

class AppProxy extends React.Component {
  render() {
    const { nextProxy, ...rest } = this.props;
    const { value: NextProxy, next } = nextProxy;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <CssBaseline />
        <NextProxy {...rest} nextProxy={next()} />
      </DragDropContextProvider>
    );
  }
}

export default [AppProxy, MobxProxy, createApolloProxy({ client })];
