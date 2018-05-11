import React from "react";
import faker from "faker";
import { render as originalRender } from "react-testing-library";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "material-ui/styles";

faker.seed(1);

export const appData = {
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()],
  [faker.lorem.sentence()]: [faker.lorem.sentence(), faker.lorem.sentence()]
};

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

export const render = component => {
  return originalRender(
    <JssProvider generateClassName={generateClassName}>{component}</JssProvider>
  );
};
