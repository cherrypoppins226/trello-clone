import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "material-ui/CssBaseline";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const lists = {
  "This is a long text that will hopefully not overflow": [
    "card1",
    "card2",
    "card1",
    "card1",
    "card1",
    "card1",
    "card1",
    "card1",
    "card2",
    "card2",
    "card2",
    "card2",
    "card2",
    "card2",
    "card1",
    "card1",
    "card1",
    "card1",
    "card1",
    "card1",
    "card1",
    "card2",
    "card2",
    "card2",
    "card2",
    "card2",
    "card2",
    "card1",
    "card1",
    "card1",
    "card1",
    "card1",
    "card2",
    "card2",
    "card2",
    "card2",
    "card2",
    "card3"
  ],
  List2: [
    "This is a long text that will hopefully not overflow",
    "card2",
    "card3"
  ]
};

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <App lists={lists} />
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
