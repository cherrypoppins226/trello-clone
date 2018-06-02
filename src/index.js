import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { App } from "./App/fixtures";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <App.default.component {...App.default.props} />,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
