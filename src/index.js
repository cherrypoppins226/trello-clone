import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "./index.css";
import App from "./App";
import client from "./cosmos/apollo/client";
import { queries } from "./cosmos/apollo/schema";
import registerServiceWorker from "./registerServiceWorker";

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
            .query({ query: queries.lists })
            .then(() => this.setState({ cachePopulated: true }))
            .catch(error => console.error(error));
          return null;
        }}
      </ApolloConsumer>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <PopulateCache>
      <DragDropContextProvider backend={HTML5Backend}>
        <CssBaseline />
        <App />
      </DragDropContextProvider>
    </PopulateCache>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
