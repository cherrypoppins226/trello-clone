import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import reducer from "./App/reducers";
import { App } from "./App/fixtures";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(reducer, App.default.reduxState);

ReactDOM.render(
  <Provider store={store}>
    <App.default.component {...App.default.props} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
