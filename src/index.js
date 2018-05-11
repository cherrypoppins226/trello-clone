import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "material-ui/CssBaseline";
import { appData } from "./appData";

import "./index.css";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";

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
