import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ButtonBase from "@material-ui/core/ButtonBase";
import "./index.css";
import * as fixtures from "./components/fixtures";
import App from "./components";
import registerServiceWorker from "./registerServiceWorker";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <App {...fixtures.app.props} />
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
