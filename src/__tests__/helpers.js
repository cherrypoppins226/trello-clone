import React from "react";
import { render as originalRender } from "react-testing-library";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "material-ui/styles";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

export const render = component => {
  return originalRender(
    <JssProvider generateClassName={generateClassName}>{component}</JssProvider>
  );
};
