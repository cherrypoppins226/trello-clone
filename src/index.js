import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "material-ui/CssBaseline";
import ButtonBase from "material-ui/ButtonBase";
import "./index.css";
import { appData } from "./appData";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";

ButtonBase.defaultProps = { ...ButtonBase.defaultProps, disableRipple: true };

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <App lists={appData} />
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
