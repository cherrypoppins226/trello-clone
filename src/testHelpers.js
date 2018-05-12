import React from "react";
import * as testingLibrary from "react-testing-library";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "material-ui/styles";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

export const render = component => {
  return testingLibrary.render(
    <JssProvider generateClassName={generateClassName}>{component}</JssProvider>
  );
};

export const renderIntoDocument = component => {
  return testingLibrary.renderIntoDocument(
    <JssProvider generateClassName={generateClassName}>{component}</JssProvider>
  );
};
