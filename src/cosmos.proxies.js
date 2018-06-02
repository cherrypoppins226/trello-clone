/*
 * Cosmos proxies (https://github.com/react-cosmos/react-cosmos#proxies)
 */

import React from "react";
import PropTypes from "prop-types";

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

export default [MobxProxy];
