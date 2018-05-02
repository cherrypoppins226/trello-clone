import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "material-ui/CssBaseline";
import faker from "faker";

import "./index.css";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";

faker.seed(1);

const lists = {};
for (let i = 0; i < 6; i++) {
  const key = faker.lorem.sentence();
  lists[key] = [];
  for (let j = 0; j < faker.random.number({ min: 2, max: 50 }); j++) {
    lists[key].push(faker.lorem.sentence());
  }
}

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
