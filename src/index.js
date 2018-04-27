import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "material-ui/CssBaseline";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const lists = {
  List1: ["card1", "card2", "card3"],
  List2: ["card1", "card2", "card3"]
};

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <App lists={lists} />
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();
