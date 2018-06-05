import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import "./index.css";
import App from "./App";
import apolloClient from "./apollo";
import registerServiceWorker from "./registerServiceWorker";

const ALL_DATA = gql`
  {
    lists {
      id
      title
      cards {
        id
        title
      }
    }
  }
`;

class PopulateCache extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cachePopulated: false };
  }

  render() {
    return this.state.cachePopulated ? (
      this.props.children
    ) : (
      <ApolloConsumer>
        {client => {
          client
            .query({ query: ALL_DATA })
            .then(() => this.setState({ cachePopulated: true }))
            .catch(error => console.error(error));
          return null;
        }}
      </ApolloConsumer>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <PopulateCache>
      <CssBaseline />
      <App />
    </PopulateCache>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
