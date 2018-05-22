import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ButtonBase from "@material-ui/core/ButtonBase";
import "./index.css";
import fixture from "./components/App.fixture";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <App lists={fixture.props.lists} />
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
