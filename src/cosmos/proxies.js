/*
 * Cosmos proxies (https://github.com/react-cosmos/react-cosmos#proxies)
 */

import React from "react";
import PropTypes from "prop-types";
import createApolloProxy from "react-cosmos-apollo-proxy";
import CssBaseline from "@material-ui/core/CssBaseline";

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

class StylesProxy extends React.Component {
  render() {
    const { nextProxy, ...rest } = this.props;
    const { value: NextProxy, next } = nextProxy;
    return (
      <CssBaseline>
        <NextProxy {...rest} nextProxy={next()} />
      </CssBaseline>
    );
  }
}

export default [StylesProxy, MobxProxy, createApolloProxy({ client })];
