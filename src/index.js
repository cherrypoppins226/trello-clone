import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./index.css";
import App from "./App";
import { app } from "./App/fixtures";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <App {...app.props} />
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
